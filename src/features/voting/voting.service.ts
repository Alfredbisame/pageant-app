import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import { ContestantRepository } from '@/shared/repositories/contestant.repository';
import { VotePackageRepository } from '@/shared/repositories/vote-package.repository';
import { EventConfigRepository } from '@/shared/repositories/event-config.repository';
import { PaymentRepository } from '@/shared/repositories/payment.repository';
import { VoteLedgerRepository } from '@/shared/repositories/vote-ledger.repository';
import { PaymentVerificationService } from '@/features/payments/payment-verification.service';
import { RealtimeGateway } from '@/realtime/realtime.gateway';
import { LeaderboardService } from '@/features/leaderboard/leaderboard.service';
import { AuditService } from '@/features/audit/audit.service';
import { VotingConfirmDto, VotingQuoteDto } from './dto/voting.dto';
import { PaymentStatus, VoteLedgerType } from '@/common/constants';
import { generateReference } from '@/common/utils/helpers';
import { AuthenticatedUser } from '@/common/types';

export interface QuoteResult {
  baseAmount: number;
  platformFee: number;
  totalAmount: number;
  votes: number;
  currency: string;
}

@Injectable()
export class QuoteService {
  constructor(
    private readonly contestantRepository: ContestantRepository,
    private readonly votePackageRepository: VotePackageRepository,
    private readonly eventConfigRepository: EventConfigRepository,
    private readonly configService: ConfigService,
  ) {}

  async calculateQuote(dto: VotingQuoteDto): Promise<QuoteResult> {
    await this.assertVotingOpen();
    await this.assertContestant(dto.contestantId);

    const eventConfig = await this.eventConfigRepository.getSingleton();
    let baseAmount: number;
    let votes: number;

    if (dto.packageId) {
      const pkg = await this.votePackageRepository.findById(dto.packageId);
      if (!pkg || !pkg.isActive) {
        throw new NotFoundException('Vote package not found');
      }
      baseAmount = pkg.baseAmount;
      votes = pkg.votes;
    } else if (dto.customAmount) {
      baseAmount = dto.customAmount;
      const pricePerVote = this.configService.get<number>(
        'payments.pricePerVotePaise',
        100,
      );
      votes = Math.floor(baseAmount / pricePerVote);
      if (votes < 1) {
        throw new BadRequestException('Custom amount too low for any votes');
      }
    } else {
      throw new BadRequestException('packageId or customAmount is required');
    }

    const platformFee = Math.round(baseAmount * eventConfig.platformFeeRate);
    const totalAmount = baseAmount + platformFee;

    return {
      baseAmount,
      platformFee,
      totalAmount,
      votes,
      currency: 'GHS',
    };
  }

  private async assertVotingOpen() {
    const config = await this.eventConfigRepository.getSingleton();
    const now = new Date();

    if (!config.votingEnabled) {
      throw new ForbiddenException('Voting is currently disabled');
    }
    if (config.votingStartsAt && now < config.votingStartsAt) {
      throw new ForbiddenException('Voting has not started yet');
    }
    if (config.votingEndsAt && now > config.votingEndsAt) {
      throw new ForbiddenException('Voting has ended');
    }
  }

  private async assertContestant(contestantId: string) {
    const contestant = await this.contestantRepository.findById(contestantId);
    if (!contestant || !contestant.isActive) {
      throw new NotFoundException('Contestant not found');
    }
  }
}

@Injectable()
export class VotingService {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly paymentVerificationService: PaymentVerificationService,
    private readonly paymentRepository: PaymentRepository,
    private readonly voteLedgerRepository: VoteLedgerRepository,
    private readonly contestantRepository: ContestantRepository,
    private readonly eventConfigRepository: EventConfigRepository,
    private readonly realtimeGateway: RealtimeGateway,
    private readonly leaderboardService: LeaderboardService,
    private readonly auditService: AuditService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  quote(dto: VotingQuoteDto) {
    return this.quoteService.calculateQuote(dto);
  }

  async confirm(dto: VotingConfirmDto, user?: AuthenticatedUser) {
    const existing = await this.paymentRepository.findByProviderReference(
      dto.providerReference,
    );

    if (existing?.status === PaymentStatus.SUCCESS) {
      const contestant = await this.contestantRepository.findById(
        existing.contestantId.toString(),
      );
      return {
        success: true,
        paymentId: existing._id.toString(),
        contestantId: existing.contestantId.toString(),
        votesAdded: existing.votesPurchased,
        newVoteTotal: contestant?.voteCount ?? 0,
      };
    }

    const quote = await this.quoteService.calculateQuote({
      contestantId: dto.contestantId,
      packageId: dto.packageId,
      customAmount: dto.customAmount,
    });

    const eventConfig = await this.eventConfigRepository.getSingleton();
    if (eventConfig.dailyVoteLimitPerVoter) {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const dailyCount = await this.paymentRepository.countDailyVotesByEmail(
        dto.voterEmail,
        startOfDay,
      );
      if (dailyCount >= eventConfig.dailyVoteLimitPerVoter) {
        throw new ForbiddenException('Daily vote limit reached');
      }
    }

    const verification = await this.paymentVerificationService.verify(
      dto.provider,
      dto.providerReference,
    );

    if (!verification.success) {
      await this.auditService.log({
        actorId: user?.id,
        action: 'payment.verification_failed',
        entity: 'payment',
        summary: {
          provider: dto.provider,
          providerReference: dto.providerReference,
        },
      });
      throw new BadRequestException('Payment verification failed');
    }

    if (verification.amount !== quote.totalAmount) {
      throw new BadRequestException('Payment amount mismatch');
    }

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const reference = generateReference('PAY');
      const payment = await this.paymentRepository.create({
        reference,
        providerReference: dto.providerReference,
        provider: dto.provider,
        status: PaymentStatus.SUCCESS,
        baseAmount: quote.baseAmount,
        platformFee: quote.platformFee,
        totalAmount: quote.totalAmount,
        currency: quote.currency,
        contestantId: new Types.ObjectId(dto.contestantId),
        packageId: dto.packageId
          ? new Types.ObjectId(dto.packageId)
          : undefined,
        customAmount: dto.customAmount,
        votesPurchased: quote.votes,
        voterName: dto.voterName,
        voterEmail: dto.voterEmail.toLowerCase(),
        anonymous: dto.anonymous ?? false,
        userId: user?.id ? new Types.ObjectId(user.id) : undefined,
        providerPayload: { ...dto.providerPayload, verified: verification.raw },
        verifiedAt: new Date(),
      });

      await this.voteLedgerRepository.create({
        paymentId: payment._id,
        contestantId: new Types.ObjectId(dto.contestantId),
        votes: quote.votes,
        type: VoteLedgerType.CREDIT,
      });

      const updatedContestant =
        await this.contestantRepository.incrementVoteCount(
          dto.contestantId,
          quote.votes,
        );

      await session.commitTransaction();

      const leaderboard = await this.leaderboardService.getLeaderboard(50, 0);
      this.realtimeGateway.emitLeaderboardUpdate(leaderboard);
      this.realtimeGateway.emitVoteConfirmed({
        contestantId: dto.contestantId,
        votesAdded: quote.votes,
        newTotal: updatedContestant?.voteCount ?? 0,
      });

      return {
        success: true,
        paymentId: payment._id.toString(),
        contestantId: dto.contestantId,
        votesAdded: quote.votes,
        newVoteTotal: updatedContestant?.voteCount ?? 0,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      void session.endSession();
    }
  }

  async getHistory(userId: string) {
    const payments = await this.paymentRepository.findByUserId(userId);
    return payments.map((p) => ({
      id: p._id.toString(),
      reference: p.reference,
      contestantId: p.contestantId.toString(),
      votesPurchased: p.votesPurchased,
      totalAmount: p.totalAmount,
      status: p.status,
      createdAt: p.createdAt,
    }));
  }

  async getTransactionStatus(reference: string) {
    const payment = await this.paymentRepository.findByReference(reference);
    if (!payment) throw new NotFoundException('Payment not found');
    return {
      reference: payment.reference,
      status: payment.status,
      votesPurchased: payment.votesPurchased,
      contestantId: payment.contestantId.toString(),
    };
  }
}

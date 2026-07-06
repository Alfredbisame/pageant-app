import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import { PaymentDocument } from '@/database/schemas/payment.schema';
import { VoteLedgerDocument } from '@/database/schemas/vote-ledger.schema';
import { ContestantRepository } from '@/shared/repositories/contestant.repository';
import { VotePackageRepository } from '@/shared/repositories/vote-package.repository';
import { EventConfigRepository } from '@/shared/repositories/event-config.repository';
import { PaymentRepository } from '@/shared/repositories/payment.repository';
import { VoteLedgerRepository } from '@/shared/repositories/vote-ledger.repository';
import type { PaymentListQuery } from '@/shared/repositories/payment.repository';
import type { VoteLedgerListQuery } from '@/shared/repositories/vote-ledger.repository';
import { PaymentVerificationService } from '@/features/payments/payment-verification.service';
import { RealtimeGateway } from '@/realtime/realtime.gateway';
import { LeaderboardService } from '@/features/leaderboard/leaderboard.service';
import { AuditService } from '@/features/audit/audit.service';
import {
  VotingConfirmDto,
  VotingQuoteDto,
  AdminCreditVotesDto,
} from './dto/voting.dto';
import { PaymentStatus, VoteLedgerType } from '@/common/constants';
import { generateReference } from '@/common/utils/helpers';
import { buildPaginationMeta, getPagination } from '@/common/utils/pagination';
import { AuthenticatedUser } from '@/common/types';

interface PopulatedContestant {
  _id: Types.ObjectId;
  displayName: string;
  entryNumber: number;
}

interface PopulatedPackage {
  _id: Types.ObjectId;
  name: string;
  votes: number;
  baseAmount: number;
}

interface PopulatedPayment {
  _id: Types.ObjectId;
  reference: string;
  providerReference: string;
  status: string;
  totalAmount: number;
}

interface PopulatedUser {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
}

function getDocumentId(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Types.ObjectId) return value.toString();
  if (typeof value === 'object' && '_id' in value) {
    const id = value._id;
    if (id instanceof Types.ObjectId) return id.toString();
    if (typeof id === 'string') return id;
  }
  return undefined;
}

function isPopulatedContestant(value: unknown): value is PopulatedContestant {
  return (
    !!value &&
    typeof value === 'object' &&
    !(value instanceof Types.ObjectId) &&
    'displayName' in value &&
    typeof (value as PopulatedContestant).displayName === 'string'
  );
}

function mapPopulatedContestant(
  value: unknown,
  nameLookup?: Map<string, string>,
) {
  if (isPopulatedContestant(value)) {
    return {
      id: getDocumentId(value)!,
      name: value.displayName,
      displayName: value.displayName,
      entryNumber: value.entryNumber,
    };
  }

  const id = getDocumentId(value);
  if (!id) return null;

  const displayName = nameLookup?.get(id) ?? null;
  return {
    id,
    name: displayName,
    displayName,
    entryNumber: null,
  };
}

function mapPopulatedPackage(value?: PopulatedPackage | Types.ObjectId) {
  if (!value) return undefined;
  if (value instanceof Types.ObjectId) {
    return { id: value.toString() };
  }
  return {
    id: value._id.toString(),
    name: value.name,
    votes: value.votes,
    baseAmount: value.baseAmount,
  };
}

function mapPopulatedPayment(value?: PopulatedPayment | Types.ObjectId) {
  if (!value) return undefined;
  if (value instanceof Types.ObjectId) {
    return { id: value.toString() };
  }
  return {
    id: value._id.toString(),
    reference: value.reference,
    providerReference: value.providerReference,
    status: value.status,
    totalAmount: value.totalAmount,
  };
}

function mapPopulatedUser(value?: PopulatedUser | Types.ObjectId) {
  if (!value) return undefined;
  if (value instanceof Types.ObjectId) {
    return { id: value.toString() };
  }
  return {
    id: value._id.toString(),
    fullName: value.fullName,
    email: value.email,
  };
}

export interface QuoteResult {
  baseAmount: number;
  platformFee: number;
  totalAmount: number;
  votes: number;
  pricePerVote: number;
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

    if (dto.packageId && dto.customAmount) {
      throw new BadRequestException(
        'Provide either packageId or customAmount, not both',
      );
    }

    const eventConfig = await this.eventConfigRepository.getSingleton();
    const fallbackPrice = this.configService.get<number>(
      'payments.pricePerVotePaise',
      100,
    );
    const pricePerVote =
      await this.votePackageRepository.resolvePricePerVotePaise(fallbackPrice);

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
      if (baseAmount < pricePerVote) {
        throw new BadRequestException(
          `Custom amount must be at least ${pricePerVote} pesewas (1 vote)`,
        );
      }
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
      pricePerVote,
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
    if (dto.packageId && dto.customAmount) {
      throw new BadRequestException(
        'Provide either packageId or customAmount, not both',
      );
    }

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

  async getAdminTransactions(query: PaymentListQuery) {
    const { page, limit } = getPagination(query);
    const [payments, total] = await this.paymentRepository.findPaginated(query);
    const contestantNameLookup =
      await this.resolveContestantNameLookup(payments);

    return {
      data: payments.map((p) =>
        this.toAdminTransaction(p, contestantNameLookup),
      ),
      meta: buildPaginationMeta(total, page, limit),
    };
  }

  async getAdminVoteHistory(query: VoteLedgerListQuery) {
    const { page, limit } = getPagination(query);
    const [entries, total] =
      await this.voteLedgerRepository.findPaginated(query);
    const contestantNameLookup =
      await this.resolveContestantNameLookup(entries);

    return {
      data: entries.map((e) =>
        this.toAdminVoteHistory(e, contestantNameLookup),
      ),
      meta: buildPaginationMeta(total, page, limit),
    };
  }

  private async resolveContestantNameLookup(
    rows: Array<{ contestantId: unknown }>,
  ) {
    const missingIds = [
      ...new Set(
        rows
          .filter((row) => !isPopulatedContestant(row.contestantId))
          .map((row) => getDocumentId(row.contestantId))
          .filter((id): id is string => !!id),
      ),
    ];

    const lookup = new Map<string, string>();
    if (!missingIds.length) return lookup;

    const contestants = await this.contestantRepository.find({
      _id: { $in: missingIds.map((id) => new Types.ObjectId(id)) },
    });

    for (const contestant of contestants) {
      lookup.set(contestant._id.toString(), contestant.displayName);
    }

    return lookup;
  }

  private toAdminTransaction(
    payment: PaymentDocument,
    contestantNameLookup?: Map<string, string>,
  ) {
    const contestant = mapPopulatedContestant(
      payment.contestantId,
      contestantNameLookup,
    );
    const contestantId =
      contestant?.id ?? getDocumentId(payment.contestantId) ?? '';
    const contestantName = contestant?.displayName ?? contestant?.name ?? null;

    return {
      id: payment._id.toString(),
      reference: payment.reference,
      providerReference: payment.providerReference,
      provider: payment.provider,
      status: payment.status,
      contestantId,
      contestantName,
      amount: payment.totalAmount,
      amountGhs: Number((payment.totalAmount / 100).toFixed(2)),
      baseAmount: payment.baseAmount,
      baseAmountGhs: Number((payment.baseAmount / 100).toFixed(2)),
      platformFee: payment.platformFee,
      platformFeeGhs: Number((payment.platformFee / 100).toFixed(2)),
      totalAmount: payment.totalAmount,
      currency: payment.currency,
      votesPurchased: payment.votesPurchased,
      customAmount: payment.customAmount,
      voterName: payment.anonymous ? undefined : payment.voterName,
      voterEmail: payment.anonymous ? undefined : payment.voterEmail,
      anonymous: payment.anonymous,
      contestant,
      package: mapPopulatedPackage(payment.packageId),
      verifiedAt: payment.verifiedAt,
      createdAt: payment.createdAt,
    };
  }

  private toAdminVoteHistory(
    entry: VoteLedgerDocument,
    contestantNameLookup?: Map<string, string>,
  ) {
    const contestant = mapPopulatedContestant(
      entry.contestantId,
      contestantNameLookup,
    );
    const contestantId =
      contestant?.id ?? getDocumentId(entry.contestantId) ?? '';
    const contestantName = contestant?.displayName ?? contestant?.name ?? null;

    return {
      id: entry._id.toString(),
      votes: entry.votes,
      type: entry.type,
      reason: entry.reason,
      providerReference: entry.providerReference,
      contestantId,
      contestantName,
      contestant,
      payment: mapPopulatedPayment(entry.paymentId),
      adjustedBy: mapPopulatedUser(entry.adjustedByUserId),
      createdAt: entry.createdAt,
    };
  }

  async adminCreditVotes(dto: AdminCreditVotesDto, admin: AuthenticatedUser) {
    if (dto.providerReference) {
      const existingPayment =
        await this.paymentRepository.findByProviderReference(
          dto.providerReference,
        );
      if (existingPayment?.status === PaymentStatus.SUCCESS) {
        const contestant = await this.contestantRepository.findById(
          existingPayment.contestantId.toString(),
        );
        return {
          success: true,
          alreadyCredited: true,
          contestantId: existingPayment.contestantId.toString(),
          votesAdded: existingPayment.votesPurchased,
          newVoteTotal: contestant?.voteCount ?? 0,
        };
      }

      const existingAdjustment =
        await this.voteLedgerRepository.findByProviderReference(
          dto.providerReference,
        );
      if (existingAdjustment) {
        const contestant = await this.contestantRepository.findById(
          existingAdjustment.contestantId.toString(),
        );
        return {
          success: true,
          alreadyCredited: true,
          contestantId: existingAdjustment.contestantId.toString(),
          votesAdded: existingAdjustment.votes,
          newVoteTotal: contestant?.voteCount ?? 0,
        };
      }
    }

    const contestant = await this.contestantRepository.findById(
      dto.contestantId,
    );
    if (!contestant || !contestant.isActive) {
      throw new NotFoundException('Contestant not found');
    }

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      await this.voteLedgerRepository.create({
        contestantId: new Types.ObjectId(dto.contestantId),
        votes: dto.votes,
        type: VoteLedgerType.ADJUSTMENT,
        reason: dto.reason,
        adjustedByUserId: new Types.ObjectId(admin.id),
        providerReference: dto.providerReference,
      });

      const updatedContestant =
        await this.contestantRepository.incrementVoteCount(
          dto.contestantId,
          dto.votes,
        );

      await session.commitTransaction();

      await this.auditService.log({
        actorId: admin.id,
        action: 'votes.admin_credit',
        entity: 'contestant',
        entityId: dto.contestantId,
        summary: {
          votes: dto.votes,
          reason: dto.reason,
          providerReference: dto.providerReference,
        },
      });

      const leaderboard = await this.leaderboardService.getLeaderboard(50, 0);
      this.realtimeGateway.emitLeaderboardUpdate(leaderboard);
      this.realtimeGateway.emitVoteConfirmed({
        contestantId: dto.contestantId,
        votesAdded: dto.votes,
        newTotal: updatedContestant?.voteCount ?? 0,
      });

      return {
        success: true,
        alreadyCredited: false,
        contestantId: dto.contestantId,
        votesAdded: dto.votes,
        newVoteTotal: updatedContestant?.voteCount ?? 0,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      void session.endSession();
    }
  }
}

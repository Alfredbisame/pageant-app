"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingService = exports.QuoteService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const contestant_repository_1 = require("../../shared/repositories/contestant.repository");
const vote_package_repository_1 = require("../../shared/repositories/vote-package.repository");
const event_config_repository_1 = require("../../shared/repositories/event-config.repository");
const payment_repository_1 = require("../../shared/repositories/payment.repository");
const vote_ledger_repository_1 = require("../../shared/repositories/vote-ledger.repository");
const payment_verification_service_1 = require("../payments/payment-verification.service");
const realtime_gateway_1 = require("../../realtime/realtime.gateway");
const leaderboard_service_1 = require("../leaderboard/leaderboard.service");
const audit_service_1 = require("../audit/audit.service");
const constants_1 = require("../../common/constants");
const helpers_1 = require("../../common/utils/helpers");
let QuoteService = class QuoteService {
    contestantRepository;
    votePackageRepository;
    eventConfigRepository;
    configService;
    constructor(contestantRepository, votePackageRepository, eventConfigRepository, configService) {
        this.contestantRepository = contestantRepository;
        this.votePackageRepository = votePackageRepository;
        this.eventConfigRepository = eventConfigRepository;
        this.configService = configService;
    }
    async calculateQuote(dto) {
        await this.assertVotingOpen();
        await this.assertContestant(dto.contestantId);
        const eventConfig = await this.eventConfigRepository.getSingleton();
        let baseAmount;
        let votes;
        if (dto.packageId) {
            const pkg = await this.votePackageRepository.findById(dto.packageId);
            if (!pkg || !pkg.isActive) {
                throw new common_1.NotFoundException('Vote package not found');
            }
            baseAmount = pkg.baseAmount;
            votes = pkg.votes;
        }
        else if (dto.customAmount) {
            baseAmount = dto.customAmount;
            const pricePerVote = this.configService.get('payments.pricePerVotePaise', 100);
            votes = Math.floor(baseAmount / pricePerVote);
            if (votes < 1) {
                throw new common_1.BadRequestException('Custom amount too low for any votes');
            }
        }
        else {
            throw new common_1.BadRequestException('packageId or customAmount is required');
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
    async assertVotingOpen() {
        const config = await this.eventConfigRepository.getSingleton();
        const now = new Date();
        if (!config.votingEnabled) {
            throw new common_1.ForbiddenException('Voting is currently disabled');
        }
        if (config.votingStartsAt && now < config.votingStartsAt) {
            throw new common_1.ForbiddenException('Voting has not started yet');
        }
        if (config.votingEndsAt && now > config.votingEndsAt) {
            throw new common_1.ForbiddenException('Voting has ended');
        }
    }
    async assertContestant(contestantId) {
        const contestant = await this.contestantRepository.findById(contestantId);
        if (!contestant || !contestant.isActive) {
            throw new common_1.NotFoundException('Contestant not found');
        }
    }
};
exports.QuoteService = QuoteService;
exports.QuoteService = QuoteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contestant_repository_1.ContestantRepository,
        vote_package_repository_1.VotePackageRepository,
        event_config_repository_1.EventConfigRepository,
        config_1.ConfigService])
], QuoteService);
let VotingService = class VotingService {
    quoteService;
    paymentVerificationService;
    paymentRepository;
    voteLedgerRepository;
    contestantRepository;
    eventConfigRepository;
    realtimeGateway;
    leaderboardService;
    auditService;
    connection;
    constructor(quoteService, paymentVerificationService, paymentRepository, voteLedgerRepository, contestantRepository, eventConfigRepository, realtimeGateway, leaderboardService, auditService, connection) {
        this.quoteService = quoteService;
        this.paymentVerificationService = paymentVerificationService;
        this.paymentRepository = paymentRepository;
        this.voteLedgerRepository = voteLedgerRepository;
        this.contestantRepository = contestantRepository;
        this.eventConfigRepository = eventConfigRepository;
        this.realtimeGateway = realtimeGateway;
        this.leaderboardService = leaderboardService;
        this.auditService = auditService;
        this.connection = connection;
    }
    quote(dto) {
        return this.quoteService.calculateQuote(dto);
    }
    async confirm(dto, user) {
        const existing = await this.paymentRepository.findByProviderReference(dto.providerReference);
        if (existing?.status === constants_1.PaymentStatus.SUCCESS) {
            const contestant = await this.contestantRepository.findById(existing.contestantId.toString());
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
            const dailyCount = await this.paymentRepository.countDailyVotesByEmail(dto.voterEmail, startOfDay);
            if (dailyCount >= eventConfig.dailyVoteLimitPerVoter) {
                throw new common_1.ForbiddenException('Daily vote limit reached');
            }
        }
        const verification = await this.paymentVerificationService.verify(dto.provider, dto.providerReference);
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
            throw new common_1.BadRequestException('Payment verification failed');
        }
        if (verification.amount !== quote.totalAmount) {
            throw new common_1.BadRequestException('Payment amount mismatch');
        }
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const reference = (0, helpers_1.generateReference)('PAY');
            const payment = await this.paymentRepository.create({
                reference,
                providerReference: dto.providerReference,
                provider: dto.provider,
                status: constants_1.PaymentStatus.SUCCESS,
                baseAmount: quote.baseAmount,
                platformFee: quote.platformFee,
                totalAmount: quote.totalAmount,
                currency: quote.currency,
                contestantId: new mongoose_2.Types.ObjectId(dto.contestantId),
                packageId: dto.packageId
                    ? new mongoose_2.Types.ObjectId(dto.packageId)
                    : undefined,
                customAmount: dto.customAmount,
                votesPurchased: quote.votes,
                voterName: dto.voterName,
                voterEmail: dto.voterEmail.toLowerCase(),
                anonymous: dto.anonymous ?? false,
                userId: user?.id ? new mongoose_2.Types.ObjectId(user.id) : undefined,
                providerPayload: { ...dto.providerPayload, verified: verification.raw },
                verifiedAt: new Date(),
            });
            await this.voteLedgerRepository.create({
                paymentId: payment._id,
                contestantId: new mongoose_2.Types.ObjectId(dto.contestantId),
                votes: quote.votes,
                type: constants_1.VoteLedgerType.CREDIT,
            });
            const updatedContestant = await this.contestantRepository.incrementVoteCount(dto.contestantId, quote.votes);
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
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            void session.endSession();
        }
    }
    async getHistory(userId) {
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
    async getTransactionStatus(reference) {
        const payment = await this.paymentRepository.findByReference(reference);
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        return {
            reference: payment.reference,
            status: payment.status,
            votesPurchased: payment.votesPurchased,
            contestantId: payment.contestantId.toString(),
        };
    }
};
exports.VotingService = VotingService;
exports.VotingService = VotingService = __decorate([
    (0, common_1.Injectable)(),
    __param(9, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [QuoteService,
        payment_verification_service_1.PaymentVerificationService,
        payment_repository_1.PaymentRepository,
        vote_ledger_repository_1.VoteLedgerRepository,
        contestant_repository_1.ContestantRepository,
        event_config_repository_1.EventConfigRepository,
        realtime_gateway_1.RealtimeGateway,
        leaderboard_service_1.LeaderboardService,
        audit_service_1.AuditService,
        mongoose_2.Connection])
], VotingService);
//# sourceMappingURL=voting.service.js.map
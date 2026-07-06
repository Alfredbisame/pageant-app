import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { ContestantRepository } from "../../shared/repositories/contestant.repository";
import { VotePackageRepository } from "../../shared/repositories/vote-package.repository";
import { EventConfigRepository } from "../../shared/repositories/event-config.repository";
import { PaymentRepository } from "../../shared/repositories/payment.repository";
import { VoteLedgerRepository } from "../../shared/repositories/vote-ledger.repository";
import type { PaymentListQuery } from "../../shared/repositories/payment.repository";
import type { VoteLedgerListQuery } from "../../shared/repositories/vote-ledger.repository";
import { PaymentVerificationService } from "../payments/payment-verification.service";
import { RealtimeGateway } from "../../realtime/realtime.gateway";
import { LeaderboardService } from "../leaderboard/leaderboard.service";
import { AuditService } from "../audit/audit.service";
import { VotingConfirmDto, VotingQuoteDto, AdminCreditVotesDto } from './dto/voting.dto';
import { PaymentStatus, VoteLedgerType } from "../../common/constants";
import { AuthenticatedUser } from "../../common/types";
export interface QuoteResult {
    baseAmount: number;
    platformFee: number;
    totalAmount: number;
    votes: number;
    pricePerVote: number;
    currency: string;
}
export declare class QuoteService {
    private readonly contestantRepository;
    private readonly votePackageRepository;
    private readonly eventConfigRepository;
    private readonly configService;
    constructor(contestantRepository: ContestantRepository, votePackageRepository: VotePackageRepository, eventConfigRepository: EventConfigRepository, configService: ConfigService);
    calculateQuote(dto: VotingQuoteDto): Promise<QuoteResult>;
    private assertVotingOpen;
    private assertContestant;
}
export declare class VotingService {
    private readonly quoteService;
    private readonly paymentVerificationService;
    private readonly paymentRepository;
    private readonly voteLedgerRepository;
    private readonly contestantRepository;
    private readonly eventConfigRepository;
    private readonly realtimeGateway;
    private readonly leaderboardService;
    private readonly auditService;
    private readonly connection;
    constructor(quoteService: QuoteService, paymentVerificationService: PaymentVerificationService, paymentRepository: PaymentRepository, voteLedgerRepository: VoteLedgerRepository, contestantRepository: ContestantRepository, eventConfigRepository: EventConfigRepository, realtimeGateway: RealtimeGateway, leaderboardService: LeaderboardService, auditService: AuditService, connection: Connection);
    quote(dto: VotingQuoteDto): Promise<QuoteResult>;
    confirm(dto: VotingConfirmDto, user?: AuthenticatedUser): Promise<{
        success: boolean;
        paymentId: string;
        contestantId: string;
        votesAdded: number;
        newVoteTotal: number;
    }>;
    getHistory(userId: string): Promise<{
        id: string;
        reference: string;
        contestantId: string;
        votesPurchased: number;
        totalAmount: number;
        status: PaymentStatus;
        createdAt: Date;
    }[]>;
    getTransactionStatus(reference: string): Promise<{
        reference: string;
        status: PaymentStatus;
        votesPurchased: number;
        contestantId: string;
    }>;
    getAdminTransactions(query: PaymentListQuery): Promise<{
        data: {
            id: string;
            reference: string;
            providerReference: string;
            provider: string;
            status: string;
            baseAmount: number;
            platformFee: number;
            totalAmount: number;
            currency: string;
            votesPurchased: number;
            customAmount: number | undefined;
            voterName: string | undefined;
            voterEmail: string | undefined;
            anonymous: boolean;
            contestant: {
                id: string;
                displayName?: undefined;
                entryNumber?: undefined;
            } | {
                id: string;
                displayName: string;
                entryNumber: number;
            };
            package: {
                id: string;
                name?: undefined;
                votes?: undefined;
                baseAmount?: undefined;
            } | {
                id: string;
                name: string;
                votes: number;
                baseAmount: number;
            } | undefined;
            verifiedAt: Date | undefined;
            createdAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getAdminVoteHistory(query: VoteLedgerListQuery): Promise<{
        data: {
            id: string;
            votes: number;
            type: VoteLedgerType;
            reason: string | undefined;
            providerReference: string | undefined;
            contestant: {
                id: string;
                displayName?: undefined;
                entryNumber?: undefined;
            } | {
                id: string;
                displayName: string;
                entryNumber: number;
            };
            payment: {
                id: string;
                reference?: undefined;
                providerReference?: undefined;
                status?: undefined;
                totalAmount?: undefined;
            } | {
                id: string;
                reference: string;
                providerReference: string;
                status: string;
                totalAmount: number;
            } | undefined;
            adjustedBy: {
                id: string;
                fullName?: undefined;
                email?: undefined;
            } | {
                id: string;
                fullName: string;
                email: string;
            } | undefined;
            createdAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    private toAdminTransaction;
    private toAdminVoteHistory;
    adminCreditVotes(dto: AdminCreditVotesDto, admin: AuthenticatedUser): Promise<{
        success: boolean;
        alreadyCredited: boolean;
        contestantId: string;
        votesAdded: number;
        newVoteTotal: number;
    }>;
}

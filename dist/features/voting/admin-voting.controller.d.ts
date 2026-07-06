import { VotingService } from './voting.service';
import { AdminCreditVotesDto, AdminTransactionQueryDto, AdminVoteHistoryQueryDto } from './dto/voting.dto';
import type { AuthenticatedUser } from "../../common/types";
export declare class AdminVotingController {
    private readonly votingService;
    constructor(votingService: VotingService);
    listTransactions(query: AdminTransactionQueryDto): Promise<{
        data: {
            id: string;
            reference: string;
            providerReference: string;
            provider: import("@/common/constants").PaymentProvider;
            status: import("@/common/constants").PaymentStatus;
            contestantId: string;
            contestantName: string | null;
            amount: number;
            amountGhs: number;
            baseAmount: number;
            baseAmountGhs: number;
            platformFee: number;
            platformFeeGhs: number;
            totalAmount: number;
            currency: string;
            votesPurchased: number;
            customAmount: number | undefined;
            voterName: string | undefined;
            voterEmail: string | undefined;
            anonymous: boolean;
            contestant: {
                id: string;
                name: string;
                displayName: string;
                entryNumber: number;
            } | {
                id: string;
                name: string | null;
                displayName: string | null;
                entryNumber: null;
            } | null;
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
    listVoteHistory(query: AdminVoteHistoryQueryDto): Promise<{
        data: {
            id: string;
            votes: number;
            type: import("@/common/constants").VoteLedgerType;
            reason: string | undefined;
            providerReference: string | undefined;
            contestantId: string;
            contestantName: string | null;
            contestant: {
                id: string;
                name: string;
                displayName: string;
                entryNumber: number;
            } | {
                id: string;
                name: string | null;
                displayName: string | null;
                entryNumber: null;
            } | null;
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
    creditVotes(dto: AdminCreditVotesDto, admin: AuthenticatedUser): Promise<{
        success: boolean;
        alreadyCredited: boolean;
        contestantId: string;
        votesAdded: number;
        newVoteTotal: number;
    }>;
}

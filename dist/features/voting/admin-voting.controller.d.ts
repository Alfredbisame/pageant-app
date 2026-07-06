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
    listVoteHistory(query: AdminVoteHistoryQueryDto): Promise<{
        data: {
            id: string;
            votes: number;
            type: import("@/common/constants").VoteLedgerType;
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
    creditVotes(dto: AdminCreditVotesDto, admin: AuthenticatedUser): Promise<{
        success: boolean;
        alreadyCredited: boolean;
        contestantId: string;
        votesAdded: number;
        newVoteTotal: number;
    }>;
}

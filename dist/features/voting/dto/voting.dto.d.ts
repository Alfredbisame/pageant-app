import { PaymentProvider, PaymentStatus, VoteLedgerType } from "../../../common/constants";
export declare class VotingQuoteDto {
    contestantId: string;
    packageId?: string;
    customAmount?: number;
}
export declare class VotingConfirmDto {
    provider: PaymentProvider;
    providerReference: string;
    providerPayload: Record<string, unknown>;
    contestantId: string;
    packageId?: string;
    customAmount?: number;
    voterName: string;
    voterEmail: string;
    anonymous?: boolean;
}
export declare class AdminCreditVotesDto {
    contestantId: string;
    votes: number;
    reason: string;
    providerReference?: string;
}
export declare class AdminTransactionQueryDto {
    page?: number;
    limit?: number;
    contestantId?: string;
    status?: PaymentStatus;
    voterEmail?: string;
    search?: string;
    provider?: PaymentProvider;
}
export declare class AdminVoteHistoryQueryDto {
    page?: number;
    limit?: number;
    contestantId?: string;
    type?: VoteLedgerType;
}

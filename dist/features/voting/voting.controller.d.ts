import { VotingService } from './voting.service';
import { VotingConfirmDto, VotingQuoteDto } from './dto/voting.dto';
import type { AuthenticatedUser } from "../../common/types";
export declare class VotingController {
    private readonly votingService;
    constructor(votingService: VotingService);
    quote(dto: VotingQuoteDto): Promise<import("./voting.service").QuoteResult>;
    confirm(dto: VotingConfirmDto, user?: AuthenticatedUser): Promise<{
        success: boolean;
        paymentId: string;
        contestantId: string;
        votesAdded: number;
        newVoteTotal: number;
    }>;
    history(user: AuthenticatedUser): Promise<{
        id: string;
        reference: string;
        contestantId: string;
        votesPurchased: number;
        totalAmount: number;
        status: import("../../common/constants").PaymentStatus;
        createdAt: Date;
    }[]>;
    transactionStatus(reference: string): Promise<{
        reference: string;
        status: import("../../common/constants").PaymentStatus;
        votesPurchased: number;
        contestantId: string;
    }>;
}

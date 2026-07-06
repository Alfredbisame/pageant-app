import { VotingService } from './voting.service';
import { AdminCreditVotesDto } from './dto/voting.dto';
import type { AuthenticatedUser } from "../../common/types";
export declare class AdminVotingController {
    private readonly votingService;
    constructor(votingService: VotingService);
    creditVotes(dto: AdminCreditVotesDto, admin: AuthenticatedUser): Promise<{
        success: boolean;
        alreadyCredited: boolean;
        contestantId: string;
        votesAdded: number;
        newVoteTotal: number;
    }>;
}

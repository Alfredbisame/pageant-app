import { ContestantRepository } from "../../shared/repositories/contestant.repository";
export declare class LeaderboardService {
    private readonly contestantRepository;
    constructor(contestantRepository: ContestantRepository);
    getLeaderboard(limit?: number, offset?: number): Promise<{
        top3: {
            rank: number;
            id: string;
            name: string;
            entryNumber: number;
            level: import("../../common/constants").ContestantLevel;
            votes: number;
            image: string;
        }[];
        rankings: {
            rank: number;
            id: string;
            name: string;
            entryNumber: number;
            level: import("../../common/constants").ContestantLevel;
            votes: number;
            image: string;
        }[];
        lastUpdatedAt: string;
    }>;
    getTop(count?: number): Promise<{
        rank: number;
        id: string;
        name: string;
        entryNumber: number;
        level: import("../../common/constants").ContestantLevel;
        votes: number;
        image: string;
    }[]>;
    getSummary(): Promise<{
        totalVotes: number;
        activeContestants: number;
        lastUpdatedAt: string;
    }>;
}

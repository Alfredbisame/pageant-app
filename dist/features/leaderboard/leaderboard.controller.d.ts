import { LeaderboardService } from './leaderboard.service';
declare class LeaderboardQueryDto {
    limit?: number;
    offset?: number;
}
export declare class LeaderboardController {
    private readonly leaderboardService;
    constructor(leaderboardService: LeaderboardService);
    getLeaderboard(query: LeaderboardQueryDto): Promise<{
        top3: {
            rank: number;
            id: string;
            name: string;
            entryNumber: number;
            level: import("../../common/constants").ContestantLevel | undefined;
            votes: number;
            image: string;
        }[];
        rankings: {
            rank: number;
            id: string;
            name: string;
            entryNumber: number;
            level: import("../../common/constants").ContestantLevel | undefined;
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
        level: import("../../common/constants").ContestantLevel | undefined;
        votes: number;
        image: string;
    }[]>;
    getSummary(): Promise<{
        totalVotes: number;
        activeContestants: number;
        lastUpdatedAt: string;
    }>;
}
export {};

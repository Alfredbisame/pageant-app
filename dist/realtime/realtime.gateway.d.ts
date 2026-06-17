import { Server } from 'socket.io';
export interface LeaderboardUpdatePayload {
    top3: unknown[];
    rankings: unknown[];
    lastUpdatedAt: string;
}
export interface VoteConfirmedPayload {
    contestantId: string;
    votesAdded: number;
    newTotal: number;
}
export declare class RealtimeGateway {
    server: Server;
    emitLeaderboardUpdate(payload: LeaderboardUpdatePayload): void;
    emitVoteConfirmed(payload: VoteConfirmedPayload): void;
}

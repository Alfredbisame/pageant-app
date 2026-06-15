import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
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

@WebSocketGateway()
export class RealtimeGateway {
  @WebSocketServer()
  server!: Server;

  emitLeaderboardUpdate(payload: LeaderboardUpdatePayload) {
    this.server?.emit('leaderboard:updated', payload);
  }

  emitVoteConfirmed(payload: VoteConfirmedPayload) {
    this.server?.emit('vote:confirmed', payload);
  }
}

import { Injectable } from '@nestjs/common';
import { ContestantRepository } from '../../shared/repositories/contestant.repository';

@Injectable()
export class LeaderboardService {
  constructor(private readonly contestantRepository: ContestantRepository) {}

  async getLeaderboard(limit = 50, offset = 0) {
    const contestants = await this.contestantRepository.findLeaderboard(
      limit,
      offset,
    );

    const rankings = contestants.map((c, index) => ({
      rank: offset + index + 1,
      id: c._id.toString(),
      name: c.displayName,
      entryNumber: c.entryNumber,
      level: c.level,
      votes: c.voteCount,
      image: c.avatarUrl,
    }));

    return {
      top3: rankings.slice(0, 3),
      rankings,
      lastUpdatedAt: new Date().toISOString(),
    };
  }

  async getTop(count = 3) {
    const leaderboard = await this.getLeaderboard(count, 0);
    return leaderboard.top3;
  }

  async getSummary() {
    const contestants = await this.contestantRepository.find({
      isActive: true,
    });

    const totalVotes = contestants.reduce((sum, c) => sum + c.voteCount, 0);

    return {
      totalVotes,
      activeContestants: contestants.length,
      lastUpdatedAt: new Date().toISOString(),
    };
  }
}

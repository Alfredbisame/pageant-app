"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const common_1 = require("@nestjs/common");
const contestant_repository_1 = require("../../shared/repositories/contestant.repository");
let LeaderboardService = class LeaderboardService {
    contestantRepository;
    constructor(contestantRepository) {
        this.contestantRepository = contestantRepository;
    }
    async getLeaderboard(limit = 50, offset = 0) {
        const contestants = await this.contestantRepository.findLeaderboard(limit, offset);
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
};
exports.LeaderboardService = LeaderboardService;
exports.LeaderboardService = LeaderboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contestant_repository_1.ContestantRepository])
], LeaderboardService);
//# sourceMappingURL=leaderboard.service.js.map
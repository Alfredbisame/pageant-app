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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const leaderboard_service_1 = require("./leaderboard.service");
const decorators_1 = require("../../common/decorators");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_2 = require("@nestjs/swagger");
class LeaderboardQueryDto {
    limit;
    offset;
}
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ default: 50 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LeaderboardQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ default: 0 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LeaderboardQueryDto.prototype, "offset", void 0);
let LeaderboardController = class LeaderboardController {
    leaderboardService;
    constructor(leaderboardService) {
        this.leaderboardService = leaderboardService;
    }
    getLeaderboard(query) {
        return this.leaderboardService.getLeaderboard(query.limit ?? 50, query.offset ?? 0);
    }
    getTop(count) {
        return this.leaderboardService.getTop(Number(count) || 3);
    }
    getSummary() {
        return this.leaderboardService.getSummary();
    }
};
exports.LeaderboardController = LeaderboardController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get full leaderboard rankings' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LeaderboardQueryDto]),
    __metadata("design:returntype", void 0)
], LeaderboardController.prototype, "getLeaderboard", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('top'),
    (0, swagger_1.ApiOperation)({ summary: 'Get top N contestants' }),
    __param(0, (0, common_1.Query)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LeaderboardController.prototype, "getTop", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get leaderboard summary stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaderboardController.prototype, "getSummary", null);
exports.LeaderboardController = LeaderboardController = __decorate([
    (0, swagger_1.ApiTags)('Leaderboard'),
    (0, common_1.Controller)('leaderboard'),
    __metadata("design:paramtypes", [leaderboard_service_1.LeaderboardService])
], LeaderboardController);
//# sourceMappingURL=leaderboard.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingModule = void 0;
const common_1 = require("@nestjs/common");
const voting_controller_1 = require("./voting.controller");
const admin_voting_controller_1 = require("./admin-voting.controller");
const voting_service_1 = require("./voting.service");
const payments_module_1 = require("../payments/payments.module");
const realtime_module_1 = require("../../realtime/realtime.module");
const leaderboard_module_1 = require("../leaderboard/leaderboard.module");
const audit_module_1 = require("../audit/audit.module");
let VotingModule = class VotingModule {
};
exports.VotingModule = VotingModule;
exports.VotingModule = VotingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            payments_module_1.PaymentsModule,
            (0, common_1.forwardRef)(() => realtime_module_1.RealtimeModule),
            (0, common_1.forwardRef)(() => leaderboard_module_1.LeaderboardModule),
            audit_module_1.AuditModule,
        ],
        controllers: [voting_controller_1.VotingController, admin_voting_controller_1.AdminVotingController],
        providers: [voting_service_1.VotingService, voting_service_1.QuoteService],
        exports: [voting_service_1.VotingService],
    })
], VotingModule);
//# sourceMappingURL=voting.module.js.map
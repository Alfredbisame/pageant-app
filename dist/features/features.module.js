"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FeaturesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const contestants_module_1 = require("./contestants/contestants.module");
const vote_packages_module_1 = require("./vote-packages/vote-packages.module");
const voting_module_1 = require("./voting/voting.module");
const payments_module_1 = require("./payments/payments.module");
const leaderboard_module_1 = require("./leaderboard/leaderboard.module");
const event_config_module_1 = require("./event-config/event-config.module");
const audit_module_1 = require("./audit/audit.module");
const health_module_1 = require("./health/health.module");
const files_module_1 = require("./files/files.module");
const about_page_module_1 = require("./about-page/about-page.module");
const home_page_module_1 = require("./home-page/home-page.module");
const featureModules = [
    auth_module_1.AuthModule,
    users_module_1.UsersModule,
    contestants_module_1.ContestantsModule,
    vote_packages_module_1.VotePackagesModule,
    payments_module_1.PaymentsModule,
    voting_module_1.VotingModule,
    leaderboard_module_1.LeaderboardModule,
    event_config_module_1.EventConfigModule,
    audit_module_1.AuditModule,
    health_module_1.HealthModule,
    files_module_1.FilesModule,
    about_page_module_1.AboutPageModule,
    home_page_module_1.HomePageModule,
];
let FeaturesModule = FeaturesModule_1 = class FeaturesModule {
    static register() {
        return {
            module: FeaturesModule_1,
            imports: featureModules,
        };
    }
    static discover() {
        return featureModules;
    }
};
exports.FeaturesModule = FeaturesModule;
exports.FeaturesModule = FeaturesModule = FeaturesModule_1 = __decorate([
    (0, common_1.Module)({})
], FeaturesModule);
//# sourceMappingURL=features.module.js.map
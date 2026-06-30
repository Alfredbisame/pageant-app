"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutPageRepository = exports.AuditLogRepository = exports.EventConfigRepository = exports.VoteLedgerRepository = exports.PaymentRepository = exports.VotePackageRepository = exports.ContestantRepository = exports.UserRepository = exports.RepositoriesModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../database/database.module");
const user_repository_1 = require("./user.repository");
Object.defineProperty(exports, "UserRepository", { enumerable: true, get: function () { return user_repository_1.UserRepository; } });
const contestant_repository_1 = require("./contestant.repository");
Object.defineProperty(exports, "ContestantRepository", { enumerable: true, get: function () { return contestant_repository_1.ContestantRepository; } });
const vote_package_repository_1 = require("./vote-package.repository");
Object.defineProperty(exports, "VotePackageRepository", { enumerable: true, get: function () { return vote_package_repository_1.VotePackageRepository; } });
const payment_repository_1 = require("./payment.repository");
Object.defineProperty(exports, "PaymentRepository", { enumerable: true, get: function () { return payment_repository_1.PaymentRepository; } });
const vote_ledger_repository_1 = require("./vote-ledger.repository");
Object.defineProperty(exports, "VoteLedgerRepository", { enumerable: true, get: function () { return vote_ledger_repository_1.VoteLedgerRepository; } });
const event_config_repository_1 = require("./event-config.repository");
Object.defineProperty(exports, "EventConfigRepository", { enumerable: true, get: function () { return event_config_repository_1.EventConfigRepository; } });
const audit_log_repository_1 = require("./audit-log.repository");
Object.defineProperty(exports, "AuditLogRepository", { enumerable: true, get: function () { return audit_log_repository_1.AuditLogRepository; } });
const about_page_repository_1 = require("./about-page.repository");
Object.defineProperty(exports, "AboutPageRepository", { enumerable: true, get: function () { return about_page_repository_1.AboutPageRepository; } });
const repositories = [
    user_repository_1.UserRepository,
    contestant_repository_1.ContestantRepository,
    vote_package_repository_1.VotePackageRepository,
    payment_repository_1.PaymentRepository,
    vote_ledger_repository_1.VoteLedgerRepository,
    event_config_repository_1.EventConfigRepository,
    audit_log_repository_1.AuditLogRepository,
    about_page_repository_1.AboutPageRepository,
];
let RepositoriesModule = class RepositoriesModule {
};
exports.RepositoriesModule = RepositoriesModule;
exports.RepositoriesModule = RepositoriesModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: repositories,
        exports: repositories,
    })
], RepositoriesModule);
//# sourceMappingURL=repositories.module.js.map
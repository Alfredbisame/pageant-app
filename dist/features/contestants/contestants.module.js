"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestantsModule = void 0;
const common_1 = require("@nestjs/common");
const contestants_controller_1 = require("./contestants.controller");
const admin_contestants_controller_1 = require("./admin-contestants.controller");
const contestants_service_1 = require("./contestants.service");
const audit_module_1 = require("../audit/audit.module");
let ContestantsModule = class ContestantsModule {
};
exports.ContestantsModule = ContestantsModule;
exports.ContestantsModule = ContestantsModule = __decorate([
    (0, common_1.Module)({
        imports: [audit_module_1.AuditModule],
        controllers: [contestants_controller_1.ContestantsController, admin_contestants_controller_1.AdminContestantsController],
        providers: [contestants_service_1.ContestantsService],
        exports: [contestants_service_1.ContestantsService],
    })
], ContestantsModule);
//# sourceMappingURL=contestants.module.js.map
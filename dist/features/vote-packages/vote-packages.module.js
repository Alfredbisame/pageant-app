"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotePackagesModule = void 0;
const common_1 = require("@nestjs/common");
const vote_packages_controller_1 = require("./vote-packages.controller");
const admin_vote_packages_controller_1 = require("./admin-vote-packages.controller");
const vote_packages_service_1 = require("./vote-packages.service");
let VotePackagesModule = class VotePackagesModule {
};
exports.VotePackagesModule = VotePackagesModule;
exports.VotePackagesModule = VotePackagesModule = __decorate([
    (0, common_1.Module)({
        controllers: [vote_packages_controller_1.VotePackagesController, admin_vote_packages_controller_1.AdminVotePackagesController],
        providers: [vote_packages_service_1.VotePackagesService],
        exports: [vote_packages_service_1.VotePackagesService],
    })
], VotePackagesModule);
//# sourceMappingURL=vote-packages.module.js.map
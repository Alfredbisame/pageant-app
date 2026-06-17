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
exports.VotePackagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vote_packages_service_1 = require("./vote-packages.service");
const decorators_1 = require("../../common/decorators");
let VotePackagesController = class VotePackagesController {
    votePackagesService;
    constructor(votePackagesService) {
        this.votePackagesService = votePackagesService;
    }
    findActive() {
        return this.votePackagesService.findActive();
    }
};
exports.VotePackagesController = VotePackagesController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List active vote packages' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VotePackagesController.prototype, "findActive", null);
exports.VotePackagesController = VotePackagesController = __decorate([
    (0, swagger_1.ApiTags)('Vote Packages'),
    (0, common_1.Controller)('vote-packages'),
    __metadata("design:paramtypes", [vote_packages_service_1.VotePackagesService])
], VotePackagesController);
//# sourceMappingURL=vote-packages.controller.js.map
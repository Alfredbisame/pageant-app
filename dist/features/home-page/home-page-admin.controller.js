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
exports.HomePageAdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const home_page_service_1 = require("./home-page.service");
const decorators_1 = require("../../common/decorators");
const constants_1 = require("../../common/constants");
const parse_object_id_pipe_1 = require("../../common/pipes/parse-object-id.pipe");
const dto_1 = require("./dto");
let HomePageAdminController = class HomePageAdminController {
    homePageService;
    constructor(homePageService) {
        this.homePageService = homePageService;
    }
    getHero() {
        return this.homePageService.getHeroSection();
    }
    updateHero(dto) {
        return this.homePageService.updateHeroSection(dto);
    }
    getRewards() {
        return this.homePageService.getRewardsSection();
    }
    updateRewards(dto) {
        return this.homePageService.updateRewardsSection(dto);
    }
    getPrizes() {
        return this.homePageService.getAllPrizes();
    }
    createPrize(dto) {
        return this.homePageService.createPrize(dto);
    }
    updatePrize(id, dto) {
        return this.homePageService.updatePrize(id, dto);
    }
    deletePrize(id) {
        return this.homePageService.deletePrize(id);
    }
    getLegacy() {
        return this.homePageService.getLegacySection();
    }
    updateLegacy(dto) {
        return this.homePageService.updateLegacySection(dto);
    }
};
exports.HomePageAdminController = HomePageAdminController;
__decorate([
    (0, common_1.Get)('hero'),
    (0, decorators_1.Roles)(constants_1.UserRole.ADMIN, constants_1.UserRole.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Get hero section configuration for admin' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomePageAdminController.prototype, "getHero", null);
__decorate([
    (0, common_1.Put)('hero'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Hero section updated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update hero section configuration' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateHeroDto]),
    __metadata("design:returntype", void 0)
], HomePageAdminController.prototype, "updateHero", null);
__decorate([
    (0, common_1.Get)('rewards'),
    (0, decorators_1.Roles)(constants_1.UserRole.ADMIN, constants_1.UserRole.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Get rewards section configuration for admin' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomePageAdminController.prototype, "getRewards", null);
__decorate([
    (0, common_1.Put)('rewards'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Rewards section updated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update rewards section configuration' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateRewardsDto]),
    __metadata("design:returntype", void 0)
], HomePageAdminController.prototype, "updateRewards", null);
__decorate([
    (0, common_1.Get)('prizes'),
    (0, decorators_1.Roles)(constants_1.UserRole.ADMIN, constants_1.UserRole.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'List all prizes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomePageAdminController.prototype, "getPrizes", null);
__decorate([
    (0, common_1.Post)('prizes'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Prize created' }),
    (0, swagger_1.ApiOperation)({ summary: 'Create prize card' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePrizeDto]),
    __metadata("design:returntype", void 0)
], HomePageAdminController.prototype, "createPrize", null);
__decorate([
    (0, common_1.Put)('prizes/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Prize updated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update prize card details' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePrizeDto]),
    __metadata("design:returntype", void 0)
], HomePageAdminController.prototype, "updatePrize", null);
__decorate([
    (0, common_1.Delete)('prizes/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Prize deleted' }),
    (0, swagger_1.ApiOperation)({ summary: 'Delete prize card' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomePageAdminController.prototype, "deletePrize", null);
__decorate([
    (0, common_1.Get)('legacy'),
    (0, decorators_1.Roles)(constants_1.UserRole.ADMIN, constants_1.UserRole.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Get legacy section configuration for admin' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomePageAdminController.prototype, "getLegacy", null);
__decorate([
    (0, common_1.Put)('legacy'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Legacy section updated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update legacy section configuration' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateLegacyDto]),
    __metadata("design:returntype", void 0)
], HomePageAdminController.prototype, "updateLegacy", null);
exports.HomePageAdminController = HomePageAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Home Page'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(constants_1.UserRole.ADMIN),
    (0, common_1.Controller)('admin/home-page'),
    __metadata("design:paramtypes", [home_page_service_1.HomePageService])
], HomePageAdminController);
//# sourceMappingURL=home-page-admin.controller.js.map
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
exports.AboutPageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const about_page_service_1 = require("./about-page.service");
const dto_1 = require("./dto");
const decorators_1 = require("../../common/decorators");
const constants_1 = require("../../common/constants");
let AboutPageController = class AboutPageController {
    aboutPageService;
    constructor(aboutPageService) {
        this.aboutPageService = aboutPageService;
    }
    get() {
        return this.aboutPageService.get();
    }
    updateHero(dto) {
        return this.aboutPageService.updateHero(dto);
    }
    updateMissionVision(dto) {
        return this.aboutPageService.updateMissionVision(dto);
    }
    updateImpactStats(dto) {
        return this.aboutPageService.updateImpactStats(dto);
    }
    updateTimeline(dto) {
        return this.aboutPageService.updateTimeline(dto);
    }
    updateTeam(dto) {
        return this.aboutPageService.updateTeam(dto);
    }
};
exports.AboutPageController = AboutPageController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get full about page config for admin' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AboutPageController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)('hero'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Hero section updated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update about page hero section' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateHeroDto]),
    __metadata("design:returntype", void 0)
], AboutPageController.prototype, "updateHero", null);
__decorate([
    (0, common_1.Patch)('mission-vision'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Mission and Vision section updated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update about page mission and vision section' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateMissionVisionDto]),
    __metadata("design:returntype", void 0)
], AboutPageController.prototype, "updateMissionVision", null);
__decorate([
    (0, common_1.Patch)('impact-stats'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Impact stats updated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update about page impact stats' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateImpactStatsDto]),
    __metadata("design:returntype", void 0)
], AboutPageController.prototype, "updateImpactStats", null);
__decorate([
    (0, common_1.Patch)('timeline'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Timeline section updated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update about page timeline section' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateTimelineDto]),
    __metadata("design:returntype", void 0)
], AboutPageController.prototype, "updateTimeline", null);
__decorate([
    (0, common_1.Patch)('team'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Team section updated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update about page team section' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateTeamDto]),
    __metadata("design:returntype", void 0)
], AboutPageController.prototype, "updateTeam", null);
exports.AboutPageController = AboutPageController = __decorate([
    (0, swagger_1.ApiTags)('Admin - About Page'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(constants_1.UserRole.ADMIN),
    (0, common_1.Controller)('admin/about-page'),
    __metadata("design:paramtypes", [about_page_service_1.AboutPageService])
], AboutPageController);
//# sourceMappingURL=about-page.controller.js.map
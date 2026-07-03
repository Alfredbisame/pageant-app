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
exports.HomePageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const home_page_service_1 = require("./home-page.service");
let HomePageController = class HomePageController {
    homePageService;
    constructor(homePageService) {
        this.homePageService = homePageService;
    }
    getPublic() {
        return this.homePageService.getCombinedPublicData();
    }
};
exports.HomePageController = HomePageController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('public'),
    (0, swagger_1.ApiOperation)({ summary: 'Get public home page configuration' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomePageController.prototype, "getPublic", null);
exports.HomePageController = HomePageController = __decorate([
    (0, swagger_1.ApiTags)('Home Page'),
    (0, common_1.Controller)('home-page'),
    __metadata("design:paramtypes", [home_page_service_1.HomePageService])
], HomePageController);
//# sourceMappingURL=home-page.controller.js.map
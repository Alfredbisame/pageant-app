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
exports.PublicAboutPageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const about_page_service_1 = require("./about-page.service");
let PublicAboutPageController = class PublicAboutPageController {
    aboutPageService;
    constructor(aboutPageService) {
        this.aboutPageService = aboutPageService;
    }
    getPublic() {
        return this.aboutPageService.getPublic();
    }
};
exports.PublicAboutPageController = PublicAboutPageController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('public'),
    (0, swagger_1.ApiOperation)({ summary: 'Get public about page configuration' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicAboutPageController.prototype, "getPublic", null);
exports.PublicAboutPageController = PublicAboutPageController = __decorate([
    (0, swagger_1.ApiTags)('About Page'),
    (0, common_1.Controller)('about-page'),
    __metadata("design:paramtypes", [about_page_service_1.AboutPageService])
], PublicAboutPageController);
//# sourceMappingURL=public-about-page.controller.js.map
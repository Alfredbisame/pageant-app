"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutPageModule = void 0;
const common_1 = require("@nestjs/common");
const about_page_controller_1 = require("./about-page.controller");
const public_about_page_controller_1 = require("./public-about-page.controller");
const about_page_service_1 = require("./about-page.service");
let AboutPageModule = class AboutPageModule {
};
exports.AboutPageModule = AboutPageModule;
exports.AboutPageModule = AboutPageModule = __decorate([
    (0, common_1.Module)({
        controllers: [about_page_controller_1.AboutPageController, public_about_page_controller_1.PublicAboutPageController],
        providers: [about_page_service_1.AboutPageService],
        exports: [about_page_service_1.AboutPageService],
    })
], AboutPageModule);
//# sourceMappingURL=about-page.module.js.map
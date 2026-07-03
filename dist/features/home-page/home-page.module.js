"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePageModule = void 0;
const common_1 = require("@nestjs/common");
const home_page_controller_1 = require("./home-page.controller");
const home_page_admin_controller_1 = require("./home-page-admin.controller");
const home_page_service_1 = require("./home-page.service");
let HomePageModule = class HomePageModule {
};
exports.HomePageModule = HomePageModule;
exports.HomePageModule = HomePageModule = __decorate([
    (0, common_1.Module)({
        controllers: [home_page_controller_1.HomePageController, home_page_admin_controller_1.HomePageAdminController],
        providers: [home_page_service_1.HomePageService],
        exports: [home_page_service_1.HomePageService],
    })
], HomePageModule);
//# sourceMappingURL=home-page.module.js.map
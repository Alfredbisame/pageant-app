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
exports.PublicEventController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const event_config_service_1 = require("./event-config.service");
const event_config_dto_1 = require("./dto/event-config.dto");
let PublicEventController = class PublicEventController {
    eventConfigService;
    constructor(eventConfigService) {
        this.eventConfigService = eventConfigService;
    }
    getPublic() {
        return this.eventConfigService.getPublic();
    }
};
exports.PublicEventController = PublicEventController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('public'),
    (0, swagger_1.ApiOperation)({ summary: 'Get public event configuration for the voter UI' }),
    (0, swagger_1.ApiOkResponse)({ type: event_config_dto_1.PublicEventConfigDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicEventController.prototype, "getPublic", null);
exports.PublicEventController = PublicEventController = __decorate([
    (0, swagger_1.ApiTags)('Event'),
    (0, common_1.Controller)('event'),
    __metadata("design:paramtypes", [event_config_service_1.EventConfigService])
], PublicEventController);
//# sourceMappingURL=public-event.controller.js.map
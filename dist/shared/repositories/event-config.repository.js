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
exports.EventConfigRepository = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_config_schema_1 = require("../../database/schemas/event-config.schema");
const base_repository_1 = require("./base.repository");
let EventConfigRepository = class EventConfigRepository extends base_repository_1.BaseRepository {
    configService;
    constructor(model, configService) {
        super(model);
        this.configService = configService;
    }
    async getSingleton() {
        let config = await this.model.findOne().exec();
        if (!config) {
            const votingEnabled = this.configService.get('event.defaults.votingEnabled', false);
            const platformFeeRate = this.configService.get('event.defaults.platformFeeRate', 0.025);
            const eventName = this.configService.get('event.defaults.eventName', 'ELL Pageant 10th Anniversary');
            config = await this.model.create({
                eventName,
                votingEnabled,
                platformFeeRate,
            });
        }
        return config;
    }
};
exports.EventConfigRepository = EventConfigRepository;
exports.EventConfigRepository = EventConfigRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_config_schema_1.EventConfig.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], EventConfigRepository);
//# sourceMappingURL=event-config.repository.js.map
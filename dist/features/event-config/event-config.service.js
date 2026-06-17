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
exports.EventConfigService = void 0;
const common_1 = require("@nestjs/common");
const event_config_repository_1 = require("../../shared/repositories/event-config.repository");
let EventConfigService = class EventConfigService {
    eventConfigRepository;
    constructor(eventConfigRepository) {
        this.eventConfigRepository = eventConfigRepository;
    }
    async get() {
        return this.eventConfigRepository.getSingleton();
    }
    async getPublic() {
        const config = await this.eventConfigRepository.getSingleton();
        return this.toPublic(config);
    }
    async update(dto) {
        const config = await this.eventConfigRepository.getSingleton();
        Object.assign(config, {
            ...dto,
            votingStartsAt: dto.votingStartsAt
                ? new Date(dto.votingStartsAt)
                : config.votingStartsAt,
            votingEndsAt: dto.votingEndsAt
                ? new Date(dto.votingEndsAt)
                : config.votingEndsAt,
        });
        await config.save();
        return config;
    }
    toPublic(config) {
        const now = new Date();
        const isVotingOpen = config.votingEnabled &&
            (!config.votingStartsAt || now >= config.votingStartsAt) &&
            (!config.votingEndsAt || now <= config.votingEndsAt);
        return {
            eventName: config.eventName ?? 'ELL Pageant 10th Anniversary',
            votingEnabled: config.votingEnabled,
            votingStartsAt: config.votingStartsAt?.toISOString(),
            votingEndsAt: config.votingEndsAt?.toISOString(),
            isVotingOpen,
        };
    }
};
exports.EventConfigService = EventConfigService;
exports.EventConfigService = EventConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_config_repository_1.EventConfigRepository])
], EventConfigService);
//# sourceMappingURL=event-config.service.js.map
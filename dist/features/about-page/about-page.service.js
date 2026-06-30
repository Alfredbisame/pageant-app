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
exports.AboutPageService = void 0;
const common_1 = require("@nestjs/common");
const about_page_repository_1 = require("../../shared/repositories/about-page.repository");
let AboutPageService = class AboutPageService {
    aboutPageRepository;
    constructor(aboutPageRepository) {
        this.aboutPageRepository = aboutPageRepository;
    }
    async getPublic() {
        const config = await this.aboutPageRepository.getSingleton();
        return this.toPublicPayload(config);
    }
    async get() {
        return this.aboutPageRepository.getSingleton();
    }
    async updateHero(dto) {
        const config = await this.aboutPageRepository.getSingleton();
        Object.assign(config.hero, dto);
        await config.save();
        return config;
    }
    async updateMissionVision(dto) {
        const config = await this.aboutPageRepository.getSingleton();
        config.missionVision = dto.items.map((item) => ({
            icon: item.icon,
            title: item.title,
            body: item.body,
        }));
        await config.save();
        return config;
    }
    async updateImpactStats(dto) {
        const config = await this.aboutPageRepository.getSingleton();
        config.impactStats = dto.items.map((item) => ({
            value: item.value,
            label: item.label,
            description: item.description,
        }));
        await config.save();
        return config;
    }
    async updateTimeline(dto) {
        const config = await this.aboutPageRepository.getSingleton();
        if (dto.heading !== undefined)
            config.timeline.heading = dto.heading;
        if (dto.subtitle !== undefined)
            config.timeline.subtitle = dto.subtitle;
        config.timeline.items = dto.items
            .map((item, index) => ({
            year: item.year,
            title: item.title,
            description: item.description,
            side: item.side,
            accent: item.accent,
            sortOrder: item.sortOrder ?? index,
        }))
            .sort((a, b) => a.sortOrder - b.sortOrder);
        await config.save();
        return config;
    }
    async updateTeam(dto) {
        const config = await this.aboutPageRepository.getSingleton();
        if (dto.heading !== undefined)
            config.team.heading = dto.heading;
        if (dto.subtitle !== undefined)
            config.team.subtitle = dto.subtitle;
        config.team.members = dto.members
            .map((member, index) => ({
            name: member.name,
            role: member.role,
            image: member.image,
            sortOrder: member.sortOrder ?? index,
        }))
            .sort((a, b) => a.sortOrder - b.sortOrder);
        await config.save();
        return config;
    }
    toPublicPayload(config) {
        return {
            hero: {
                backgroundImage: config.hero.backgroundImage,
                badgeText: config.hero.badgeText,
                headline: config.hero.headline,
                subtitle: config.hero.subtitle,
            },
            missionVision: config.missionVision.map((item) => ({
                icon: item.icon,
                title: item.title,
                body: item.body,
            })),
            impactStats: config.impactStats.map((item) => ({
                value: item.value,
                label: item.label,
                description: item.description,
            })),
            timeline: {
                heading: config.timeline.heading,
                subtitle: config.timeline.subtitle,
                items: config.timeline.items.map((item) => ({
                    year: item.year,
                    title: item.title,
                    description: item.description,
                    side: item.side,
                    accent: item.accent,
                    sortOrder: item.sortOrder,
                })),
            },
            team: {
                heading: config.team.heading,
                subtitle: config.team.subtitle,
                members: config.team.members.map((member) => ({
                    name: member.name,
                    role: member.role,
                    image: member.image,
                    sortOrder: member.sortOrder,
                })),
            },
        };
    }
};
exports.AboutPageService = AboutPageService;
exports.AboutPageService = AboutPageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [about_page_repository_1.AboutPageRepository])
], AboutPageService);
//# sourceMappingURL=about-page.service.js.map
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
exports.HomePageService = void 0;
const common_1 = require("@nestjs/common");
const hero_section_repository_1 = require("../../shared/repositories/hero-section.repository");
const rewards_section_repository_1 = require("../../shared/repositories/rewards-section.repository");
const prize_repository_1 = require("../../shared/repositories/prize.repository");
const legacy_section_repository_1 = require("../../shared/repositories/legacy-section.repository");
const rewards_section_repository_2 = require("../../shared/repositories/rewards-section.repository");
let HomePageService = class HomePageService {
    heroRepository;
    rewardsRepository;
    prizeRepository;
    legacyRepository;
    constructor(heroRepository, rewardsRepository, prizeRepository, legacyRepository) {
        this.heroRepository = heroRepository;
        this.rewardsRepository = rewardsRepository;
        this.prizeRepository = prizeRepository;
        this.legacyRepository = legacyRepository;
    }
    async getCombinedPublicData() {
        const [hero, rewardsSection, legacy, activePrizes] = await Promise.all([
            this.heroRepository.getSingleton(),
            this.rewardsRepository.getSingleton(),
            this.legacyRepository.getSingleton(),
            this.prizeRepository.findActiveSorted(),
        ]);
        return {
            hero: {
                titleMain: hero.titleMain,
                titleHighlight: hero.titleHighlight,
                description: hero.description,
            },
            rewards: {
                subtitle: rewardsSection.subtitle,
                title: rewardsSection.title,
                description: rewardsSection.description,
                prizes: activePrizes.map((p) => ({
                    id: p._id.toString(),
                    icon: p.icon,
                    title: p.title,
                    amount: p.amount,
                    subtitle: p.subtitle,
                    description: p.description,
                    variant: p.variant,
                })),
            },
            legacy: {
                imageUrl: legacy.imageUrl,
                imageAlt: legacy.imageAlt,
                subtitle: legacy.subtitle,
                title: legacy.title,
                description: legacy.description,
                linkUrl: legacy.linkUrl,
                linkLabel: legacy.linkLabel,
            },
        };
    }
    async getHeroSection() {
        return this.heroRepository.getSingleton();
    }
    async updateHeroSection(dto) {
        const hero = await this.heroRepository.getSingleton();
        Object.assign(hero, dto);
        return hero.save();
    }
    async getRewardsSection() {
        return this.rewardsRepository.getSingleton();
    }
    async updateRewardsSection(dto) {
        const rewards = await this.rewardsRepository.getSingleton();
        Object.assign(rewards, dto);
        return rewards.save();
    }
    async getAllPrizes() {
        return this.prizeRepository.findAllSorted();
    }
    async createPrize(dto) {
        return this.prizeRepository.create({
            ...dto,
            rewardsSectionId: rewards_section_repository_2.REWARDS_SINGLETON_ID,
        });
    }
    async updatePrize(id, dto) {
        const updated = await this.prizeRepository.updateById(id, dto);
        if (!updated) {
            throw new common_1.NotFoundException(`Prize item with ID "${id}" not found`);
        }
        return updated;
    }
    async deletePrize(id) {
        const result = await this.prizeRepository.deleteById(id);
        if (!result) {
            throw new common_1.NotFoundException(`Prize item with ID "${id}" not found`);
        }
    }
    async getLegacySection() {
        return this.legacyRepository.getSingleton();
    }
    async updateLegacySection(dto) {
        const legacy = await this.legacyRepository.getSingleton();
        Object.assign(legacy, dto);
        return legacy.save();
    }
};
exports.HomePageService = HomePageService;
exports.HomePageService = HomePageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hero_section_repository_1.HeroSectionRepository,
        rewards_section_repository_1.RewardsSectionRepository,
        prize_repository_1.PrizeRepository,
        legacy_section_repository_1.LegacySectionRepository])
], HomePageService);
//# sourceMappingURL=home-page.service.js.map
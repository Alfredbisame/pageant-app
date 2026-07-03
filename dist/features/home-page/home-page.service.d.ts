import { HeroSectionRepository } from "../../shared/repositories/hero-section.repository";
import { RewardsSectionRepository } from "../../shared/repositories/rewards-section.repository";
import { PrizeRepository } from "../../shared/repositories/prize.repository";
import { LegacySectionRepository } from "../../shared/repositories/legacy-section.repository";
import { UpdateHeroDto } from './dto/update-hero.dto';
import { UpdateRewardsDto } from './dto/update-rewards.dto';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';
import { UpdateLegacyDto } from './dto/update-legacy.dto';
export declare class HomePageService {
    private readonly heroRepository;
    private readonly rewardsRepository;
    private readonly prizeRepository;
    private readonly legacyRepository;
    constructor(heroRepository: HeroSectionRepository, rewardsRepository: RewardsSectionRepository, prizeRepository: PrizeRepository, legacyRepository: LegacySectionRepository);
    getCombinedPublicData(): Promise<{
        hero: {
            titleMain: string;
            titleHighlight: string;
            description: string;
        };
        rewards: {
            subtitle: string;
            title: string;
            description: string;
            prizes: {
                id: string;
                icon: string;
                title: string;
                amount: string;
                subtitle: string;
                description: string;
                variant: import("../../database/schemas").PrizeVariant;
            }[];
        };
        legacy: {
            imageUrl: string;
            imageAlt: string;
            subtitle: string;
            title: string;
            description: string;
            linkUrl: string;
            linkLabel: string;
        };
    }>;
    getHeroSection(): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").HomePageHero, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").HomePageHero & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateHeroSection(dto: UpdateHeroDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").HomePageHero, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").HomePageHero & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getRewardsSection(): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").RewardsSection, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").RewardsSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateRewardsSection(dto: UpdateRewardsDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").RewardsSection, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").RewardsSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllPrizes(): Promise<(import("mongoose").Document<unknown, {}, import("../../database/schemas").Prize, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").Prize & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createPrize(dto: CreatePrizeDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").Prize, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").Prize & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updatePrize(id: string, dto: UpdatePrizeDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").Prize, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").Prize & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deletePrize(id: string): Promise<void>;
    getLegacySection(): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").LegacySection, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateLegacySection(dto: UpdateLegacyDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").LegacySection, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}

import { HomePageService } from './home-page.service';
import { UpdateHeroDto, UpdateRewardsDto, CreatePrizeDto, UpdatePrizeDto, UpdateLegacyDto } from './dto';
export declare class HomePageAdminController {
    private readonly homePageService;
    constructor(homePageService: HomePageService);
    getHero(): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").HomePageHero, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").HomePageHero & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateHero(dto: UpdateHeroDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").HomePageHero, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").HomePageHero & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getRewards(): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").RewardsSection, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").RewardsSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateRewards(dto: UpdateRewardsDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").RewardsSection, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").RewardsSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getPrizes(): Promise<(import("mongoose").Document<unknown, {}, import("../../database/schemas").Prize, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").Prize & {
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
    getLegacy(): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").LegacySection, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateLegacy(dto: UpdateLegacyDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").LegacySection, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}

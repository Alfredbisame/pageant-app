import { AboutPageService } from './about-page.service';
import { UpdateHeroDto, UpdateMissionVisionDto, UpdateImpactStatsDto, UpdateTimelineDto, UpdateTeamDto } from './dto';
export declare class AboutPageController {
    private readonly aboutPageService;
    constructor(aboutPageService: AboutPageService);
    get(): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").AboutPage, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateHero(dto: UpdateHeroDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").AboutPage, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateMissionVision(dto: UpdateMissionVisionDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").AboutPage, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateImpactStats(dto: UpdateImpactStatsDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").AboutPage, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateTimeline(dto: UpdateTimelineDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").AboutPage, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateTeam(dto: UpdateTeamDto): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").AboutPage, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}

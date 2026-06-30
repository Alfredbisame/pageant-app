import { AboutPageRepository } from "../../shared/repositories/about-page.repository";
import { UpdateHeroDto } from './dto/update-hero.dto';
import { UpdateMissionVisionDto } from './dto/update-mission-vision.dto';
import { UpdateImpactStatsDto } from './dto/update-impact-stats.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
export declare class AboutPageService {
    private readonly aboutPageRepository;
    constructor(aboutPageRepository: AboutPageRepository);
    getPublic(): Promise<{
        hero: {
            backgroundImage: string;
            badgeText: string;
            headline: string;
            subtitle: string;
        };
        missionVision: {
            icon: string;
            title: string;
            body: string;
        }[];
        impactStats: {
            value: string;
            label: string;
            description: string;
        }[];
        timeline: {
            heading: string;
            subtitle: string;
            items: {
                year: string;
                title: string;
                description: string;
                side: string;
                accent: string;
                sortOrder: number;
            }[];
        };
        team: {
            heading: string;
            subtitle: string;
            members: {
                name: string;
                role: string;
                image: string;
                sortOrder: number;
            }[];
        };
    }>;
    get(): Promise<import("mongoose").Document<unknown, {}, import("@/database/schemas/about-page.schema").AboutPage, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/about-page.schema").AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateHero(dto: UpdateHeroDto): Promise<import("mongoose").Document<unknown, {}, import("@/database/schemas/about-page.schema").AboutPage, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/about-page.schema").AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateMissionVision(dto: UpdateMissionVisionDto): Promise<import("mongoose").Document<unknown, {}, import("@/database/schemas/about-page.schema").AboutPage, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/about-page.schema").AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateImpactStats(dto: UpdateImpactStatsDto): Promise<import("mongoose").Document<unknown, {}, import("@/database/schemas/about-page.schema").AboutPage, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/about-page.schema").AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateTimeline(dto: UpdateTimelineDto): Promise<import("mongoose").Document<unknown, {}, import("@/database/schemas/about-page.schema").AboutPage, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/about-page.schema").AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateTeam(dto: UpdateTeamDto): Promise<import("mongoose").Document<unknown, {}, import("@/database/schemas/about-page.schema").AboutPage, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/about-page.schema").AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    private toPublicPayload;
}

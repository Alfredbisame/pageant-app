import { Model } from 'mongoose';
import { Contestant, ContestantDocument } from "../../database/schemas/contestant.schema";
import { BaseRepository } from './base.repository';
import { ContestantLevel } from "../../common/constants";
export interface ContestantListQuery {
    search?: string;
    level?: ContestantLevel;
    sort?: 'votes' | 'name' | 'entry';
    page?: number;
    limit?: number;
}
export declare class ContestantRepository extends BaseRepository<ContestantDocument> {
    constructor(model: Model<ContestantDocument>);
    findActiveList(query: ContestantListQuery): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Contestant, {}, import("mongoose").DefaultSchemaOptions> & Contestant & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Contestant, {}, import("mongoose").DefaultSchemaOptions> & Contestant & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
    }>;
    incrementVoteCount(id: string, votes: number): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Contestant, {}, import("mongoose").DefaultSchemaOptions> & Contestant & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Contestant, {}, import("mongoose").DefaultSchemaOptions> & Contestant & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findLeaderboard(limit: number, offset?: number): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Contestant, {}, import("mongoose").DefaultSchemaOptions> & Contestant & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Contestant, {}, import("mongoose").DefaultSchemaOptions> & Contestant & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}

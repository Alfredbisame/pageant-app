import { Model } from 'mongoose';
import { VotePackage, VotePackageDocument } from "../../database/schemas/vote-package.schema";
import { BaseRepository } from './base.repository';
export declare class VotePackageRepository extends BaseRepository<VotePackageDocument> {
    constructor(model: Model<VotePackageDocument>);
    findActive(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, VotePackage, {}, import("mongoose").DefaultSchemaOptions> & VotePackage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, VotePackage, {}, import("mongoose").DefaultSchemaOptions> & VotePackage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    resolvePricePerVotePaise(fallback: number): Promise<number>;
}

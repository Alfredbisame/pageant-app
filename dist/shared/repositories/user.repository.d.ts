import { Model } from 'mongoose';
import { UserDocument } from "../../database/schemas/user.schema";
import { BaseRepository } from './base.repository';
export declare class UserRepository extends BaseRepository<UserDocument> {
    constructor(model: Model<UserDocument>);
    findByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("@/database/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("@/database/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findPaginated(page: number, limit: number): Promise<[(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("@/database/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("@/database/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], number]>;
}

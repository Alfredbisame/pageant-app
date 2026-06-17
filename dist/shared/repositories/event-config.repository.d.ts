import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { EventConfig, EventConfigDocument } from "../../database/schemas/event-config.schema";
import { BaseRepository } from './base.repository';
export declare class EventConfigRepository extends BaseRepository<EventConfigDocument> {
    private readonly configService;
    constructor(model: Model<EventConfigDocument>, configService: ConfigService);
    getSingleton(): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, EventConfig, {}, import("mongoose").DefaultSchemaOptions> & EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, EventConfig, {}, import("mongoose").DefaultSchemaOptions> & EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}

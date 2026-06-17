import { EventConfigRepository } from "../../shared/repositories/event-config.repository";
import { PublicEventConfigDto, UpdateEventConfigDto } from './dto/event-config.dto';
export declare class EventConfigService {
    private readonly eventConfigRepository;
    constructor(eventConfigRepository: EventConfigRepository);
    get(): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("@/database/schemas/event-config.schema").EventConfig, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/event-config.schema").EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("@/database/schemas/event-config.schema").EventConfig, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/event-config.schema").EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getPublic(): Promise<PublicEventConfigDto>;
    update(dto: UpdateEventConfigDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("@/database/schemas/event-config.schema").EventConfig, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/event-config.schema").EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("@/database/schemas/event-config.schema").EventConfig, {}, import("mongoose").DefaultSchemaOptions> & import("@/database/schemas/event-config.schema").EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    private toPublic;
}

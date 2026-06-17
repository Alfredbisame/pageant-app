import { EventConfigService } from './event-config.service';
import { UpdateEventConfigDto } from './dto/event-config.dto';
export declare class EventConfigController {
    private readonly eventConfigService;
    constructor(eventConfigService: EventConfigService);
    get(): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas").EventConfig, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../database/schemas").EventConfig, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(dto: UpdateEventConfigDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../database/schemas").EventConfig, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../database/schemas").EventConfig, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}

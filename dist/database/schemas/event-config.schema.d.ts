import { HydratedDocument } from 'mongoose';
export type EventConfigDocument = HydratedDocument<EventConfig>;
export declare class EventConfig {
    eventName: string;
    votingEnabled: boolean;
    votingStartsAt?: Date;
    votingEndsAt?: Date;
    platformFeeRate: number;
    dailyVoteLimitPerVoter?: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const EventConfigSchema: import("mongoose").Schema<EventConfig, import("mongoose").Model<EventConfig, any, any, any, any, any, EventConfig>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventConfig, import("mongoose").Document<unknown, {}, EventConfig, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<EventConfig & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    eventName?: import("mongoose").SchemaDefinitionProperty<string, EventConfig, import("mongoose").Document<unknown, {}, EventConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    votingEnabled?: import("mongoose").SchemaDefinitionProperty<boolean, EventConfig, import("mongoose").Document<unknown, {}, EventConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    votingStartsAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, EventConfig, import("mongoose").Document<unknown, {}, EventConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    votingEndsAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, EventConfig, import("mongoose").Document<unknown, {}, EventConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    platformFeeRate?: import("mongoose").SchemaDefinitionProperty<number, EventConfig, import("mongoose").Document<unknown, {}, EventConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    dailyVoteLimitPerVoter?: import("mongoose").SchemaDefinitionProperty<number | undefined, EventConfig, import("mongoose").Document<unknown, {}, EventConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, EventConfig, import("mongoose").Document<unknown, {}, EventConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, EventConfig, import("mongoose").Document<unknown, {}, EventConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, EventConfig>;

import { HydratedDocument } from 'mongoose';
export type RewardsSectionDocument = HydratedDocument<RewardsSection>;
export declare class RewardsSection {
    subtitle: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const RewardsSectionSchema: import("mongoose").Schema<RewardsSection, import("mongoose").Model<RewardsSection, any, any, any, any, any, RewardsSection>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RewardsSection, import("mongoose").Document<unknown, {}, RewardsSection, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<RewardsSection & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    subtitle?: import("mongoose").SchemaDefinitionProperty<string, RewardsSection, import("mongoose").Document<unknown, {}, RewardsSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RewardsSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, RewardsSection, import("mongoose").Document<unknown, {}, RewardsSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RewardsSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, RewardsSection, import("mongoose").Document<unknown, {}, RewardsSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RewardsSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, RewardsSection, import("mongoose").Document<unknown, {}, RewardsSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RewardsSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, RewardsSection, import("mongoose").Document<unknown, {}, RewardsSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RewardsSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, RewardsSection>;

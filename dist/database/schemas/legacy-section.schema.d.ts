import { HydratedDocument } from 'mongoose';
export type LegacySectionDocument = HydratedDocument<LegacySection>;
export declare class LegacySection {
    imageUrl: string;
    imageAlt: string;
    subtitle: string;
    title: string;
    description: string;
    linkUrl: string;
    linkLabel: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const LegacySectionSchema: import("mongoose").Schema<LegacySection, import("mongoose").Model<LegacySection, any, any, any, any, any, LegacySection>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LegacySection, import("mongoose").Document<unknown, {}, LegacySection, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<LegacySection & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string, LegacySection, import("mongoose").Document<unknown, {}, LegacySection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    imageAlt?: import("mongoose").SchemaDefinitionProperty<string, LegacySection, import("mongoose").Document<unknown, {}, LegacySection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    subtitle?: import("mongoose").SchemaDefinitionProperty<string, LegacySection, import("mongoose").Document<unknown, {}, LegacySection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, LegacySection, import("mongoose").Document<unknown, {}, LegacySection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, LegacySection, import("mongoose").Document<unknown, {}, LegacySection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    linkUrl?: import("mongoose").SchemaDefinitionProperty<string, LegacySection, import("mongoose").Document<unknown, {}, LegacySection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    linkLabel?: import("mongoose").SchemaDefinitionProperty<string, LegacySection, import("mongoose").Document<unknown, {}, LegacySection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, LegacySection, import("mongoose").Document<unknown, {}, LegacySection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, LegacySection, import("mongoose").Document<unknown, {}, LegacySection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LegacySection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, LegacySection>;

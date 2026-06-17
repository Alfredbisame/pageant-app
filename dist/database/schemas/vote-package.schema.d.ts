import { HydratedDocument } from 'mongoose';
export type VotePackageDocument = HydratedDocument<VotePackage>;
export declare class VotePackage {
    name: string;
    votes: number;
    baseAmount: number;
    currency: string;
    isPopular: boolean;
    isActive: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const VotePackageSchema: import("mongoose").Schema<VotePackage, import("mongoose").Model<VotePackage, any, any, any, any, any, VotePackage>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VotePackage, import("mongoose").Document<unknown, {}, VotePackage, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<VotePackage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, VotePackage, import("mongoose").Document<unknown, {}, VotePackage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VotePackage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    votes?: import("mongoose").SchemaDefinitionProperty<number, VotePackage, import("mongoose").Document<unknown, {}, VotePackage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VotePackage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    baseAmount?: import("mongoose").SchemaDefinitionProperty<number, VotePackage, import("mongoose").Document<unknown, {}, VotePackage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VotePackage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    currency?: import("mongoose").SchemaDefinitionProperty<string, VotePackage, import("mongoose").Document<unknown, {}, VotePackage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VotePackage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isPopular?: import("mongoose").SchemaDefinitionProperty<boolean, VotePackage, import("mongoose").Document<unknown, {}, VotePackage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VotePackage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, VotePackage, import("mongoose").Document<unknown, {}, VotePackage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VotePackage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sortOrder?: import("mongoose").SchemaDefinitionProperty<number, VotePackage, import("mongoose").Document<unknown, {}, VotePackage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VotePackage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, VotePackage, import("mongoose").Document<unknown, {}, VotePackage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VotePackage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, VotePackage, import("mongoose").Document<unknown, {}, VotePackage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VotePackage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, VotePackage>;

import { HydratedDocument, Types } from 'mongoose';
import { ContestantLevel } from "../../common/constants";
export type ContestantDocument = HydratedDocument<Contestant>;
export declare class Contestant {
    entryNumber: number;
    slug: string;
    displayName: string;
    bio?: string;
    level: ContestantLevel;
    avatarUrl: string;
    voteCount: number;
    isActive: boolean;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ContestantSchema: import("mongoose").Schema<Contestant, import("mongoose").Model<Contestant, any, any, any, any, any, Contestant>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Contestant, import("mongoose").Document<unknown, {}, Contestant, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Contestant & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    entryNumber?: import("mongoose").SchemaDefinitionProperty<number, Contestant, import("mongoose").Document<unknown, {}, Contestant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contestant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    slug?: import("mongoose").SchemaDefinitionProperty<string, Contestant, import("mongoose").Document<unknown, {}, Contestant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contestant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    displayName?: import("mongoose").SchemaDefinitionProperty<string, Contestant, import("mongoose").Document<unknown, {}, Contestant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contestant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    bio?: import("mongoose").SchemaDefinitionProperty<string | undefined, Contestant, import("mongoose").Document<unknown, {}, Contestant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contestant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    level?: import("mongoose").SchemaDefinitionProperty<ContestantLevel, Contestant, import("mongoose").Document<unknown, {}, Contestant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contestant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    avatarUrl?: import("mongoose").SchemaDefinitionProperty<string, Contestant, import("mongoose").Document<unknown, {}, Contestant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contestant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    voteCount?: import("mongoose").SchemaDefinitionProperty<number, Contestant, import("mongoose").Document<unknown, {}, Contestant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contestant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Contestant, import("mongoose").Document<unknown, {}, Contestant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contestant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Contestant, import("mongoose").Document<unknown, {}, Contestant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contestant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Contestant, import("mongoose").Document<unknown, {}, Contestant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contestant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Contestant, import("mongoose").Document<unknown, {}, Contestant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Contestant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Contestant>;
export type ContestantModel = Contestant & {
    _id: Types.ObjectId;
};

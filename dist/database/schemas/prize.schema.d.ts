import { HydratedDocument, Types } from 'mongoose';
export declare enum PrizeVariant {
    GOLD = "gold",
    GREEN = "green"
}
export type PrizeDocument = HydratedDocument<Prize>;
export declare class Prize {
    icon: string;
    title: string;
    amount: string;
    subtitle: string;
    description: string;
    variant: PrizeVariant;
    displayOrder: number;
    isActive: boolean;
    rewardsSectionId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PrizeSchema: import("mongoose").Schema<Prize, import("mongoose").Model<Prize, any, any, any, any, any, Prize>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Prize, import("mongoose").Document<unknown, {}, Prize, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Prize & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    icon?: import("mongoose").SchemaDefinitionProperty<string, Prize, import("mongoose").Document<unknown, {}, Prize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Prize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Prize, import("mongoose").Document<unknown, {}, Prize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Prize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    amount?: import("mongoose").SchemaDefinitionProperty<string, Prize, import("mongoose").Document<unknown, {}, Prize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Prize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    subtitle?: import("mongoose").SchemaDefinitionProperty<string, Prize, import("mongoose").Document<unknown, {}, Prize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Prize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Prize, import("mongoose").Document<unknown, {}, Prize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Prize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    variant?: import("mongoose").SchemaDefinitionProperty<PrizeVariant, Prize, import("mongoose").Document<unknown, {}, Prize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Prize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number, Prize, import("mongoose").Document<unknown, {}, Prize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Prize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Prize, import("mongoose").Document<unknown, {}, Prize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Prize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    rewardsSectionId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Prize, import("mongoose").Document<unknown, {}, Prize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Prize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Prize, import("mongoose").Document<unknown, {}, Prize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Prize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Prize, import("mongoose").Document<unknown, {}, Prize, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Prize & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Prize>;

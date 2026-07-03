import { HydratedDocument } from 'mongoose';
export type HomePageHeroDocument = HydratedDocument<HomePageHero>;
export declare class HomePageHero {
    titleMain: string;
    titleHighlight: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const HomePageHeroSchema: import("mongoose").Schema<HomePageHero, import("mongoose").Model<HomePageHero, any, any, any, any, any, HomePageHero>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HomePageHero, import("mongoose").Document<unknown, {}, HomePageHero, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<HomePageHero & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    titleMain?: import("mongoose").SchemaDefinitionProperty<string, HomePageHero, import("mongoose").Document<unknown, {}, HomePageHero, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HomePageHero & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    titleHighlight?: import("mongoose").SchemaDefinitionProperty<string, HomePageHero, import("mongoose").Document<unknown, {}, HomePageHero, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HomePageHero & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, HomePageHero, import("mongoose").Document<unknown, {}, HomePageHero, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HomePageHero & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, HomePageHero, import("mongoose").Document<unknown, {}, HomePageHero, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HomePageHero & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, HomePageHero, import("mongoose").Document<unknown, {}, HomePageHero, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HomePageHero & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, HomePageHero>;

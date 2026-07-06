import { HydratedDocument, Types } from 'mongoose';
import { VoteLedgerType } from "../../common/constants";
export type VoteLedgerDocument = HydratedDocument<VoteLedger>;
export declare class VoteLedger {
    paymentId?: Types.ObjectId;
    contestantId: Types.ObjectId;
    votes: number;
    type: VoteLedgerType;
    reason?: string;
    adjustedByUserId?: Types.ObjectId;
    providerReference?: string;
    createdAt: Date;
}
export declare const VoteLedgerSchema: import("mongoose").Schema<VoteLedger, import("mongoose").Model<VoteLedger, any, any, any, any, any, VoteLedger>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VoteLedger, import("mongoose").Document<unknown, {}, VoteLedger, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<VoteLedger & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    paymentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, VoteLedger, import("mongoose").Document<unknown, {}, VoteLedger, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VoteLedger & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    contestantId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, VoteLedger, import("mongoose").Document<unknown, {}, VoteLedger, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VoteLedger & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    votes?: import("mongoose").SchemaDefinitionProperty<number, VoteLedger, import("mongoose").Document<unknown, {}, VoteLedger, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VoteLedger & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<VoteLedgerType, VoteLedger, import("mongoose").Document<unknown, {}, VoteLedger, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VoteLedger & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reason?: import("mongoose").SchemaDefinitionProperty<string | undefined, VoteLedger, import("mongoose").Document<unknown, {}, VoteLedger, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VoteLedger & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    adjustedByUserId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, VoteLedger, import("mongoose").Document<unknown, {}, VoteLedger, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VoteLedger & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    providerReference?: import("mongoose").SchemaDefinitionProperty<string | undefined, VoteLedger, import("mongoose").Document<unknown, {}, VoteLedger, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VoteLedger & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, VoteLedger, import("mongoose").Document<unknown, {}, VoteLedger, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<VoteLedger & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, VoteLedger>;

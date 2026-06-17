import { Model } from 'mongoose';
import { Payment, PaymentDocument } from "../../database/schemas/payment.schema";
import { BaseRepository } from './base.repository';
export declare class PaymentRepository extends BaseRepository<PaymentDocument> {
    constructor(model: Model<PaymentDocument>);
    findByProviderReference(providerReference: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Payment, {}, import("mongoose").DefaultSchemaOptions> & Payment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Payment, {}, import("mongoose").DefaultSchemaOptions> & Payment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findByReference(reference: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Payment, {}, import("mongoose").DefaultSchemaOptions> & Payment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Payment, {}, import("mongoose").DefaultSchemaOptions> & Payment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findByUserId(userId: string, limit?: number): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Payment, {}, import("mongoose").DefaultSchemaOptions> & Payment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Payment, {}, import("mongoose").DefaultSchemaOptions> & Payment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    countDailyVotesByEmail(email: string, startOfDay: Date): import("mongoose").Query<number, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Payment, {}, import("mongoose").DefaultSchemaOptions> & Payment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Payment, {}, import("mongoose").DefaultSchemaOptions> & Payment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Payment, {}, import("mongoose").DefaultSchemaOptions> & Payment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "countDocuments", {}>;
}

import { Model, Types } from 'mongoose';
import { VoteLedgerType } from "../../common/constants";
import { VoteLedger, VoteLedgerDocument } from "../../database/schemas/vote-ledger.schema";
import { BaseRepository } from './base.repository';
export interface VoteLedgerListQuery {
    page?: number;
    limit?: number;
    contestantId?: string;
    type?: VoteLedgerType;
}
export declare class VoteLedgerRepository extends BaseRepository<VoteLedgerDocument> {
    constructor(model: Model<VoteLedgerDocument>);
    findByProviderReference(providerReference: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, VoteLedger, {}, import("mongoose").DefaultSchemaOptions> & VoteLedger & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, VoteLedger, {}, import("mongoose").DefaultSchemaOptions> & VoteLedger & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    findPaginated(query: VoteLedgerListQuery): Promise<[VoteLedgerDocument[], number]>;
}

import { Model } from 'mongoose';
import { VoteLedgerDocument } from "../../database/schemas/vote-ledger.schema";
import { BaseRepository } from './base.repository';
export declare class VoteLedgerRepository extends BaseRepository<VoteLedgerDocument> {
    constructor(model: Model<VoteLedgerDocument>);
}

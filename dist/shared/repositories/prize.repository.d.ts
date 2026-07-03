import { Model } from 'mongoose';
import { PrizeDocument } from "../../database/schemas/prize.schema";
import { BaseRepository } from './base.repository';
export declare class PrizeRepository extends BaseRepository<PrizeDocument> {
    constructor(model: Model<PrizeDocument>);
    findActiveSorted(): Promise<PrizeDocument[]>;
    findAllSorted(): Promise<PrizeDocument[]>;
}

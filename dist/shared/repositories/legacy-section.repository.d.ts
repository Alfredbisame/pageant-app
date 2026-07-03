import { Model, Types } from 'mongoose';
import { LegacySectionDocument } from "../../database/schemas/legacy-section.schema";
import { BaseRepository } from './base.repository';
export declare const LEGACY_SINGLETON_ID: Types.ObjectId;
export declare class LegacySectionRepository extends BaseRepository<LegacySectionDocument> {
    constructor(model: Model<LegacySectionDocument>);
    getSingleton(): Promise<LegacySectionDocument>;
}

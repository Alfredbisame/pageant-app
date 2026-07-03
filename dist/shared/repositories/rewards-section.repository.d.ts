import { Model, Types } from 'mongoose';
import { RewardsSectionDocument } from "../../database/schemas/rewards-section.schema";
import { BaseRepository } from './base.repository';
export declare const REWARDS_SINGLETON_ID: Types.ObjectId;
export declare class RewardsSectionRepository extends BaseRepository<RewardsSectionDocument> {
    constructor(model: Model<RewardsSectionDocument>);
    getSingleton(): Promise<RewardsSectionDocument>;
}

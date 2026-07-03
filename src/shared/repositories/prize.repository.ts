import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prize, PrizeDocument } from '@/database/schemas/prize.schema';
import { BaseRepository } from './base.repository';
import { REWARDS_SINGLETON_ID } from './rewards-section.repository';

@Injectable()
export class PrizeRepository extends BaseRepository<PrizeDocument> {
  constructor(@InjectModel(Prize.name) model: Model<PrizeDocument>) {
    super(model);
  }

  async findActiveSorted(): Promise<PrizeDocument[]> {
    return this.model
      .find({ rewardsSectionId: REWARDS_SINGLETON_ID, isActive: true })
      .sort({ displayOrder: 1 })
      .exec();
  }

  async findAllSorted(): Promise<PrizeDocument[]> {
    return this.model
      .find({ rewardsSectionId: REWARDS_SINGLETON_ID })
      .sort({ displayOrder: 1 })
      .exec();
  }
}

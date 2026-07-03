import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  RewardsSection,
  RewardsSectionDocument,
} from '@/database/schemas/rewards-section.schema';
import { BaseRepository } from './base.repository';

export const REWARDS_SINGLETON_ID = new Types.ObjectId(
  '60d5ec498c8f2a1b48b9487d',
);

@Injectable()
export class RewardsSectionRepository extends BaseRepository<RewardsSectionDocument> {
  constructor(
    @InjectModel(RewardsSection.name) model: Model<RewardsSectionDocument>,
  ) {
    super(model);
  }

  async getSingleton(): Promise<RewardsSectionDocument> {
    let config = await this.findById(REWARDS_SINGLETON_ID.toString());
    if (!config) {
      config = await this.create({
        _id: REWARDS_SINGLETON_ID,
        subtitle: 'Rewards',
        title: 'Grand Prizes',
        description:
          'Celebrating excellence with rewards that change lives and empower families.',
      });
    }
    return config;
  }
}

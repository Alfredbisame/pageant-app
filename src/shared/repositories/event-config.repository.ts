import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EventConfig,
  EventConfigDocument,
} from '@/database/schemas/event-config.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class EventConfigRepository extends BaseRepository<EventConfigDocument> {
  constructor(
    @InjectModel(EventConfig.name) model: Model<EventConfigDocument>,
  ) {
    super(model);
  }

  async getSingleton() {
    let config = await this.model.findOne().exec();
    if (!config) {
      config = await this.model.create({
        votingEnabled: false,
        platformFeeRate: 0.025,
      });
    }
    return config;
  }
}

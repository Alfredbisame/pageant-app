import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private readonly configService: ConfigService,
  ) {
    super(model);
  }

  async getSingleton() {
    let config = await this.model.findOne().exec();
    if (!config) {
      const votingEnabled = this.configService.get<boolean>(
        'event.defaults.votingEnabled',
        false,
      );
      const platformFeeRate = this.configService.get<number>(
        'event.defaults.platformFeeRate',
        0.025,
      );

      config = await this.model.create({
        votingEnabled,
        platformFeeRate,
      });
    }
    return config;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AboutPage,
  AboutPageDocument,
} from '@/database/schemas/about-page.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class AboutPageRepository extends BaseRepository<AboutPageDocument> {
  constructor(@InjectModel(AboutPage.name) model: Model<AboutPageDocument>) {
    super(model);
  }

  /** Returns the single about-page config document, creating it with defaults if none exists. */
  async getSingleton(): Promise<AboutPageDocument> {
    let config = await this.model.findOne().exec();
    if (!config) {
      config = await this.model.create({});
    }
    return config;
  }
}

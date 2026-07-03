import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  HomePageHero,
  HomePageHeroDocument,
} from '@/database/schemas/hero-section.schema';
import { BaseRepository } from './base.repository';

export const HERO_SINGLETON_ID = new Types.ObjectId('60d5ec498c8f2a1b48b9487c');

@Injectable()
export class HeroSectionRepository extends BaseRepository<HomePageHeroDocument> {
  constructor(
    @InjectModel(HomePageHero.name) model: Model<HomePageHeroDocument>,
  ) {
    super(model);
  }

  async getSingleton(): Promise<HomePageHeroDocument> {
    let config = await this.findById(HERO_SINGLETON_ID.toString());
    if (!config) {
      config = await this.create({
        _id: HERO_SINGLETON_ID,
        titleMain: 'Discover Your Confidence,',
        titleHighlight: 'Be The Face of ELL.',
        description:
          'Join us in celebrating a decade of achievement. Vote for the contestants who embody the spirit, confidence, and linguistic excellence of the English Language Learning community.',
      });
    }
    return config;
  }
}

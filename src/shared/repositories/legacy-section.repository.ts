import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  LegacySection,
  LegacySectionDocument,
} from '@/database/schemas/legacy-section.schema';
import { BaseRepository } from './base.repository';

export const LEGACY_SINGLETON_ID = new Types.ObjectId(
  '60d5ec498c8f2a1b48b9487e',
);

@Injectable()
export class LegacySectionRepository extends BaseRepository<LegacySectionDocument> {
  constructor(
    @InjectModel(LegacySection.name) model: Model<LegacySectionDocument>,
  ) {
    super(model);
  }

  async getSingleton(): Promise<LegacySectionDocument> {
    let config = await this.findById(LEGACY_SINGLETON_ID.toString());
    if (!config) {
      config = await this.create({
        _id: LEGACY_SINGLETON_ID,
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuApTfsG2irhid8vjCCKvda-nx71Qk89uj7jVtg2IOCtDMxb7lDe090WyX04CmW_7U41eDAI0DXAXQUpm4gaihiC8Q0kzrcoMqeOm8X0hdU03qTiTajR2Olzeg5C-2bJdCpdFUPa_5-Hs5W5mDv1lzG4ymWAvggRzb7_S2UpdmGfFOa5zu8Pu53VLaTfEkcQ8JJmyMfB2aDf3QMqb_5Y_jIqYf4iwvUOMnG3gCjzL9yydQGoN9y2D9-X9WYy_mljUZ3YpvNjL6ZSxKI',
        imageAlt: 'Diverse group of students celebrating',
        subtitle: 'Our Legacy',
        title: 'A Decade of Excellence',
        description:
          'For ten years, ELL has been more than just a language program; it has been a community of ambitious individuals striving for better futures. This pageant is a celebration of that journey, honoring those who have transformed their lives through dedication, hard work, and newfound confidence.',
        linkUrl: '/about',
        linkLabel: 'Read Our Story',
      });
    }
    return config;
  }
}

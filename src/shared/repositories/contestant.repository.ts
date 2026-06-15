import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Contestant,
  ContestantDocument,
} from '../../database/schemas/contestant.schema';
import { BaseRepository } from './base.repository';
import { getPagination } from '../../common/utils/pagination';
import { ContestantLevel } from '../../common/constants';

export interface ContestantListQuery {
  search?: string;
  level?: ContestantLevel;
  sort?: 'votes' | 'name' | 'entry';
  page?: number;
  limit?: number;
}

interface ContestantActiveFilter {
  isActive: boolean;
  level?: ContestantLevel;
  $text?: { $search: string };
}

@Injectable()
export class ContestantRepository extends BaseRepository<ContestantDocument> {
  constructor(@InjectModel(Contestant.name) model: Model<ContestantDocument>) {
    super(model);
  }

  async findActiveList(query: ContestantListQuery) {
    const { page, limit, skip } = getPagination(query);
    const filter: ContestantActiveFilter = { isActive: true };

    if (query.level) {
      filter.level = query.level;
    }

    if (query.search) {
      filter.$text = { $search: query.search };
    }

    const sortMap = {
      votes: { voteCount: -1 as const },
      name: { displayName: 1 as const },
      entry: { entryNumber: 1 as const },
    };
    const sort = sortMap[query.sort ?? 'votes'];

    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).exec(),
      this.model.countDocuments(filter).exec(),
    ]);

    return { data, total, page, limit };
  }

  incrementVoteCount(id: string, votes: number) {
    return this.model
      .findByIdAndUpdate(id, { $inc: { voteCount: votes } }, { new: true })
      .exec();
  }

  findLeaderboard(limit: number, offset = 0) {
    return this.model
      .find({ isActive: true })
      .sort({ voteCount: -1, entryNumber: 1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }
}

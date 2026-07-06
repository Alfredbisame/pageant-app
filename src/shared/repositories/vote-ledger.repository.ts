import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { VoteLedgerType } from '@/common/constants';
import {
  VoteLedger,
  VoteLedgerDocument,
} from '@/database/schemas/vote-ledger.schema';
import { BaseRepository } from './base.repository';
import { getPagination } from '@/common/utils/pagination';

export interface VoteLedgerListQuery {
  page?: number;
  limit?: number;
  contestantId?: string;
  type?: VoteLedgerType;
}

@Injectable()
export class VoteLedgerRepository extends BaseRepository<VoteLedgerDocument> {
  constructor(@InjectModel(VoteLedger.name) model: Model<VoteLedgerDocument>) {
    super(model);
  }

  findByProviderReference(providerReference: string) {
    return this.model.findOne({ providerReference }).exec();
  }

  async findPaginated(
    query: VoteLedgerListQuery,
  ): Promise<[VoteLedgerDocument[], number]> {
    const { limit, skip } = getPagination(query);
    const filter: Record<string, unknown> = {};

    if (query.contestantId) {
      filter.contestantId = new Types.ObjectId(query.contestantId);
    }
    if (query.type) {
      filter.type = query.type;
    }

    const [entries, total] = await Promise.all([
      this.model
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('contestantId', 'displayName entryNumber')
        .populate('paymentId', 'reference providerReference status totalAmount')
        .populate('adjustedByUserId', 'fullName email')
        .exec(),
      this.model.countDocuments(filter).exec(),
    ]);

    return [entries, total];
  }
}

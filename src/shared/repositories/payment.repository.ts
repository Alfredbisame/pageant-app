import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaymentProvider, PaymentStatus } from '@/common/constants';
import { Payment, PaymentDocument } from '@/database/schemas/payment.schema';
import { BaseRepository } from './base.repository';
import { getPagination } from '@/common/utils/pagination';

export interface PaymentListQuery {
  page?: number;
  limit?: number;
  contestantId?: string;
  status?: PaymentStatus;
  voterEmail?: string;
  provider?: PaymentProvider;
}

@Injectable()
export class PaymentRepository extends BaseRepository<PaymentDocument> {
  constructor(@InjectModel(Payment.name) model: Model<PaymentDocument>) {
    super(model);
  }

  findByProviderReference(providerReference: string) {
    return this.model.findOne({ providerReference }).exec();
  }

  findByReference(reference: string) {
    return this.model.findOne({ reference }).exec();
  }

  findByUserId(userId: string, limit = 20) {
    return this.model
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  countDailyVotesByEmail(email: string, startOfDay: Date) {
    return this.model.countDocuments({
      voterEmail: email.toLowerCase(),
      status: PaymentStatus.SUCCESS,
      createdAt: { $gte: startOfDay },
    });
  }

  findPaginated(query: PaymentListQuery) {
    const { page, limit, skip } = getPagination(query);
    const filter: Record<string, unknown> = {};

    if (query.contestantId) {
      filter.contestantId = new Types.ObjectId(query.contestantId);
    }
    if (query.status) {
      filter.status = query.status;
    }
    if (query.voterEmail) {
      filter.voterEmail = query.voterEmail.toLowerCase();
    }
    if (query.provider) {
      filter.provider = query.provider;
    }

    return Promise.all([
      this.model
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('contestantId', 'displayName entryNumber')
        .populate('packageId', 'name votes baseAmount')
        .exec(),
      this.model.countDocuments(filter).exec(),
    ]);
  }
}

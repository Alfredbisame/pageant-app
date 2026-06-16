import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentStatus } from '@/common/constants';
import { Payment, PaymentDocument } from '@/database/schemas/payment.schema';
import { BaseRepository } from './base.repository';

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
}

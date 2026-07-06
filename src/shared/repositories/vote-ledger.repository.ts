import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  VoteLedger,
  VoteLedgerDocument,
} from '@/database/schemas/vote-ledger.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class VoteLedgerRepository extends BaseRepository<VoteLedgerDocument> {
  constructor(@InjectModel(VoteLedger.name) model: Model<VoteLedgerDocument>) {
    super(model);
  }

  findByProviderReference(providerReference: string) {
    return this.model.findOne({ providerReference }).exec();
  }
}

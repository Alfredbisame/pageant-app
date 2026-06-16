import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  VotePackage,
  VotePackageDocument,
} from '@/database/schemas/vote-package.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class VotePackageRepository extends BaseRepository<VotePackageDocument> {
  constructor(
    @InjectModel(VotePackage.name) model: Model<VotePackageDocument>,
  ) {
    super(model);
  }

  findActive() {
    return this.model.find({ isActive: true }).sort({ sortOrder: 1 }).exec();
  }
}

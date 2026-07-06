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

  /**
   * Derives the per-vote price (pesewas) from active packages.
   * Uses the highest baseAmount/votes ratio so custom amounts do not
   * receive bulk-discount rates. Falls back when no packages exist.
   */
  async resolvePricePerVotePaise(fallback: number): Promise<number> {
    const packages = await this.findActive();
    if (!packages.length) return fallback;

    const maxRate = Math.max(
      ...packages.map((pkg) => pkg.baseAmount / pkg.votes),
    );
    return Math.ceil(maxRate);
  }
}

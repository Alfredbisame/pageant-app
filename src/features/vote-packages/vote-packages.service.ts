import { Injectable, NotFoundException } from '@nestjs/common';
import { VotePackageRepository } from '@/shared/repositories/vote-package.repository';
import {
  CreateVotePackageDto,
  UpdateVotePackageDto,
} from './dto/vote-packages.dto';

@Injectable()
export class VotePackagesService {
  constructor(private readonly votePackageRepository: VotePackageRepository) {}

  async findActive() {
    const packages = await this.votePackageRepository.findActive();
    return packages.map((pkg) => this.toPublic(pkg));
  }

  async create(dto: CreateVotePackageDto) {
    const pkg = await this.votePackageRepository.create({
      ...dto,
      currency: 'GHS',
      isActive: true,
    });
    return this.toPublic(pkg);
  }

  async update(id: string, dto: UpdateVotePackageDto) {
    const pkg = await this.votePackageRepository.updateById(id, dto);
    if (!pkg) throw new NotFoundException('Vote package not found');
    return this.toPublic(pkg);
  }

  async softDelete(id: string) {
    const pkg = await this.votePackageRepository.updateById(id, {
      isActive: false,
    });
    if (!pkg) throw new NotFoundException('Vote package not found');
    return { success: true };
  }

  private toPublic(pkg: {
    _id: { toString(): string };
    name: string;
    votes: number;
    baseAmount: number;
    currency: string;
    isPopular: boolean;
    sortOrder: number;
  }) {
    return {
      id: pkg._id.toString(),
      name: pkg.name,
      votes: pkg.votes,
      baseAmount: pkg.baseAmount,
      currency: pkg.currency,
      isPopular: pkg.isPopular,
      sortOrder: pkg.sortOrder,
    };
  }
}

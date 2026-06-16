import { Injectable, NotFoundException } from '@nestjs/common';
import { VotePackageRepository } from '@/shared/repositories/vote-package.repository';
import {
  CreateVotePackageDto,
  UpdateVotePackageDto,
} from './dto/vote-packages.dto';

@Injectable()
export class VotePackagesService {
  constructor(private readonly votePackageRepository: VotePackageRepository) {}

  findActive() {
    return this.votePackageRepository.findActive();
  }

  async create(dto: CreateVotePackageDto) {
    return this.votePackageRepository.create({
      ...dto,
      currency: 'GHS',
      isActive: true,
    });
  }

  async update(id: string, dto: UpdateVotePackageDto) {
    const pkg = await this.votePackageRepository.updateById(id, dto);
    if (!pkg) throw new NotFoundException('Vote package not found');
    return pkg;
  }

  async softDelete(id: string) {
    const pkg = await this.votePackageRepository.updateById(id, {
      isActive: false,
    });
    if (!pkg) throw new NotFoundException('Vote package not found');
    return { success: true };
  }
}

import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ContestantRepository } from '@/shared/repositories/contestant.repository';
import { STORAGE_SERVICE } from '@/shared/storage/storage.interface';
import type { StorageService } from '@/shared/storage/storage.interface';
import { slugify } from '@/common/utils/helpers';
import { buildPaginationMeta } from '@/common/utils/pagination';
import {
  ContestantQueryDto,
  CreateContestantDto,
  UpdateContestantDto,
} from './dto/contestants.dto';
import { AuthenticatedUser } from '@/common/types';
import { AuditService } from '@/features/audit/audit.service';

@Injectable()
export class ContestantsService {
  constructor(
    private readonly contestantRepository: ContestantRepository,
    @Inject(STORAGE_SERVICE) private readonly storage: StorageService,
    private readonly auditService: AuditService,
  ) {}

  async findAll(query: ContestantQueryDto) {
    const result = await this.contestantRepository.findActiveList(query);
    return {
      data: result.data.map((c) => this.toPublic(c)),
      meta: buildPaginationMeta(result.total, result.page, result.limit),
    };
  }

  async findOne(id: string) {
    const contestant = await this.contestantRepository.findById(id);
    if (!contestant || !contestant.isActive) {
      throw new NotFoundException('Contestant not found');
    }
    return this.toPublic(contestant);
  }

  async create(
    dto: CreateContestantDto,
    file: Express.Multer.File | undefined,
    user: AuthenticatedUser,
  ) {
    const slug = slugify(`${dto.displayName}-${dto.entryNumber}`);
    const existing = await this.contestantRepository.findOne({
      $or: [{ entryNumber: dto.entryNumber }, { slug }],
    });

    if (existing) {
      throw new ConflictException('Entry number or slug already exists');
    }

    const avatarUrl = await this.resolveAvatarUrl(dto, file);
    const contestant = await this.contestantRepository.create({
      displayName: dto.displayName,
      entryNumber: dto.entryNumber,
      level: dto.level,
      bio: dto.bio,
      slug,
      avatarUrl,
      voteCount: 0,
      isActive: true,
      createdBy: user.id,
    } as never);

    await this.auditService.log({
      actorId: user.id,
      action: 'contestant.created',
      entity: 'contestant',
      entityId: contestant._id.toString(),
      summary: { displayName: dto.displayName },
    });

    return this.toPublic(contestant);
  }

  async update(id: string, dto: UpdateContestantDto, user: AuthenticatedUser) {
    const contestant = await this.contestantRepository.updateById(id, dto);
    if (!contestant) throw new NotFoundException('Contestant not found');

    await this.auditService.log({
      actorId: user.id,
      action: 'contestant.updated',
      entity: 'contestant',
      entityId: id,
      summary: dto as Record<string, unknown>,
    });

    return this.toPublic(contestant);
  }

  async uploadAvatar(
    id: string,
    file: Express.Multer.File,
    user: AuthenticatedUser,
  ) {
    const uploaded = await this.storage.upload(file, 'contestants');
    const contestant = await this.contestantRepository.updateById(id, {
      avatarUrl: uploaded.secureUrl,
    });
    if (!contestant) throw new NotFoundException('Contestant not found');

    await this.auditService.log({
      actorId: user.id,
      action: 'contestant.avatar_updated',
      entity: 'contestant',
      entityId: id,
      summary: { avatarUrl: uploaded.secureUrl },
    });

    return this.toPublic(contestant);
  }

  async softDelete(id: string, user: AuthenticatedUser) {
    const contestant = await this.contestantRepository.updateById(id, {
      isActive: false,
    });
    if (!contestant) throw new NotFoundException('Contestant not found');

    await this.auditService.log({
      actorId: user.id,
      action: 'contestant.deleted',
      entity: 'contestant',
      entityId: id,
      summary: {},
    });

    return { success: true };
  }

  private async resolveAvatarUrl(
    dto: CreateContestantDto,
    file?: Express.Multer.File,
  ): Promise<string> {
    if (file?.buffer?.length) {
      const uploaded = await this.storage.upload(file, 'contestants');
      return uploaded.secureUrl;
    }

    const imageUrl = dto.imageUrl;
    if (imageUrl) {
      return imageUrl;
    }

    throw new BadRequestException(
      'An image file or imageUrl (avatar URL) is required',
    );
  }

  private toPublic(contestant: {
    _id: { toString(): string };
    displayName: string;
    entryNumber: number;
    level: string;
    bio?: string;
    avatarUrl: string;
    voteCount: number;
    slug: string;
  }) {
    return {
      id: contestant._id.toString(),
      name: contestant.displayName,
      displayName: contestant.displayName,
      entryNumber: contestant.entryNumber,
      level: contestant.level,
      bio: contestant.bio,
      image: contestant.avatarUrl,
      avatarUrl: contestant.avatarUrl,
      votes: contestant.voteCount,
      slug: contestant.slug,
    };
  }
}

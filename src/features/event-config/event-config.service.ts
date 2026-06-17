import { Injectable } from '@nestjs/common';
import { EventConfigRepository } from '@/shared/repositories/event-config.repository';
import {
  PublicEventConfigDto,
  UpdateEventConfigDto,
} from './dto/event-config.dto';
import type { EventConfigDocument } from '@/database/schemas/event-config.schema';

@Injectable()
export class EventConfigService {
  constructor(private readonly eventConfigRepository: EventConfigRepository) {}

  async get() {
    return this.eventConfigRepository.getSingleton();
  }

  async getPublic(): Promise<PublicEventConfigDto> {
    const config = await this.eventConfigRepository.getSingleton();
    return this.toPublic(config);
  }

  async update(dto: UpdateEventConfigDto) {
    const config = await this.eventConfigRepository.getSingleton();
    Object.assign(config, {
      ...dto,
      votingStartsAt: dto.votingStartsAt
        ? new Date(dto.votingStartsAt)
        : config.votingStartsAt,
      votingEndsAt: dto.votingEndsAt
        ? new Date(dto.votingEndsAt)
        : config.votingEndsAt,
    });
    await config.save();
    return config;
  }

  private toPublic(config: EventConfigDocument): PublicEventConfigDto {
    const now = new Date();
    const isVotingOpen =
      config.votingEnabled &&
      (!config.votingStartsAt || now >= config.votingStartsAt) &&
      (!config.votingEndsAt || now <= config.votingEndsAt);

    return {
      eventName: config.eventName ?? 'ELL Pageant 10th Anniversary',
      votingEnabled: config.votingEnabled,
      votingStartsAt: config.votingStartsAt?.toISOString(),
      votingEndsAt: config.votingEndsAt?.toISOString(),
      isVotingOpen,
    };
  }
}

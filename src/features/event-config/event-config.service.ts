import { Injectable } from '@nestjs/common';
import { EventConfigRepository } from '../../shared/repositories/event-config.repository';
import { UpdateEventConfigDto } from './dto/event-config.dto';

@Injectable()
export class EventConfigService {
  constructor(private readonly eventConfigRepository: EventConfigRepository) {}

  async get() {
    return this.eventConfigRepository.getSingleton();
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
}

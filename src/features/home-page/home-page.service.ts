import { Injectable, NotFoundException } from '@nestjs/common';
import { HeroSectionRepository } from '@/shared/repositories/hero-section.repository';
import { RewardsSectionRepository } from '@/shared/repositories/rewards-section.repository';
import { PrizeRepository } from '@/shared/repositories/prize.repository';
import { LegacySectionRepository } from '@/shared/repositories/legacy-section.repository';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { UpdateRewardsDto } from './dto/update-rewards.dto';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';
import { UpdateLegacyDto } from './dto/update-legacy.dto';
import { REWARDS_SINGLETON_ID } from '@/shared/repositories/rewards-section.repository';

@Injectable()
export class HomePageService {
  constructor(
    private readonly heroRepository: HeroSectionRepository,
    private readonly rewardsRepository: RewardsSectionRepository,
    private readonly prizeRepository: PrizeRepository,
    private readonly legacyRepository: LegacySectionRepository,
  ) {}

  async getCombinedPublicData() {
    const [hero, rewardsSection, legacy, activePrizes] = await Promise.all([
      this.heroRepository.getSingleton(),
      this.rewardsRepository.getSingleton(),
      this.legacyRepository.getSingleton(),
      this.prizeRepository.findActiveSorted(),
    ]);

    return {
      hero: {
        titleMain: hero.titleMain,
        titleHighlight: hero.titleHighlight,
        description: hero.description,
      },
      rewards: {
        subtitle: rewardsSection.subtitle,
        title: rewardsSection.title,
        description: rewardsSection.description,
        prizes: activePrizes.map((p) => ({
          id: p._id.toString(),
          icon: p.icon,
          title: p.title,
          amount: p.amount,
          subtitle: p.subtitle,
          description: p.description,
          variant: p.variant,
        })),
      },
      legacy: {
        imageUrl: legacy.imageUrl,
        imageAlt: legacy.imageAlt,
        subtitle: legacy.subtitle,
        title: legacy.title,
        description: legacy.description,
        linkUrl: legacy.linkUrl,
        linkLabel: legacy.linkLabel,
      },
    };
  }

  async getHeroSection() {
    return this.heroRepository.getSingleton();
  }

  async updateHeroSection(dto: UpdateHeroDto) {
    const hero = await this.heroRepository.getSingleton();
    Object.assign(hero, dto);
    return hero.save();
  }

  async getRewardsSection() {
    return this.rewardsRepository.getSingleton();
  }

  async updateRewardsSection(dto: UpdateRewardsDto) {
    const rewards = await this.rewardsRepository.getSingleton();
    Object.assign(rewards, dto);
    return rewards.save();
  }

  async getAllPrizes() {
    return this.prizeRepository.findAllSorted();
  }

  async createPrize(dto: CreatePrizeDto) {
    return this.prizeRepository.create({
      ...dto,
      rewardsSectionId: REWARDS_SINGLETON_ID,
    });
  }

  async updatePrize(id: string, dto: UpdatePrizeDto) {
    const updated = await this.prizeRepository.updateById(id, dto);
    if (!updated) {
      throw new NotFoundException(`Prize item with ID "${id}" not found`);
    }
    return updated;
  }

  async deletePrize(id: string) {
    const result = await this.prizeRepository.deleteById(id);
    if (!result) {
      throw new NotFoundException(`Prize item with ID "${id}" not found`);
    }
  }

  async getLegacySection() {
    return this.legacyRepository.getSingleton();
  }

  async updateLegacySection(dto: UpdateLegacyDto) {
    const legacy = await this.legacyRepository.getSingleton();
    Object.assign(legacy, dto);
    return legacy.save();
  }
}

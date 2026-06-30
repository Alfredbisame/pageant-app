import { Injectable } from '@nestjs/common';
import { AboutPageRepository } from '@/shared/repositories/about-page.repository';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { UpdateMissionVisionDto } from './dto/update-mission-vision.dto';
import { UpdateImpactStatsDto } from './dto/update-impact-stats.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import type { AboutPageDocument } from '@/database/schemas/about-page.schema';

@Injectable()
export class AboutPageService {
  constructor(private readonly aboutPageRepository: AboutPageRepository) {}

  /** Public-facing: returns the about page config (creates defaults if none exists). */
  async getPublic() {
    const config = await this.aboutPageRepository.getSingleton();
    return this.toPublicPayload(config);
  }

  /** Admin-facing: returns the raw document for editing. */
  async get() {
    return this.aboutPageRepository.getSingleton();
  }

  async updateHero(dto: UpdateHeroDto) {
    const config = await this.aboutPageRepository.getSingleton();
    Object.assign(config.hero, dto);
    await config.save();
    return config;
  }

  async updateMissionVision(dto: UpdateMissionVisionDto) {
    const config = await this.aboutPageRepository.getSingleton();
    config.missionVision = dto.items.map((item) => ({
      icon: item.icon,
      title: item.title,
      body: item.body,
    }));
    await config.save();
    return config;
  }

  async updateImpactStats(dto: UpdateImpactStatsDto) {
    const config = await this.aboutPageRepository.getSingleton();
    config.impactStats = dto.items.map((item) => ({
      value: item.value,
      label: item.label,
      description: item.description,
    }));
    await config.save();
    return config;
  }

  async updateTimeline(dto: UpdateTimelineDto) {
    const config = await this.aboutPageRepository.getSingleton();

    if (dto.heading !== undefined) config.timeline.heading = dto.heading;
    if (dto.subtitle !== undefined) config.timeline.subtitle = dto.subtitle;

    config.timeline.items = dto.items
      .map((item, index) => ({
        year: item.year,
        title: item.title,
        description: item.description,
        side: item.side,
        accent: item.accent,
        sortOrder: item.sortOrder ?? index,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    await config.save();
    return config;
  }

  async updateTeam(dto: UpdateTeamDto) {
    const config = await this.aboutPageRepository.getSingleton();

    if (dto.heading !== undefined) config.team.heading = dto.heading;
    if (dto.subtitle !== undefined) config.team.subtitle = dto.subtitle;

    config.team.members = dto.members
      .map((member, index) => ({
        name: member.name,
        role: member.role,
        image: member.image,
        sortOrder: member.sortOrder ?? index,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    await config.save();
    return config;
  }

  /** Shapes the document for the public API response. */
  private toPublicPayload(config: AboutPageDocument) {
    return {
      hero: {
        backgroundImage: config.hero.backgroundImage,
        badgeText: config.hero.badgeText,
        headline: config.hero.headline,
        subtitle: config.hero.subtitle,
      },
      missionVision: config.missionVision.map((item) => ({
        icon: item.icon,
        title: item.title,
        body: item.body,
      })),
      impactStats: config.impactStats.map((item) => ({
        value: item.value,
        label: item.label,
        description: item.description,
      })),
      timeline: {
        heading: config.timeline.heading,
        subtitle: config.timeline.subtitle,
        items: config.timeline.items.map((item) => ({
          year: item.year,
          title: item.title,
          description: item.description,
          side: item.side,
          accent: item.accent,
          sortOrder: item.sortOrder,
        })),
      },
      team: {
        heading: config.team.heading,
        subtitle: config.team.subtitle,
        members: config.team.members.map((member) => ({
          name: member.name,
          role: member.role,
          image: member.image,
          sortOrder: member.sortOrder,
        })),
      },
    };
  }
}

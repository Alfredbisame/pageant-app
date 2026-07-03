import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from "../shared/repositories/user.repository";
import { EventConfigRepository } from "../shared/repositories/event-config.repository";
import { AboutPageRepository } from "../shared/repositories/about-page.repository";
import { HeroSectionRepository } from "../shared/repositories/hero-section.repository";
import { RewardsSectionRepository } from "../shared/repositories/rewards-section.repository";
import { LegacySectionRepository } from "../shared/repositories/legacy-section.repository";
export declare class SeedService implements OnModuleInit {
    private readonly userRepository;
    private readonly eventConfigRepository;
    private readonly aboutPageRepository;
    private readonly heroSectionRepository;
    private readonly rewardsSectionRepository;
    private readonly legacySectionRepository;
    private readonly configService;
    private readonly logger;
    constructor(userRepository: UserRepository, eventConfigRepository: EventConfigRepository, aboutPageRepository: AboutPageRepository, heroSectionRepository: HeroSectionRepository, rewardsSectionRepository: RewardsSectionRepository, legacySectionRepository: LegacySectionRepository, configService: ConfigService);
    onModuleInit(): Promise<void>;
    private seedEventConfig;
    private seedAboutPage;
    private seedHomePage;
    private seedAdminUser;
}

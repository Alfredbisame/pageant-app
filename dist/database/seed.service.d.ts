import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from "../shared/repositories/user.repository";
import { EventConfigRepository } from "../shared/repositories/event-config.repository";
import { AboutPageRepository } from "../shared/repositories/about-page.repository";
export declare class SeedService implements OnModuleInit {
    private readonly userRepository;
    private readonly eventConfigRepository;
    private readonly aboutPageRepository;
    private readonly configService;
    private readonly logger;
    constructor(userRepository: UserRepository, eventConfigRepository: EventConfigRepository, aboutPageRepository: AboutPageRepository, configService: ConfigService);
    onModuleInit(): Promise<void>;
    private seedEventConfig;
    private seedAboutPage;
    private seedAdminUser;
}

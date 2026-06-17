import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from "../shared/repositories/user.repository";
import { EventConfigRepository } from "../shared/repositories/event-config.repository";
export declare class SeedService implements OnModuleInit {
    private readonly userRepository;
    private readonly eventConfigRepository;
    private readonly configService;
    private readonly logger;
    constructor(userRepository: UserRepository, eventConfigRepository: EventConfigRepository, configService: ConfigService);
    onModuleInit(): Promise<void>;
    private seedEventConfig;
    private seedAdminUser;
}

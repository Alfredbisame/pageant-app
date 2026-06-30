import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { UserRepository } from '@/shared/repositories/user.repository';
import { EventConfigRepository } from '@/shared/repositories/event-config.repository';
import { AboutPageRepository } from '@/shared/repositories/about-page.repository';
import { UserRole, UserStatus } from '@/common/constants';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventConfigRepository: EventConfigRepository,
    private readonly aboutPageRepository: AboutPageRepository,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.seedEventConfig();
    await this.seedAboutPage();
    await this.seedAdminUser();
  }

  private async seedEventConfig() {
    await this.eventConfigRepository.getSingleton();
    this.logger.log('Event config initialized');
  }

  private async seedAboutPage() {
    await this.aboutPageRepository.getSingleton();
    this.logger.log('About page config initialized');
  }

  private async seedAdminUser() {
    const email = this.configService.get<string>('seed.adminEmail');
    const password = this.configService.get<string>('seed.adminPassword');

    if (!email || !password) {
      this.logger.warn(
        'SEED_ADMIN_EMAIL/PASSWORD not set — skipping admin seed',
      );
      return;
    }

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      this.logger.log('Admin user already exists');
      return;
    }

    const passwordHash = await argon2.hash(password);
    await this.userRepository.create({
      fullName: this.configService.get<string>(
        'seed.adminName',
        'System Admin',
      ),
      email: email.toLowerCase(),
      passwordHash,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      refreshTokens: [],
    });

    this.logger.log(`Admin user seeded: ${email}`);
  }
}

import { DynamicModule, Module, Type } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContestantsModule } from './contestants/contestants.module';
import { VotePackagesModule } from './vote-packages/vote-packages.module';
import { VotingModule } from './voting/voting.module';
import { PaymentsModule } from './payments/payments.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { EventConfigModule } from './event-config/event-config.module';
import { AuditModule } from './audit/audit.module';
import { HealthModule } from './health/health.module';
import { FilesModule } from './files/files.module';
import { AboutPageModule } from './about-page/about-page.module';
import { HomePageModule } from './home-page/home-page.module';

const featureModules = [
  AuthModule,
  UsersModule,
  ContestantsModule,
  VotePackagesModule,
  PaymentsModule,
  VotingModule,
  LeaderboardModule,
  EventConfigModule,
  AuditModule,
  HealthModule,
  FilesModule,
  AboutPageModule,
  HomePageModule,
];

@Module({})
export class FeaturesModule {
  static register(): DynamicModule {
    return {
      module: FeaturesModule,
      imports: featureModules,
    };
  }

  /** Returns registered feature modules (use in tests/tooling) */
  static discover(): Type<unknown>[] {
    return featureModules;
  }
}

import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { UserRepository } from './user.repository';
import { ContestantRepository } from './contestant.repository';
import { VotePackageRepository } from './vote-package.repository';
import { PaymentRepository } from './payment.repository';
import { VoteLedgerRepository } from './vote-ledger.repository';
import { EventConfigRepository } from './event-config.repository';
import { AuditLogRepository } from './audit-log.repository';
import { AboutPageRepository } from './about-page.repository';
import { HeroSectionRepository } from './hero-section.repository';
import { RewardsSectionRepository } from './rewards-section.repository';
import { PrizeRepository } from './prize.repository';
import { LegacySectionRepository } from './legacy-section.repository';

const repositories = [
  UserRepository,
  ContestantRepository,
  VotePackageRepository,
  PaymentRepository,
  VoteLedgerRepository,
  EventConfigRepository,
  AuditLogRepository,
  AboutPageRepository,
  HeroSectionRepository,
  RewardsSectionRepository,
  PrizeRepository,
  LegacySectionRepository,
];

@Global()
@Module({
  imports: [DatabaseModule],
  providers: repositories,
  exports: repositories,
})
export class RepositoriesModule {}

export {
  UserRepository,
  ContestantRepository,
  VotePackageRepository,
  PaymentRepository,
  VoteLedgerRepository,
  EventConfigRepository,
  AuditLogRepository,
  AboutPageRepository,
  HeroSectionRepository,
  RewardsSectionRepository,
  PrizeRepository,
  LegacySectionRepository,
};

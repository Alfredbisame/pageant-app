import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserRepository } from './user.repository';
import { ContestantRepository } from './contestant.repository';
import { VotePackageRepository } from './vote-package.repository';
import { PaymentRepository } from './payment.repository';
import { VoteLedgerRepository } from './vote-ledger.repository';
import { EventConfigRepository } from './event-config.repository';
import { AuditLogRepository } from './audit-log.repository';

const repositories = [
  UserRepository,
  ContestantRepository,
  VotePackageRepository,
  PaymentRepository,
  VoteLedgerRepository,
  EventConfigRepository,
  AuditLogRepository,
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
};

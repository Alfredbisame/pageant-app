import { Module } from '@nestjs/common';
import { ContestantsController } from './contestants.controller';
import { AdminContestantsController } from './admin-contestants.controller';
import { ContestantsService } from './contestants.service';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [AuditModule],
  controllers: [ContestantsController, AdminContestantsController],
  providers: [ContestantsService],
  exports: [ContestantsService],
})
export class ContestantsModule {}

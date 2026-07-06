import { Module, forwardRef } from '@nestjs/common';
import { VotingController } from './voting.controller';
import { AdminVotingController } from './admin-voting.controller';
import { VotingService, QuoteService } from './voting.service';
import { PaymentsModule } from '@/features/payments/payments.module';
import { RealtimeModule } from '@/realtime/realtime.module';
import { LeaderboardModule } from '@/features/leaderboard/leaderboard.module';
import { AuditModule } from '@/features/audit/audit.module';

@Module({
  imports: [
    PaymentsModule,
    forwardRef(() => RealtimeModule),
    forwardRef(() => LeaderboardModule),
    AuditModule,
  ],
  controllers: [VotingController, AdminVotingController],
  providers: [VotingService, QuoteService],
  exports: [VotingService],
})
export class VotingModule {}

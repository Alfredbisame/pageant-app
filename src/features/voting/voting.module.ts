import { Module, forwardRef } from '@nestjs/common';
import { VotingController } from './voting.controller';
import { VotingService, QuoteService } from './voting.service';
import { PaymentsModule } from '../payments/payments.module';
import { RealtimeModule } from '../../realtime/realtime.module';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    PaymentsModule,
    forwardRef(() => RealtimeModule),
    forwardRef(() => LeaderboardModule),
    AuditModule,
  ],
  controllers: [VotingController],
  providers: [VotingService, QuoteService],
  exports: [VotingService],
})
export class VotingModule {}

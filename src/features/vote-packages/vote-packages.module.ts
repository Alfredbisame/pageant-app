import { Module } from '@nestjs/common';
import { VotePackagesController } from './vote-packages.controller';
import { AdminVotePackagesController } from './admin-vote-packages.controller';
import { VotePackagesService } from './vote-packages.service';

@Module({
  controllers: [VotePackagesController, AdminVotePackagesController],
  providers: [VotePackagesService],
  exports: [VotePackagesService],
})
export class VotePackagesModule {}

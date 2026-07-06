import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { VotingService } from './voting.service';
import { AdminCreditVotesDto } from './dto/voting.dto';
import { CurrentUser, Roles } from '@/common/decorators';
import { UserRole } from '@/common/constants';
import type { AuthenticatedUser } from '@/common/types';

@ApiTags('Admin - Voting')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@Controller('admin/voting')
export class AdminVotingController {
  constructor(private readonly votingService: VotingService) {}

  @Post('credit')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Votes manually credited to contestant' })
  @ApiOperation({
    summary:
      'Manually credit votes when payment succeeded but backend confirmation failed',
  })
  creditVotes(
    @Body() dto: AdminCreditVotesDto,
    @CurrentUser() admin: AuthenticatedUser,
  ) {
    return this.votingService.adminCreditVotes(dto, admin);
  }
}

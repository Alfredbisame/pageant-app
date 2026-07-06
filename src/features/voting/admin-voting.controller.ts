import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { VotingService } from './voting.service';
import {
  AdminCreditVotesDto,
  AdminTransactionQueryDto,
  AdminVoteHistoryQueryDto,
} from './dto/voting.dto';
import { CurrentUser, Roles } from '@/common/decorators';
import { UserRole } from '@/common/constants';
import type { AuthenticatedUser } from '@/common/types';

@ApiTags('Admin - Voting')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@Controller('admin/voting')
export class AdminVotingController {
  constructor(private readonly votingService: VotingService) {}

  @Get('transactions')
  @ApiOkResponse({ description: 'Paginated payment transaction history' })
  @ApiOperation({ summary: 'List all payment transactions' })
  listTransactions(@Query() query: AdminTransactionQueryDto) {
    return this.votingService.getAdminTransactions(query);
  }

  @Get('history')
  @ApiOkResponse({
    description: 'Paginated vote credit and adjustment history',
  })
  @ApiOperation({ summary: 'List all vote ledger entries' })
  listVoteHistory(@Query() query: AdminVoteHistoryQueryDto) {
    return this.votingService.getAdminVoteHistory(query);
  }

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

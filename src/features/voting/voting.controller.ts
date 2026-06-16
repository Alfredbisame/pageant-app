import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { VotingService } from './voting.service';
import { VotingConfirmDto, VotingQuoteDto } from './dto/voting.dto';
import { Public, CurrentUser } from '@/common/decorators';
import { OptionalJwtAuthGuard } from '@/common/guards/optional-jwt-auth.guard';
import type { AuthenticatedUser } from '@/common/types';

@ApiTags('Voting')
@Controller('voting')
export class VotingController {
  constructor(private readonly votingService: VotingService) {}

  @Public()
  @Post('quote')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Vote quote calculated' })
  @ApiOperation({ summary: 'Get server-validated vote quote with fees' })
  quote(@Body() dto: VotingQuoteDto) {
    return this.votingService.quote(dto);
  }

  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Payment verified and votes credited' })
  @ApiOperation({ summary: 'Verify payment and credit votes' })
  confirm(
    @Body() dto: VotingConfirmDto,
    @CurrentUser() user?: AuthenticatedUser,
  ) {
    return this.votingService.confirm(dto, user);
  }

  @Get('history')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get authenticated user vote purchase history' })
  history(@CurrentUser() user: AuthenticatedUser) {
    return this.votingService.getHistory(user.id);
  }

  @Public()
  @Get('transactions/:reference')
  @ApiOperation({ summary: 'Poll payment status by internal reference' })
  transactionStatus(@Param('reference') reference: string) {
    return this.votingService.getTransactionStatus(reference);
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LeaderboardService } from './leaderboard.service';
import { Public } from '@/common/decorators';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

class LeaderboardQueryDto {
  @ApiPropertyOptional({ default: 50 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({ default: 0 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;
}

@ApiTags('Leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get full leaderboard rankings' })
  getLeaderboard(@Query() query: LeaderboardQueryDto) {
    return this.leaderboardService.getLeaderboard(
      query.limit ?? 50,
      query.offset ?? 0,
    );
  }

  @Public()
  @Get('top')
  @ApiOperation({ summary: 'Get top N contestants' })
  getTop(@Query('count') count?: number) {
    return this.leaderboardService.getTop(Number(count) || 3);
  }

  @Public()
  @Get('summary')
  @ApiOperation({ summary: 'Get leaderboard summary stats' })
  getSummary() {
    return this.leaderboardService.getSummary();
  }
}

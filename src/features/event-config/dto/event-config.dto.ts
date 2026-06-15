import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateEventConfigDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  votingEnabled?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  votingStartsAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  votingEndsAt?: string;

  @ApiPropertyOptional({ example: 0.025 })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  platformFeeRate?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  dailyVoteLimitPerVoter?: number;
}

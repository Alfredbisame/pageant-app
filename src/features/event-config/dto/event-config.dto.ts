import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PublicEventConfigDto {
  @ApiProperty({ example: 'ELL Pageant 10th Anniversary' })
  eventName!: string;

  @ApiProperty()
  votingEnabled!: boolean;

  @ApiPropertyOptional()
  votingStartsAt?: string;

  @ApiPropertyOptional()
  votingEndsAt?: string;

  @ApiProperty({
    description:
      'Whether voting is currently open based on enabled flag and date window',
  })
  isVotingOpen!: boolean;
}

export class UpdateEventConfigDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  eventName?: string;

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

import {
  Allow,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContestantLevel } from '@/common/constants';
import { Type } from 'class-transformer';

export class CreateContestantDto {
  @ApiProperty({ example: 'Ama Serwaa' })
  @IsString()
  @MinLength(2)
  displayName!: string;

  @ApiProperty({ example: 12 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  entryNumber!: number;

  @ApiProperty({ enum: ContestantLevel })
  @IsEnum(ContestantLevel)
  level!: ContestantLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Contestant profile image (JPEG, PNG, WebP, or GIF)',
  })
  @Allow()
  image?: unknown;
}

export class UpdateContestantDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  displayName?: string;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  entryNumber?: number;

  @ApiPropertyOptional({ enum: ContestantLevel })
  @IsOptional()
  @IsEnum(ContestantLevel)
  level?: ContestantLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;
}

export class ContestantQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: ContestantLevel })
  @IsOptional()
  @IsEnum(ContestantLevel)
  level?: ContestantLevel;

  @ApiPropertyOptional({ enum: ['votes', 'name', 'entry'] })
  @IsOptional()
  @IsString()
  sort?: 'votes' | 'name' | 'entry';

  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 10 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}

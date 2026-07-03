import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsBoolean,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PrizeVariant } from '@/database/schemas/prize.schema';

export class UpdatePrizeDto {
  @ApiPropertyOptional({ example: 'account_balance_wallet' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  icon?: string;

  @ApiPropertyOptional({ example: 'Grand Cash Prize' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title?: string;

  @ApiPropertyOptional({ example: '$10,000' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  amount?: string;

  @ApiPropertyOptional({ example: 'USD' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  subtitle?: string;

  @ApiPropertyOptional({ example: 'First place cash reward.' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({ enum: PrizeVariant, example: PrizeVariant.GOLD })
  @IsOptional()
  @IsEnum(PrizeVariant)
  variant?: PrizeVariant;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

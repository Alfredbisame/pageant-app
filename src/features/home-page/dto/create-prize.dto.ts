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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PrizeVariant } from '@/database/schemas/prize.schema';

export class CreatePrizeDto {
  @ApiProperty({ example: 'account_balance_wallet' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  icon!: string;

  @ApiProperty({ example: 'Grand Cash Prize' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @ApiProperty({ example: '$10,000' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  amount!: string;

  @ApiProperty({ example: 'USD' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  subtitle!: string;

  @ApiProperty({ example: 'First place cash reward.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description!: string;

  @ApiProperty({ enum: PrizeVariant, example: PrizeVariant.GOLD })
  @IsEnum(PrizeVariant)
  variant!: PrizeVariant;

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

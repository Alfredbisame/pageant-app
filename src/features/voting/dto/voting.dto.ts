import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentProvider } from '../../../common/constants';
import { Type } from 'class-transformer';

export class VotingQuoteDto {
  @ApiProperty()
  @IsMongoId()
  contestantId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  packageId?: string;

  @ApiPropertyOptional({ description: 'Custom amount in pesewas' })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(100)
  customAmount?: number;
}

export class VotingConfirmDto {
  @ApiProperty({ enum: PaymentProvider })
  @IsEnum(PaymentProvider)
  provider!: PaymentProvider;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  providerReference!: string;

  @ApiProperty()
  @IsObject()
  providerPayload!: Record<string, unknown>;

  @ApiProperty()
  @IsMongoId()
  contestantId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  packageId?: string;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(100)
  customAmount?: number;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  voterName!: string;

  @ApiProperty()
  @IsEmail()
  voterEmail!: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  anonymous?: boolean;
}

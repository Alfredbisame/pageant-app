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
import { PaymentProvider } from '@/common/constants';
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
  @Min(1)
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

  @ApiPropertyOptional({ description: 'Custom amount in pesewas' })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
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

export class AdminCreditVotesDto {
  @ApiProperty()
  @IsMongoId()
  contestantId!: string;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  votes!: number;

  @ApiProperty({ example: 'Payment verified manually after webhook failure' })
  @IsString()
  @MinLength(5)
  reason!: string;

  @ApiPropertyOptional({
    description:
      'Provider reference to prevent double-crediting an already-settled payment',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  providerReference?: string;
}

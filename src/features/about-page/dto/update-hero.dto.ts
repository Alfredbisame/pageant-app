import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateHeroDto {
  @ApiPropertyOptional({ description: 'Background image URL' })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'backgroundImage must be a valid URL' })
  backgroundImage?: string;

  @ApiPropertyOptional({
    description: 'Badge text displayed on the hero section',
    example: '10th ANNIVERSARY',
  })
  @IsOptional()
  @IsString()
  badgeText?: string;

  @ApiPropertyOptional({
    description: 'Main headline',
    example: 'A Decade of Empowering Voices',
  })
  @IsOptional()
  @IsString()
  headline?: string;

  @ApiPropertyOptional({ description: 'Subtitle text below the headline' })
  @IsOptional()
  @IsString()
  subtitle?: string;
}

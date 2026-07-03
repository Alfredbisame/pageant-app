import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHeroDto {
  @ApiProperty({ example: 'Discover Your Confidence,' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titleMain!: string;

  @ApiProperty({ example: 'Be The Face of ELL.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titleHighlight!: string;

  @ApiProperty({ example: 'Join us in celebrating a decade of achievement...' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description!: string;
}

import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRewardsDto {
  @ApiProperty({ example: 'Rewards' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  subtitle!: string;

  @ApiProperty({ example: 'Grand Prizes' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title!: string;

  @ApiProperty({
    example: 'Celebrating excellence with rewards that change lives...',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description!: string;
}

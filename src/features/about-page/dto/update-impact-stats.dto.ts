import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ImpactStatItemDto {
  @ApiProperty({ example: '15,000+' })
  @IsString()
  value!: string;

  @ApiProperty({ example: 'Students Reached' })
  @IsString()
  label!: string;

  @ApiProperty({ example: 'Empowering learners across the globe' })
  @IsString()
  description!: string;
}

export class UpdateImpactStatsDto {
  @ApiProperty({
    description: 'Array of impact stat items (replaces existing)',
    type: [ImpactStatItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImpactStatItemDto)
  items!: ImpactStatItemDto[];
}

import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MissionVisionItemDto {
  @ApiProperty({ description: 'Material icon name', example: 'flag' })
  @IsString()
  icon!: string;

  @ApiProperty({ example: 'Our Mission' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'To provide a global platform...' })
  @IsString()
  body!: string;
}

export class UpdateMissionVisionDto {
  @ApiProperty({
    description: 'Exactly 2 mission & vision items',
    type: [MissionVisionItemDto],
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => MissionVisionItemDto)
  items!: MissionVisionItemDto[];
}

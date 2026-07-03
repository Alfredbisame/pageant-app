import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TimelineItemDto {
  @ApiProperty({ example: '2014' })
  @IsString()
  year!: string;

  @ApiProperty({ example: 'The Inaugural Spark' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'What began as a classroom initiative...' })
  @IsString()
  description!: string;

  @ApiProperty({ enum: ['left', 'right'], example: 'left' })
  @IsString()
  @IsIn(['left', 'right'])
  side!: string;

  @ApiProperty({
    enum: ['primary', 'secondary', 'anniversary'],
    example: 'primary',
  })
  @IsString()
  @IsIn(['primary', 'secondary', 'anniversary'])
  accent!: string;

  @ApiPropertyOptional({
    description: 'Sort order (lower = first)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class UpdateTimelineDto {
  @ApiPropertyOptional({
    description: 'Section heading',
    example: 'Our Journey',
  })
  @IsOptional()
  @IsString()
  heading?: string;

  @ApiPropertyOptional({ description: 'Section subtitle' })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty({
    description: 'Array of timeline items (replaces existing)',
    type: [TimelineItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimelineItemDto)
  items!: TimelineItemDto[];
}

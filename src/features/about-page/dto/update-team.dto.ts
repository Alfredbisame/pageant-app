import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TeamMemberDto {
  @ApiProperty({ example: 'Dr. Sarah Chen' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Executive Director' })
  @IsString()
  role!: string;

  @ApiProperty({ description: 'Profile image URL' })
  @IsString()
  @IsUrl({}, { message: 'image must be a valid URL' })
  image!: string;

  @ApiPropertyOptional({ description: 'Sort order (lower = first)', example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class UpdateTeamDto {
  @ApiPropertyOptional({
    description: 'Section heading',
    example: 'Meet the Organizers',
  })
  @IsOptional()
  @IsString()
  heading?: string;

  @ApiPropertyOptional({ description: 'Section subtitle' })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty({
    description: 'Array of team members (replaces existing)',
    type: [TeamMemberDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamMemberDto)
  members!: TeamMemberDto[];
}

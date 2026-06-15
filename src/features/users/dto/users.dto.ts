import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Jane Doe' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  fullName?: string;

  @ApiPropertyOptional({ example: 'jane@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class UpdateUserRoleDto {
  @ApiProperty({ enum: ['voter', 'staff', 'admin'] })
  @IsString()
  role!: string;
}

export class UpdateUserStatusDto {
  @ApiProperty({ enum: ['active', 'suspended', 'deleted'] })
  @IsString()
  status!: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadFileQueryDto {
  @ApiPropertyOptional({ example: 'contestants' })
  @IsOptional()
  @IsString()
  folder?: string;
}

export class DeleteFileDto {
  @ApiProperty({ example: 'ell-pageant/contestants/abc123' })
  @IsString()
  @IsNotEmpty()
  publicId!: string;
}

export class SignedUploadQueryDto {
  @ApiPropertyOptional({ example: 'contestants' })
  @IsOptional()
  @IsString()
  folder?: string;
}

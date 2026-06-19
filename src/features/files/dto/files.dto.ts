import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadFileQueryDto {
  @ApiPropertyOptional({ example: 'contestants' })
  @IsOptional()
  @IsString()
  folder?: string;
}

export class UploadFileBodyDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  @Allow()
  file?: unknown;
}

export class UploadImageBodyDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description:
      'Image file (JPEG, PNG, WebP, or GIF). Field name: file or image',
  })
  @Allow()
  file?: unknown;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Alias for file (same as contestant avatar uploads)',
  })
  @Allow()
  image?: unknown;
}

export class UploadMultipleBodyDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'Files to upload (max 10)',
  })
  @Allow()
  files?: unknown;
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

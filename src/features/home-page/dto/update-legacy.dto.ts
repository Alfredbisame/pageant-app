import { IsString, IsNotEmpty, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLegacyDto {
  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
  })
  @IsString()
  @IsUrl({}, { message: 'imageUrl must be a valid URL' })
  @MaxLength(1024)
  imageUrl!: string;

  @ApiProperty({ example: 'Diverse group of students celebrating' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  imageAlt!: string;

  @ApiProperty({ example: 'Our Legacy' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  subtitle!: string;

  @ApiProperty({ example: 'A Decade of Excellence' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title!: string;

  @ApiProperty({
    example: 'For ten years, ELL has been more than just a language program...',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description!: string;

  @ApiProperty({ example: '/about' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  linkUrl!: string;

  @ApiProperty({ example: 'Read Our Story' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  linkLabel!: string;
}

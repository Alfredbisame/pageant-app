import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '@/common/decorators';
import { UserRole } from '@/common/constants';
import {
  assertUploadedFile,
  createImageMulterOptions,
  createMulterOptions,
} from '@/shared/storage/multer.config';
import { FilesService } from './files.service';
import {
  DeleteFileDto,
  SignedUploadQueryDto,
  UploadFileQueryDto,
} from './dto/files.dto';

@ApiTags('Files')
@ApiBearerAuth()
@Roles(UserRole.ADMIN, UserRole.STAFF)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a single file to Cloudinary' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        folder: { type: 'string', example: 'contestants' },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(FileInterceptor('file', createMulterOptions()))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: UploadFileQueryDto,
  ) {
    assertUploadedFile(file);
    return this.filesService.upload(file, query.folder);
  }

  @Post('upload/image')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a single image to Cloudinary' })
  @UseInterceptors(FileInterceptor('file', createImageMulterOptions()))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: UploadFileQueryDto,
  ) {
    assertUploadedFile(file, 'image');
    return this.filesService.upload(file, query.folder);
  }

  @Post('upload/multiple')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload multiple files to Cloudinary' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
        folder: { type: 'string', example: 'contestants' },
      },
      required: ['files'],
    },
  })
  @UseInterceptors(FilesInterceptor('files', 10, createMulterOptions()))
  uploadMany(
    @UploadedFiles() files: Express.Multer.File[],
    @Query() query: UploadFileQueryDto,
  ) {
    if (!files?.length) {
      assertUploadedFile(undefined, 'files');
    }

    return this.filesService.uploadMany(files, query.folder);
  }

  @Get('upload-signature')
  @ApiOperation({
    summary: 'Get signed upload params for direct frontend Cloudinary uploads',
  })
  getUploadSignature(@Query() query: SignedUploadQueryDto) {
    return this.filesService.getSignedUploadParams(query.folder);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a file from Cloudinary by public ID' })
  delete(@Body() dto: DeleteFileDto) {
    return this.filesService.delete(dto.publicId);
  }
}

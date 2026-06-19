import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '@/common/decorators';
import { UserRole } from '@/common/constants';
import {
  assertUploadedFile,
  createImageMulterOptions,
  createMulterOptions,
  resolveUploadedFile,
} from '@/shared/storage/multer.config';
import { FilesService } from './files.service';
import {
  DeleteFileDto,
  SignedUploadQueryDto,
  UploadFileBodyDto,
  UploadFileQueryDto,
  UploadImageBodyDto,
  UploadMultipleBodyDto,
} from './dto/files.dto';

@ApiTags('Files')
@ApiBearerAuth()
@Roles(UserRole.ADMIN, UserRole.STAFF)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'File uploaded' })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a single file to Cloudinary' })
  @ApiQuery({ name: 'folder', required: false, example: 'contestants' })
  @ApiBody({ type: UploadFileBodyDto })
  @UseInterceptors(FileInterceptor('file', createMulterOptions()))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: UploadFileQueryDto,
  ) {
    assertUploadedFile(file);
    return this.filesService.upload(file, query.folder);
  }

  @Post('upload/image')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Image uploaded' })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a single image to Cloudinary' })
  @ApiQuery({ name: 'folder', required: false, example: 'contestants' })
  @ApiBody({ type: UploadImageBodyDto })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file', maxCount: 1 },
        { name: 'image', maxCount: 1 },
      ],
      createImageMulterOptions(),
    ),
  )
  uploadImage(
    @UploadedFiles()
    files: { file?: Express.Multer.File[]; image?: Express.Multer.File[] },
    @Query() query: UploadFileQueryDto,
  ) {
    const file = resolveUploadedFile(files?.file?.[0], files?.image?.[0]);
    assertUploadedFile(file, 'file');
    return this.filesService.upload(file, query.folder);
  }

  @Post('upload/multiple')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Files uploaded' })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload multiple files to Cloudinary' })
  @ApiQuery({ name: 'folder', required: false, example: 'contestants' })
  @ApiBody({ type: UploadMultipleBodyDto })
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
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'File deleted' })
  @ApiOperation({ summary: 'Delete a file from Cloudinary by public ID' })
  delete(@Body() dto: DeleteFileDto) {
    return this.filesService.delete(dto.publicId);
  }
}

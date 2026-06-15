import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { ContestantsService } from './contestants.service';
import {
  CreateContestantDto,
  UpdateContestantDto,
} from './dto/contestants.dto';
import { CurrentUser, Roles } from '../../common/decorators';
import { UserRole } from '../../common/constants';
import type { AuthenticatedUser } from '../../common/types';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';

const imageFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  cb(null, allowed.includes(file.mimetype));
};

@ApiTags('Admin - Contestants')
@ApiBearerAuth()
@Roles(UserRole.ADMIN, UserRole.STAFF)
@Controller('admin/contestants')
export class AdminContestantsController {
  constructor(private readonly contestantsService: ContestantsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create contestant with avatar upload' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: imageFilter,
    }),
  )
  create(
    @Body() dto: CreateContestantDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.contestantsService.create(dto, file, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update contestant fields' })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateContestantDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.contestantsService.update(id, dto, user);
  }

  @Post(':id/avatar')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Replace contestant avatar' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: imageFilter,
    }),
  )
  uploadAvatar(
    @Param('id', ParseObjectIdPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.contestantsService.uploadAvatar(id, file, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete contestant' })
  remove(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.contestantsService.softDelete(id, user);
  }
}

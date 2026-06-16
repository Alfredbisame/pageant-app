import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ContestantsService } from './contestants.service';
import { createImageMulterOptions } from '@/shared/storage/multer.config';
import {
  CreateContestantDto,
  UpdateContestantDto,
} from './dto/contestants.dto';
import { CurrentUser, Roles } from '@/common/decorators';
import { UserRole } from '@/common/constants';
import type { AuthenticatedUser } from '@/common/types';
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe';

@ApiTags('Admin - Contestants')
@ApiBearerAuth()
@Roles(UserRole.ADMIN, UserRole.STAFF)
@Controller('admin/contestants')
export class AdminContestantsController {
  constructor(private readonly contestantsService: ContestantsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Contestant created' })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create contestant with avatar upload' })
  @UseInterceptors(FileInterceptor('image', createImageMulterOptions()))
  create(
    @Body() dto: CreateContestantDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.contestantsService.create(dto, file, user);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Contestant updated' })
  @ApiOperation({ summary: 'Update contestant fields' })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateContestantDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.contestantsService.update(id, dto, user);
  }

  @Post(':id/avatar')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Contestant avatar updated' })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Replace contestant avatar' })
  @UseInterceptors(FileInterceptor('image', createImageMulterOptions()))
  uploadAvatar(
    @Param('id', ParseObjectIdPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.contestantsService.uploadAvatar(id, file, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Contestant soft-deleted' })
  @ApiOperation({ summary: 'Soft delete contestant' })
  remove(
    @Param('id', ParseObjectIdPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.contestantsService.softDelete(id, user);
  }
}

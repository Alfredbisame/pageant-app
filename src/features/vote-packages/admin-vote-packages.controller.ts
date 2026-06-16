import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VotePackagesService } from './vote-packages.service';
import {
  CreateVotePackageDto,
  UpdateVotePackageDto,
} from './dto/vote-packages.dto';
import { Roles } from '@/common/decorators';
import { UserRole } from '@/common/constants';
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe';

@ApiTags('Admin - Vote Packages')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@Controller('admin/vote-packages')
export class AdminVotePackagesController {
  constructor(private readonly votePackagesService: VotePackagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Vote package created' })
  @ApiOperation({ summary: 'Create vote package' })
  create(@Body() dto: CreateVotePackageDto) {
    return this.votePackagesService.create(dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Vote package updated' })
  @ApiOperation({ summary: 'Update vote package' })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateVotePackageDto,
  ) {
    return this.votePackagesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Vote package deactivated' })
  @ApiOperation({ summary: 'Deactivate vote package' })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.votePackagesService.softDelete(id);
  }
}

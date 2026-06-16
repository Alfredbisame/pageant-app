import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentUser, Roles } from '@/common/decorators';
import { UserRole } from '@/common/constants';
import type { AuthenticatedUser } from '@/common/types';
import {
  UpdateProfileDto,
  UpdateUserRoleDto,
  UpdateUserStatusDto,
} from './dto/users.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getMe(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.getProfile(user.id);
  }

  @Patch('me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Profile updated' })
  @ApiOperation({ summary: 'Update current user profile' })
  updateMe(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(user.id, dto);
  }

  @Delete('me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Account soft-deleted' })
  @ApiOperation({ summary: 'Soft delete current user account' })
  deleteMe(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.softDelete(user.id);
  }
}

@ApiTags('Admin - Users')
@ApiBearerAuth()
@Roles(UserRole.ADMIN, UserRole.STAFF)
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all users (admin)' })
  list(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.usersService.listUsers(Number(page) || 1, Number(limit) || 20);
  }

  @Patch(':id/role')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User role updated' })
  @ApiOperation({ summary: 'Update user role (admin)' })
  updateRole(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateRole(id, dto.role);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User status updated' })
  @ApiOperation({ summary: 'Update user status (admin)' })
  updateStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateUserStatusDto,
  ) {
    return this.usersService.updateStatus(id, dto.status);
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AdminLoginDto, AdminRegisterDto } from './dto/auth.dto';
import { CurrentUser, Public } from '@/common/decorators';
import { OptionalJwtAuthGuard } from '@/common/guards/optional-jwt-auth.guard';
import type { AuthenticatedUser } from '@/common/types';

@ApiTags('Auth - Admin')
@Controller('auth/admin')
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Admin or staff account created' })
  @ApiOperation({
    summary: 'Register an admin or staff account',
    description:
      'Open when no admin exists yet (bootstrap). After that, only authenticated admins can create accounts.',
  })
  register(
    @Body() dto: AdminRegisterDto,
    @CurrentUser() actor?: AuthenticatedUser,
  ) {
    return this.authService.registerAdmin(dto, actor);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Admin login successful' })
  @ApiOperation({
    summary: 'Admin or staff login',
    description: 'Only users with admin or staff roles can sign in here.',
  })
  login(@Body() dto: AdminLoginDto) {
    return this.authService.loginAdmin(dto);
  }
}

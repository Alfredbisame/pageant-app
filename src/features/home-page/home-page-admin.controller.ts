import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HomePageService } from './home-page.service';
import { Roles } from '@/common/decorators';
import { UserRole } from '@/common/constants';
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe';
import {
  UpdateHeroDto,
  UpdateRewardsDto,
  CreatePrizeDto,
  UpdatePrizeDto,
  UpdateLegacyDto,
} from './dto';

@ApiTags('Admin - Home Page')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@Controller('admin/home-page')
export class HomePageAdminController {
  constructor(private readonly homePageService: HomePageService) {}

  // Hero Section
  @Get('hero')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiOperation({ summary: 'Get hero section configuration for admin' })
  getHero() {
    return this.homePageService.getHeroSection();
  }

  @Put('hero')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Hero section updated' })
  @ApiOperation({ summary: 'Update hero section configuration' })
  updateHero(@Body() dto: UpdateHeroDto) {
    return this.homePageService.updateHeroSection(dto);
  }

  // Rewards Header
  @Get('rewards')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiOperation({ summary: 'Get rewards section configuration for admin' })
  getRewards() {
    return this.homePageService.getRewardsSection();
  }

  @Put('rewards')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Rewards section updated' })
  @ApiOperation({ summary: 'Update rewards section configuration' })
  updateRewards(@Body() dto: UpdateRewardsDto) {
    return this.homePageService.updateRewardsSection(dto);
  }

  // Prizes CRUD
  @Get('prizes')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiOperation({ summary: 'List all prizes' })
  getPrizes() {
    return this.homePageService.getAllPrizes();
  }

  @Post('prizes')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Prize created' })
  @ApiOperation({ summary: 'Create prize card' })
  createPrize(@Body() dto: CreatePrizeDto) {
    return this.homePageService.createPrize(dto);
  }

  @Put('prizes/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Prize updated' })
  @ApiOperation({ summary: 'Update prize card details' })
  updatePrize(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdatePrizeDto,
  ) {
    return this.homePageService.updatePrize(id, dto);
  }

  @Delete('prizes/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Prize deleted' })
  @ApiOperation({ summary: 'Delete prize card' })
  deletePrize(@Param('id', ParseObjectIdPipe) id: string) {
    return this.homePageService.deletePrize(id);
  }

  // Legacy Section
  @Get('legacy')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiOperation({ summary: 'Get legacy section configuration for admin' })
  getLegacy() {
    return this.homePageService.getLegacySection();
  }

  @Put('legacy')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Legacy section updated' })
  @ApiOperation({ summary: 'Update legacy section configuration' })
  updateLegacy(@Body() dto: UpdateLegacyDto) {
    return this.homePageService.updateLegacySection(dto);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AboutPageService } from './about-page.service';
import {
  UpdateHeroDto,
  UpdateMissionVisionDto,
  UpdateImpactStatsDto,
  UpdateTimelineDto,
  UpdateTeamDto,
} from './dto';
import { Roles } from '@/common/decorators';
import { UserRole } from '@/common/constants';

@ApiTags('Admin - About Page')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@Controller('admin/about-page')
export class AboutPageController {
  constructor(private readonly aboutPageService: AboutPageService) {}

  @Get()
  @ApiOperation({ summary: 'Get full about page config for admin' })
  get() {
    return this.aboutPageService.get();
  }

  @Patch('hero')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Hero section updated' })
  @ApiOperation({ summary: 'Update about page hero section' })
  updateHero(@Body() dto: UpdateHeroDto) {
    return this.aboutPageService.updateHero(dto);
  }

  @Patch('mission-vision')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Mission and Vision section updated' })
  @ApiOperation({ summary: 'Update about page mission and vision section' })
  updateMissionVision(@Body() dto: UpdateMissionVisionDto) {
    return this.aboutPageService.updateMissionVision(dto);
  }

  @Patch('impact-stats')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Impact stats updated' })
  @ApiOperation({ summary: 'Update about page impact stats' })
  updateImpactStats(@Body() dto: UpdateImpactStatsDto) {
    return this.aboutPageService.updateImpactStats(dto);
  }

  @Patch('timeline')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Timeline section updated' })
  @ApiOperation({ summary: 'Update about page timeline section' })
  updateTimeline(@Body() dto: UpdateTimelineDto) {
    return this.aboutPageService.updateTimeline(dto);
  }

  @Patch('team')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Team section updated' })
  @ApiOperation({ summary: 'Update about page team section' })
  updateTeam(@Body() dto: UpdateTeamDto) {
    return this.aboutPageService.updateTeam(dto);
  }
}

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
import { EventConfigService } from './event-config.service';
import { UpdateEventConfigDto } from './dto/event-config.dto';
import { Roles } from '@/common/decorators';
import { UserRole } from '@/common/constants';

@ApiTags('Admin - Event Config')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@Controller('admin/event-config')
export class EventConfigController {
  constructor(private readonly eventConfigService: EventConfigService) {}

  @Get()
  @ApiOperation({ summary: 'Get event configuration' })
  get() {
    return this.eventConfigService.get();
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Event configuration updated' })
  @ApiOperation({ summary: 'Update event configuration' })
  update(@Body() dto: UpdateEventConfigDto) {
    return this.eventConfigService.update(dto);
  }
}

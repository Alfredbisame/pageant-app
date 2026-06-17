import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorators';
import { EventConfigService } from './event-config.service';
import { PublicEventConfigDto } from './dto/event-config.dto';

@ApiTags('Event')
@Controller('event')
export class PublicEventController {
  constructor(private readonly eventConfigService: EventConfigService) {}

  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Get public event configuration for the voter UI' })
  @ApiOkResponse({ type: PublicEventConfigDto })
  getPublic(): Promise<PublicEventConfigDto> {
    return this.eventConfigService.getPublic();
  }
}

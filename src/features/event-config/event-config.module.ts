import { Module } from '@nestjs/common';
import { EventConfigController } from './event-config.controller';
import { PublicEventController } from './public-event.controller';
import { EventConfigService } from './event-config.service';

@Module({
  controllers: [EventConfigController, PublicEventController],
  providers: [EventConfigService],
  exports: [EventConfigService],
})
export class EventConfigModule {}

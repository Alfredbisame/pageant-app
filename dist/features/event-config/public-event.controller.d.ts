import { EventConfigService } from './event-config.service';
import { PublicEventConfigDto } from './dto/event-config.dto';
export declare class PublicEventController {
    private readonly eventConfigService;
    constructor(eventConfigService: EventConfigService);
    getPublic(): Promise<PublicEventConfigDto>;
}

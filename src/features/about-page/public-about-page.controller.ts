import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorators';
import { AboutPageService } from './about-page.service';

@ApiTags('About Page')
@Controller('about-page')
export class PublicAboutPageController {
  constructor(private readonly aboutPageService: AboutPageService) {}

  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Get public about page configuration' })
  getPublic() {
    return this.aboutPageService.getPublic();
  }
}

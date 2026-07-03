import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorators';
import { HomePageService } from './home-page.service';

@ApiTags('Home Page')
@Controller('home-page')
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}

  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Get public home page configuration' })
  getPublic() {
    return this.homePageService.getCombinedPublicData();
  }
}

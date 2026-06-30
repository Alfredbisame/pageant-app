import { Module } from '@nestjs/common';
import { AboutPageController } from './about-page.controller';
import { PublicAboutPageController } from './public-about-page.controller';
import { AboutPageService } from './about-page.service';

@Module({
  controllers: [AboutPageController, PublicAboutPageController],
  providers: [AboutPageService],
  exports: [AboutPageService],
})
export class AboutPageModule {}

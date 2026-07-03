import { Module } from '@nestjs/common';
import { HomePageController } from './home-page.controller';
import { HomePageAdminController } from './home-page-admin.controller';
import { HomePageService } from './home-page.service';

@Module({
  controllers: [HomePageController, HomePageAdminController],
  providers: [HomePageService],
  exports: [HomePageService],
})
export class HomePageModule {}

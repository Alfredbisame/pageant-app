import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';
import { RealtimeModule } from './realtime/realtime.module';
import { JwtAuthGuard, RolesGuard } from './common/guards';
import { SeedService } from './database/seed.service';
import { WinstonLoggerModule } from './common/logger/winston.config';

@Module({
  imports: [
    AppConfigModule,
    WinstonLoggerModule,
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('throttle.ttl', 60000),
          limit: config.get<number>('throttle.limit', 100),
        },
      ],
    }),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          rootPath: join(
            process.cwd(),
            config.get('storage.uploadDir', 'uploads'),
          ),
          serveRoot: '/uploads',
        },
      ],
    }),
    DatabaseModule,
    SharedModule,
    FeaturesModule.register(),
    RealtimeModule,
  ],
  providers: [
    SeedService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { LoggerService, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger.config';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
} from './common/filters/exception.filter';
import { CorsIoAdapter } from './bootstrap/cors-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const apiPrefix = configService.getOrThrow<string>('apiPrefix');
  const port = configService.getOrThrow<number>('port');
  const allowedOrigins = configService.getOrThrow<string[]>(
    'cors.allowedOrigins',
  );

  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.use(helmet());
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useWebSocketAdapter(new CorsIoAdapter(app, allowedOrigins));

  app.setGlobalPrefix(apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  setupSwagger(app, apiPrefix);

  await app.listen(port);
  logger.log(
    `ELL Pageant API listening on port ${port} (prefix: /${apiPrefix})`,
  );
  logger.log(`Swagger docs: /${apiPrefix}/docs`);
  logger.log(`CORS origins: ${allowedOrigins.join(', ')}`);
}

void bootstrap();

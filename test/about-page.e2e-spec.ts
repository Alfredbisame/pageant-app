import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';

describe('AboutPage (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/v1/about-page/public (GET) - returns public config with expected sections', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/about-page/public')
      .expect(200);

    const body = response.body;
    expect(body).toBeDefined();
    expect(body.code).toBe(200);
    expect(body.message).toBe('Success');
    expect(body.data).toBeDefined();
    expect(body.data.hero).toBeDefined();
    expect(body.data.missionVision).toBeInstanceOf(Array);
    expect(body.data.impactStats).toBeInstanceOf(Array);
    expect(body.data.timeline).toBeDefined();
    expect(body.data.timeline.items).toBeInstanceOf(Array);
    expect(body.data.team).toBeDefined();
    expect(body.data.team.members).toBeInstanceOf(Array);
  });

  it('/api/v1/admin/about-page (GET) - fails without admin authentication', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/admin/about-page')
      .expect(401);
  });
});

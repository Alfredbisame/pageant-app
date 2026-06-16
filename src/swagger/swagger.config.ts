import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication, apiPrefix: string) {
  const config = new DocumentBuilder()
    .setTitle('ELL Pageant API')
    .setDescription(
      'Backend API for the ELL Anniversary Pageant voting platform',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Users')
    .addTag('Contestants')
    .addTag('Vote Packages')
    .addTag('Voting')
    .addTag('Leaderboard')
    .addTag('Health')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      requestSnippetsEnabled: true,
    },
  });
}

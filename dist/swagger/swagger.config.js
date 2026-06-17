"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app, apiPrefix) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ELL Pageant API')
        .setDescription('Backend API for the ELL Anniversary Pageant voting platform')
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
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
//# sourceMappingURL=swagger.config.js.map
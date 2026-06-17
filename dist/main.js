"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
const swagger_config_1 = require("./swagger/swagger.config");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const exception_filter_1 = require("./common/filters/exception.filter");
const cors_io_adapter_1 = require("./bootstrap/cors-io.adapter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    const configService = app.get(config_1.ConfigService);
    const apiPrefix = configService.getOrThrow('apiPrefix');
    const port = configService.getOrThrow('port');
    const allowedOrigins = configService.getOrThrow('cors.allowedOrigins');
    const logger = app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(logger);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
    });
    app.useWebSocketAdapter(new cors_io_adapter_1.CorsIoAdapter(app, allowedOrigins));
    app.setGlobalPrefix(apiPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new exception_filter_1.AllExceptionsFilter(), new exception_filter_1.HttpExceptionFilter());
    (0, swagger_config_1.setupSwagger)(app, apiPrefix);
    await app.listen(port);
    const baseUrl = `http://localhost:${port}`;
    logger.log(`ELL Pageant API: ${baseUrl}/${apiPrefix}`);
    logger.log(`Swagger docs: ${baseUrl}/${apiPrefix}/docs`);
    logger.log(`CORS origins: ${allowedOrigins.join(', ')}`);
}
void bootstrap();
//# sourceMappingURL=main.js.map
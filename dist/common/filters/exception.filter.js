"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = this.resolveMessage(exception);
        response.status(status).json({
            success: false,
            code: status,
            message,
            timestamp: new Date().toISOString(),
        });
    }
    resolveMessage(exception) {
        if (exception instanceof common_1.HttpException) {
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                return {
                    message: exceptionResponse,
                    statusCode: exception.getStatus(),
                };
            }
            if (exceptionResponse && typeof exceptionResponse === 'object') {
                return exceptionResponse;
            }
            return {
                message: exception.message,
                statusCode: exception.getStatus(),
            };
        }
        return {
            message: 'Internal server error',
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        };
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
class HttpExceptionFilter extends AllExceptionsFilter {
}
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=exception.filter.js.map
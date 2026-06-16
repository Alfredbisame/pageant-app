import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.resolveMessage(exception);

    response.status(status).json({
      success: false,
      code: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  private resolveMessage(exception: unknown): unknown {
    if (exception instanceof HttpException) {
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
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}

export class HttpExceptionFilter extends AllExceptionsFilter {}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  {
    code: number;
    data: unknown;
    message: string;
    timestamp: string;
  }
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{
    code: number;
    data: unknown;
    message: string;
    timestamp: string;
  }> {
    return next.handle().pipe(
      map((payload) => {
        const response = context
          .switchToHttp()
          .getResponse<{ statusCode?: number }>();
        const code = response?.statusCode ?? 200;

        return {
          code,
          data: this.normalizePayload(payload),
          message: 'Success',
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }

  private normalizePayload(payload: unknown): unknown {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return payload;
    }

    const value = payload as {
      data?: unknown;
      meta?: {
        total?: number;
        totalPages?: number;
        page?: number;
        limit?: number;
      };
      results?: unknown;
      totalCount?: number;
      totalPages?: number;
      page?: number;
      pageSize?: number;
    };

    if (
      'data' in value &&
      'meta' in value &&
      Array.isArray(value.data) &&
      value.meta
    ) {
      return {
        results: value.data,
        totalCount: value.meta.total ?? 0,
        totalPages: value.meta.totalPages ?? 1,
        page: value.meta.page ?? 1,
        pageSize: value.meta.limit ?? value.data.length,
      };
    }

    return value;
  }
}

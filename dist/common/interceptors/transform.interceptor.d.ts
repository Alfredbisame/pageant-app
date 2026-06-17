import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class TransformInterceptor<T> implements NestInterceptor<T, {
    code: number;
    data: unknown;
    message: string;
    timestamp: string;
}> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<{
        code: number;
        data: unknown;
        message: string;
        timestamp: string;
    }>;
    private normalizePayload;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((payload) => {
            const response = context
                .switchToHttp()
                .getResponse();
            const code = response?.statusCode ?? 200;
            return {
                code,
                data: this.normalizePayload(payload),
                message: 'Success',
                timestamp: new Date().toISOString(),
            };
        }));
    }
    normalizePayload(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            return payload;
        }
        const value = payload;
        if ('data' in value &&
            'meta' in value &&
            Array.isArray(value.data) &&
            value.meta) {
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
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
//# sourceMappingURL=transform.interceptor.js.map
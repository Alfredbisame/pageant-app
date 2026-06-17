import { DynamicModule, Type } from '@nestjs/common';
export declare class FeaturesModule {
    static register(): DynamicModule;
    static discover(): Type<unknown>[];
}

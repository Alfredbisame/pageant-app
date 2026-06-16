import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudinaryStorageService } from './cloudinary-storage.service';
import { LocalStorageService } from './local-storage.service';
import { STORAGE_SERVICE } from './storage.interface';

@Global()
@Module({
  providers: [
    LocalStorageService,
    CloudinaryStorageService,
    {
      provide: STORAGE_SERVICE,
      inject: [ConfigService, LocalStorageService, CloudinaryStorageService],
      useFactory: (
        config: ConfigService,
        localStorage: LocalStorageService,
        cloudinaryStorage: CloudinaryStorageService,
      ) => {
        const driver = config.get<string>('storage.driver', 'local');
        return driver === 'cloudinary' ? cloudinaryStorage : localStorage;
      },
    },
  ],
  exports: [STORAGE_SERVICE, LocalStorageService, CloudinaryStorageService],
})
export class StorageModule {}

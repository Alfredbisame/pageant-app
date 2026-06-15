import { Global, Module } from '@nestjs/common';
import { RepositoriesModule } from './repositories/repositories.module';
import { StorageModule } from './storage/storage.module';

@Global()
@Module({
  imports: [RepositoriesModule, StorageModule],
  exports: [RepositoriesModule, StorageModule],
})
export class SharedModule {}

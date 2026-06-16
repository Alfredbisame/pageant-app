import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { STORAGE_SERVICE } from '@/shared/storage/storage.interface';
import type { StorageService } from '@/shared/storage/storage.interface';

@Injectable()
export class FilesService {
  constructor(
    @Inject(STORAGE_SERVICE) private readonly storage: StorageService,
  ) {}

  upload(file: Express.Multer.File, folder?: string) {
    return this.storage.upload(file, folder);
  }

  async uploadMany(files: Express.Multer.File[], folder?: string) {
    const uploads = await Promise.all(
      files.map((file) => this.storage.upload(file, folder)),
    );

    return { files: uploads };
  }

  async delete(publicId: string) {
    await this.storage.delete(publicId);
    return { success: true, publicId };
  }

  getSignedUploadParams(folder?: string) {
    if (!this.storage.getSignedUploadParams) {
      throw new BadRequestException(
        'Signed uploads are only available when Cloudinary is the active storage driver',
      );
    }

    return this.storage.getSignedUploadParams(folder);
  }
}

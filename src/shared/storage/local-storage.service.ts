import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { StorageService, UploadResult } from './storage.interface';

@Injectable()
export class LocalStorageService implements StorageService {
  private readonly uploadDir: string;

  constructor(private readonly configService: ConfigService) {
    this.uploadDir = this.configService.get<string>(
      'storage.uploadDir',
      'uploads',
    );
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async upload(
    file: Express.Multer.File,
    folder = 'contestants',
  ): Promise<UploadResult> {
    if (!file?.buffer?.length) {
      throw new BadRequestException('file is required');
    }

    const targetDir = join(this.uploadDir, folder);
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }

    const filename = `${uuidv4()}${extname(file.originalname)}`;
    const filepath = join(targetDir, filename);
    const { writeFile } = await import('fs/promises');
    await writeFile(filepath, file.buffer);

    const url = `/uploads/${folder}/${filename}`;

    return {
      url,
      secureUrl: url,
      publicId: `${folder}/${filename}`,
    };
  }

  async delete(publicIdOrUrl: string): Promise<void> {
    const { unlink } = await import('fs/promises');
    const { join } = await import('path');
    const relativePath = publicIdOrUrl.replace(/^\/uploads\//, '');
    const filepath = join(this.uploadDir, relativePath);
    await unlink(filepath);
  }
}

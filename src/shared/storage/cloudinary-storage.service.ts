import {
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import type { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  CloudinaryCredentials,
  extractPublicId,
  parseCloudinaryUrl,
  signCloudinaryParams,
} from './cloudinary.config';
import {
  SignedUploadParams,
  StorageService,
  UploadResult,
} from './storage.interface';

interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  url: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
}

@Injectable()
export class CloudinaryStorageService implements StorageService {
  private readonly credentials: CloudinaryCredentials;
  private readonly defaultFolder: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    const cloudinaryUrl = this.configService.getOrThrow<string>(
      'storage.cloudinaryUrl',
    );
    this.credentials = parseCloudinaryUrl(cloudinaryUrl);
    this.defaultFolder = this.configService.get<string>(
      'storage.cloudinaryFolder',
      'ell-pageant',
    );
  }

  async upload(
    file: Express.Multer.File,
    folder = this.defaultFolder,
  ): Promise<UploadResult> {
    if (!file?.buffer?.length) {
      throw new BadRequestException('file is required');
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const params: Record<string, string | number> = {
      folder,
      timestamp,
    };
    const signature = signCloudinaryParams(
      params,
      this.credentials.apiSecret,
    );

    const form = new FormData();
    form.append(
      'file',
      new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }),
      file.originalname,
    );
    form.append('api_key', this.credentials.apiKey);
    form.append('timestamp', String(timestamp));
    form.append('signature', signature);
    form.append('folder', folder);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${this.credentials.cloudName}/auto/upload`;
    const response = await fetch(uploadUrl, { method: 'POST', body: form });
    const body = (await response.json()) as CloudinaryUploadResponse & {
      error?: { message?: string };
    };

    if (!response.ok) {
      this.logger.error(
        `Cloudinary upload failed: ${body.error?.message ?? response.statusText}`,
      );
      throw new BadRequestException('File upload failed');
    }

    this.logger.log(`Uploaded file to Cloudinary: ${body.public_id}`);

    return {
      url: body.url,
      secureUrl: body.secure_url,
      publicId: body.public_id,
      format: body.format,
      bytes: body.bytes,
      width: body.width,
      height: body.height,
    };
  }

  async delete(publicIdOrUrl: string): Promise<void> {
    const publicId = extractPublicId(publicIdOrUrl);
    const timestamp = Math.floor(Date.now() / 1000);
    const params: Record<string, string | number> = {
      public_id: publicId,
      timestamp,
    };
    const signature = signCloudinaryParams(
      params,
      this.credentials.apiSecret,
    );

    const form = new FormData();
    form.append('public_id', publicId);
    form.append('api_key', this.credentials.apiKey);
    form.append('timestamp', String(timestamp));
    form.append('signature', signature);

    const destroyUrl = `https://api.cloudinary.com/v1_1/${this.credentials.cloudName}/image/destroy`;
    const response = await fetch(destroyUrl, { method: 'POST', body: form });
    const body = (await response.json()) as { result?: string; error?: { message?: string } };

    if (!response.ok || body.result !== 'ok') {
      this.logger.error(
        `Cloudinary delete failed for ${publicId}: ${body.error?.message ?? response.statusText}`,
      );
      throw new BadRequestException('File deletion failed');
    }

    this.logger.log(`Deleted Cloudinary asset: ${publicId}`);
  }

  async getSignedUploadParams(
    folder = this.defaultFolder,
  ): Promise<SignedUploadParams> {
    const timestamp = Math.floor(Date.now() / 1000);
    const params: Record<string, string | number> = {
      folder,
      timestamp,
    };
    const signature = signCloudinaryParams(
      params,
      this.credentials.apiSecret,
    );

    return {
      signature,
      timestamp,
      apiKey: this.credentials.apiKey,
      cloudName: this.credentials.cloudName,
      folder,
      uploadUrl: `https://api.cloudinary.com/v1_1/${this.credentials.cloudName}/auto/upload`,
    };
  }
}

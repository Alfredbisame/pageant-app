import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  CloudinaryCredentials,
  CloudinaryFolderMode,
  extractPublicId,
  resolveAssetFolder,
  resolveCloudinaryCredentials,
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
  private readonly folderMode: CloudinaryFolderMode;

  constructor(
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    const cloudinaryUrl = this.configService.get<string>(
      'storage.cloudinaryUrl',
    );
    this.credentials = resolveCloudinaryCredentials({
      cloudinaryUrl,
      cloudName: this.configService.get<string>('storage.cloudinaryCloudName'),
      apiKey: this.configService.get<string>('storage.cloudinaryApiKey'),
      apiSecret: this.configService.get<string>('storage.cloudinaryApiSecret'),
    });
    this.defaultFolder = this.configService.get<string>(
      'storage.cloudinaryFolder',
      'ell-pageant',
    );
    this.folderMode = this.configService.get<CloudinaryFolderMode>(
      'storage.cloudinaryFolderMode',
      'dynamic',
    );
  }

  async upload(
    file: Express.Multer.File,
    folder = this.defaultFolder,
  ): Promise<UploadResult> {
    if (!file?.buffer?.length) {
      throw new BadRequestException('file is required');
    }

    const { signedParams, formFields } = this.buildFolderUploadParams(folder);
    const signature = signCloudinaryParams(
      signedParams,
      this.credentials.apiSecret,
    );

    const form = new FormData();
    form.append(
      'file',
      new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }),
      file.originalname,
    );
    form.append('api_key', this.credentials.apiKey);
    form.append('signature', signature);
    for (const [key, value] of Object.entries(formFields)) {
      form.append(key, value);
    }

    const uploadUrl = `https://api.cloudinary.com/v1_1/${this.credentials.cloudName}/auto/upload`;
    const response = await fetch(uploadUrl, { method: 'POST', body: form });
    const body = (await response.json()) as CloudinaryUploadResponse & {
      error?: { message?: string };
    };

    if (!response.ok) {
      const cloudinaryMessage = body.error?.message ?? response.statusText;
      this.logger.error(`Cloudinary upload failed: ${cloudinaryMessage}`);
      throw new BadRequestException(this.mapUploadError(cloudinaryMessage));
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
    const signature = signCloudinaryParams(params, this.credentials.apiSecret);

    const form = new FormData();
    form.append('public_id', publicId);
    form.append('api_key', this.credentials.apiKey);
    form.append('timestamp', String(timestamp));
    form.append('signature', signature);

    const destroyUrl = `https://api.cloudinary.com/v1_1/${this.credentials.cloudName}/image/destroy`;
    const response = await fetch(destroyUrl, { method: 'POST', body: form });
    const body = (await response.json()) as {
      result?: string;
      error?: { message?: string };
    };

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
    const { signedParams } = this.buildFolderUploadParams(folder);
    const signature = signCloudinaryParams(
      signedParams,
      this.credentials.apiSecret,
    );

    return {
      signature,
      timestamp: signedParams.timestamp as number,
      apiKey: this.credentials.apiKey,
      cloudName: this.credentials.cloudName,
      folder: this.resolveTargetFolder(folder),
      uploadUrl: `https://api.cloudinary.com/v1_1/${this.credentials.cloudName}/auto/upload`,
    };
  }

  private resolveTargetFolder(folder?: string): string {
    if (this.folderMode === 'dynamic') {
      return resolveAssetFolder(this.defaultFolder, folder);
    }

    return folder ?? this.defaultFolder;
  }

  private buildFolderUploadParams(folder?: string): {
    signedParams: Record<string, string | number>;
    formFields: Record<string, string>;
  } {
    const timestamp = Math.floor(Date.now() / 1000);
    const targetFolder = this.resolveTargetFolder(folder);

    if (this.folderMode === 'dynamic') {
      const signedParams: Record<string, string | number> = {
        asset_folder: targetFolder,
        timestamp,
        use_asset_folder_as_public_id_prefix: 'true',
      };

      return {
        signedParams,
        formFields: {
          asset_folder: targetFolder,
          timestamp: String(timestamp),
          use_asset_folder_as_public_id_prefix: 'true',
        },
      };
    }

    const signedParams: Record<string, string | number> = {
      folder: targetFolder,
      timestamp,
    };

    return {
      signedParams,
      formFields: {
        folder: targetFolder,
        timestamp: String(timestamp),
      },
    };
  }

  private mapUploadError(message: string): string {
    if (message.includes('Invalid Signature')) {
      return 'Cloudinary credentials are invalid. Check CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.';
    }

    if (message.includes('Invalid api_key')) {
      return 'Cloudinary API key is invalid. Check CLOUDINARY_API_KEY in your environment.';
    }

    return `File upload failed: ${message}`;
  }
}

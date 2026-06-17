import type { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignedUploadParams, StorageService, UploadResult } from './storage.interface';
export declare class CloudinaryStorageService implements StorageService {
    private readonly configService;
    private readonly logger;
    private readonly credentials;
    private readonly defaultFolder;
    constructor(configService: ConfigService, logger: LoggerService);
    upload(file: Express.Multer.File, folder?: string): Promise<UploadResult>;
    delete(publicIdOrUrl: string): Promise<void>;
    getSignedUploadParams(folder?: string): Promise<SignedUploadParams>;
}

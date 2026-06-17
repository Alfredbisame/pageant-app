import { ConfigService } from '@nestjs/config';
import { StorageService, UploadResult } from './storage.interface';
export declare class LocalStorageService implements StorageService {
    private readonly configService;
    private readonly uploadDir;
    constructor(configService: ConfigService);
    upload(file: Express.Multer.File, folder?: string): Promise<UploadResult>;
    delete(publicIdOrUrl: string): Promise<void>;
}

import type { StorageService } from "../../shared/storage/storage.interface";
export declare class FilesService {
    private readonly storage;
    constructor(storage: StorageService);
    upload(file: Express.Multer.File, folder?: string): Promise<import("@/shared/storage/storage.interface").UploadResult>;
    uploadMany(files: Express.Multer.File[], folder?: string): Promise<{
        files: import("@/shared/storage/storage.interface").UploadResult[];
    }>;
    delete(publicId: string): Promise<{
        success: boolean;
        publicId: string;
    }>;
    getSignedUploadParams(folder?: string): Promise<import("@/shared/storage/storage.interface").SignedUploadParams>;
}

export interface UploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
}

export interface StorageService {
  upload(file: Express.Multer.File, folder?: string): Promise<UploadResult>;
  delete(publicIdOrUrl: string): Promise<void>;
  getSignedUploadParams?(folder?: string): Promise<SignedUploadParams>;
}

export interface SignedUploadParams {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
  uploadUrl: string;
}

export const STORAGE_SERVICE = Symbol('STORAGE_SERVICE');

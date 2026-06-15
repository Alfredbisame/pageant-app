export interface StorageService {
  upload(file: Express.Multer.File, folder?: string): Promise<string>;
  delete?(url: string): Promise<void>;
}

export const STORAGE_SERVICE = Symbol('STORAGE_SERVICE');

import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

const maxFileSizeMb = parseInt(process.env.MAX_FILE_SIZE_MB ?? '5', 10);

const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const FILE_MIME_TYPES = [
  ...IMAGE_MIME_TYPES,
  'video/mp4',
  'video/webm',
  'application/pdf',
];

export function createImageFileFilter() {
  return (
    _req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    cb(null, IMAGE_MIME_TYPES.includes(file.mimetype));
  };
}

export function createFileFilter() {
  return (
    _req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    cb(null, FILE_MIME_TYPES.includes(file.mimetype));
  };
}

export function createMulterOptions() {
  return {
    storage: memoryStorage(),
    limits: { fileSize: maxFileSizeMb * 1024 * 1024 },
    fileFilter: createFileFilter(),
  };
}

export function createImageMulterOptions() {
  return {
    storage: memoryStorage(),
    limits: { fileSize: maxFileSizeMb * 1024 * 1024 },
    fileFilter: createImageFileFilter(),
  };
}

export function assertUploadedFile(
  file: Express.Multer.File | undefined,
  label = 'file',
): asserts file is Express.Multer.File {
  if (!file) {
    throw new BadRequestException(`${label} is required`);
  }
}

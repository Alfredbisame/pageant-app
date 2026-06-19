import { BadRequestException, UnsupportedMediaTypeException } from '@nestjs/common';
import { memoryStorage } from 'multer';

const maxFileSizeMb = parseInt(process.env.MAX_FILE_SIZE_MB ?? '5', 10);

const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const FILE_MIME_TYPES = [
  ...IMAGE_MIME_TYPES,
  'video/mp4',
  'video/webm',
  'application/pdf',
];

function invalidTypeError(
  mimetype: string,
  allowed: string[],
): UnsupportedMediaTypeException {
  return new UnsupportedMediaTypeException(
    `Invalid file type "${mimetype}". Allowed: ${allowed.join(', ')}`,
  );
}

export function createImageFileFilter() {
  return (
    _req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!IMAGE_MIME_TYPES.includes(file.mimetype)) {
      return cb(invalidTypeError(file.mimetype, IMAGE_MIME_TYPES), false);
    }
    cb(null, true);
  };
}

export function createFileFilter() {
  return (
    _req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!FILE_MIME_TYPES.includes(file.mimetype)) {
      return cb(invalidTypeError(file.mimetype, FILE_MIME_TYPES), false);
    }
    cb(null, true);
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

export function resolveUploadedFile(
  ...candidates: (Express.Multer.File | undefined)[]
): Express.Multer.File | undefined {
  return candidates.find((file) => file?.buffer?.length);
}

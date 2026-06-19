"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImageFileFilter = createImageFileFilter;
exports.createFileFilter = createFileFilter;
exports.createMulterOptions = createMulterOptions;
exports.createImageMulterOptions = createImageMulterOptions;
exports.assertUploadedFile = assertUploadedFile;
exports.resolveUploadedFile = resolveUploadedFile;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const maxFileSizeMb = parseInt(process.env.MAX_FILE_SIZE_MB ?? '5', 10);
const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const FILE_MIME_TYPES = [
    ...IMAGE_MIME_TYPES,
    'video/mp4',
    'video/webm',
    'application/pdf',
];
function invalidTypeError(mimetype, allowed) {
    return new common_1.UnsupportedMediaTypeException(`Invalid file type "${mimetype}". Allowed: ${allowed.join(', ')}`);
}
function createImageFileFilter() {
    return (_req, file, cb) => {
        if (!IMAGE_MIME_TYPES.includes(file.mimetype)) {
            return cb(invalidTypeError(file.mimetype, IMAGE_MIME_TYPES), false);
        }
        cb(null, true);
    };
}
function createFileFilter() {
    return (_req, file, cb) => {
        if (!FILE_MIME_TYPES.includes(file.mimetype)) {
            return cb(invalidTypeError(file.mimetype, FILE_MIME_TYPES), false);
        }
        cb(null, true);
    };
}
function createMulterOptions() {
    return {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: maxFileSizeMb * 1024 * 1024 },
        fileFilter: createFileFilter(),
    };
}
function createImageMulterOptions() {
    return {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: maxFileSizeMb * 1024 * 1024 },
        fileFilter: createImageFileFilter(),
    };
}
function assertUploadedFile(file, label = 'file') {
    if (!file) {
        throw new common_1.BadRequestException(`${label} is required`);
    }
}
function resolveUploadedFile(...candidates) {
    return candidates.find((file) => file?.buffer?.length);
}
//# sourceMappingURL=multer.config.js.map
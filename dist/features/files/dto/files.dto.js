"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignedUploadQueryDto = exports.DeleteFileDto = exports.UploadMultipleBodyDto = exports.UploadImageBodyDto = exports.UploadFileBodyDto = exports.UploadFileQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
class UploadFileQueryDto {
    folder;
}
exports.UploadFileQueryDto = UploadFileQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'contestants' }),
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], UploadFileQueryDto.prototype, "folder", void 0);
class UploadFileBodyDto {
    file;
}
exports.UploadFileBodyDto = UploadFileBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'binary',
        description: 'File to upload',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Object)
], UploadFileBodyDto.prototype, "file", void 0);
class UploadImageBodyDto {
    file;
    image;
}
exports.UploadImageBodyDto = UploadImageBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'binary',
        description: 'Image file (JPEG, PNG, WebP, or GIF). Field name: file or image',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Object)
], UploadImageBodyDto.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        format: 'binary',
        description: 'Alias for file (same as contestant avatar uploads)',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Object)
], UploadImageBodyDto.prototype, "image", void 0);
class UploadMultipleBodyDto {
    files;
}
exports.UploadMultipleBodyDto = UploadMultipleBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        items: { type: 'string', format: 'binary' },
        description: 'Files to upload (max 10)',
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Object)
], UploadMultipleBodyDto.prototype, "files", void 0);
class DeleteFileDto {
    publicId;
}
exports.DeleteFileDto = DeleteFileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ell-pageant/contestants/abc123' }),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteFileDto.prototype, "publicId", void 0);
class SignedUploadQueryDto {
    folder;
}
exports.SignedUploadQueryDto = SignedUploadQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'contestants' }),
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], SignedUploadQueryDto.prototype, "folder", void 0);
//# sourceMappingURL=files.dto.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const constants_1 = require("../../common/constants");
const multer_config_1 = require("../../shared/storage/multer.config");
const files_service_1 = require("./files.service");
const files_dto_1 = require("./dto/files.dto");
let FilesController = class FilesController {
    filesService;
    constructor(filesService) {
        this.filesService = filesService;
    }
    uploadFile(file, query) {
        (0, multer_config_1.assertUploadedFile)(file);
        return this.filesService.upload(file, query.folder);
    }
    uploadImage(files, query) {
        const file = (0, multer_config_1.resolveUploadedFile)(files?.file?.[0], files?.image?.[0]);
        (0, multer_config_1.assertUploadedFile)(file, 'file');
        return this.filesService.upload(file, query.folder);
    }
    uploadMany(files, query) {
        if (!files?.length) {
            (0, multer_config_1.assertUploadedFile)(undefined, 'files');
        }
        return this.filesService.uploadMany(files, query.folder);
    }
    getUploadSignature(query) {
        return this.filesService.getSignedUploadParams(query.folder);
    }
    delete(dto) {
        return this.filesService.delete(dto.publicId);
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiCreatedResponse)({ description: 'File uploaded' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a single file to Cloudinary' }),
    (0, swagger_1.ApiQuery)({ name: 'folder', required: false, example: 'contestants' }),
    (0, swagger_1.ApiBody)({ type: files_dto_1.UploadFileBodyDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, multer_config_1.createMulterOptions)())),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, files_dto_1.UploadFileQueryDto]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('upload/image'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Image uploaded' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a single image to Cloudinary' }),
    (0, swagger_1.ApiQuery)({ name: 'folder', required: false, example: 'contestants' }),
    (0, swagger_1.ApiBody)({ type: files_dto_1.UploadImageBodyDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'file', maxCount: 1 },
        { name: 'image', maxCount: 1 },
    ], (0, multer_config_1.createImageMulterOptions)())),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, files_dto_1.UploadFileQueryDto]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('upload/multiple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Files uploaded' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload multiple files to Cloudinary' }),
    (0, swagger_1.ApiQuery)({ name: 'folder', required: false, example: 'contestants' }),
    (0, swagger_1.ApiBody)({ type: files_dto_1.UploadMultipleBodyDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, (0, multer_config_1.createMulterOptions)())),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, files_dto_1.UploadFileQueryDto]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadMany", null);
__decorate([
    (0, common_1.Get)('upload-signature'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get signed upload params for direct frontend Cloudinary uploads',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [files_dto_1.SignedUploadQueryDto]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "getUploadSignature", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'File deleted' }),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a file from Cloudinary by public ID' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [files_dto_1.DeleteFileDto]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "delete", null);
exports.FilesController = FilesController = __decorate([
    (0, swagger_1.ApiTags)('Files'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(constants_1.UserRole.ADMIN, constants_1.UserRole.STAFF),
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map
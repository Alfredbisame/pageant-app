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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const storage_interface_1 = require("../../shared/storage/storage.interface");
let FilesService = class FilesService {
    storage;
    constructor(storage) {
        this.storage = storage;
    }
    upload(file, folder) {
        return this.storage.upload(file, folder);
    }
    async uploadMany(files, folder) {
        const uploads = await Promise.all(files.map((file) => this.storage.upload(file, folder)));
        return { files: uploads };
    }
    async delete(publicId) {
        await this.storage.delete(publicId);
        return { success: true, publicId };
    }
    getSignedUploadParams(folder) {
        if (!this.storage.getSignedUploadParams) {
            throw new common_1.BadRequestException('Signed uploads are only available when Cloudinary is the active storage driver');
        }
        return this.storage.getSignedUploadParams(folder);
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(storage_interface_1.STORAGE_SERVICE)),
    __metadata("design:paramtypes", [Object])
], FilesService);
//# sourceMappingURL=files.service.js.map
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
exports.LocalStorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs_1 = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
let LocalStorageService = class LocalStorageService {
    configService;
    uploadDir;
    constructor(configService) {
        this.configService = configService;
        this.uploadDir = this.configService.get('storage.uploadDir', 'uploads');
        if (!(0, fs_1.existsSync)(this.uploadDir)) {
            (0, fs_1.mkdirSync)(this.uploadDir, { recursive: true });
        }
    }
    async upload(file, folder = 'contestants') {
        if (!file?.buffer?.length) {
            throw new common_1.BadRequestException('file is required');
        }
        const targetDir = (0, path_1.join)(this.uploadDir, folder);
        if (!(0, fs_1.existsSync)(targetDir)) {
            (0, fs_1.mkdirSync)(targetDir, { recursive: true });
        }
        const filename = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
        const filepath = (0, path_1.join)(targetDir, filename);
        const { writeFile } = await import('fs/promises');
        await writeFile(filepath, file.buffer);
        const url = `/uploads/${folder}/${filename}`;
        return {
            url,
            secureUrl: url,
            publicId: `${folder}/${filename}`,
        };
    }
    async delete(publicIdOrUrl) {
        const { unlink } = await import('fs/promises');
        const { join } = await import('path');
        const relativePath = publicIdOrUrl.replace(/^\/uploads\//, '');
        const filepath = join(this.uploadDir, relativePath);
        await unlink(filepath);
    }
};
exports.LocalStorageService = LocalStorageService;
exports.LocalStorageService = LocalStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LocalStorageService);
//# sourceMappingURL=local-storage.service.js.map
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
exports.CloudinaryStorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
const cloudinary_config_1 = require("./cloudinary.config");
let CloudinaryStorageService = class CloudinaryStorageService {
    configService;
    logger;
    credentials;
    defaultFolder;
    folderMode;
    constructor(configService, logger) {
        this.configService = configService;
        this.logger = logger;
        const cloudinaryUrl = this.configService.get('storage.cloudinaryUrl');
        this.credentials = (0, cloudinary_config_1.resolveCloudinaryCredentials)({
            cloudinaryUrl,
            cloudName: this.configService.get('storage.cloudinaryCloudName'),
            apiKey: this.configService.get('storage.cloudinaryApiKey'),
            apiSecret: this.configService.get('storage.cloudinaryApiSecret'),
        });
        this.defaultFolder = this.configService.get('storage.cloudinaryFolder', 'ell-pageant');
        this.folderMode = this.configService.get('storage.cloudinaryFolderMode', 'dynamic');
    }
    async upload(file, folder = this.defaultFolder) {
        if (!file?.buffer?.length) {
            throw new common_1.BadRequestException('file is required');
        }
        const { signedParams, formFields } = this.buildFolderUploadParams(folder);
        const signature = (0, cloudinary_config_1.signCloudinaryParams)(signedParams, this.credentials.apiSecret);
        const form = new FormData();
        form.append('file', new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }), file.originalname);
        form.append('api_key', this.credentials.apiKey);
        form.append('signature', signature);
        for (const [key, value] of Object.entries(formFields)) {
            form.append(key, value);
        }
        const uploadUrl = `https://api.cloudinary.com/v1_1/${this.credentials.cloudName}/auto/upload`;
        const response = await fetch(uploadUrl, { method: 'POST', body: form });
        const body = (await response.json());
        if (!response.ok) {
            const cloudinaryMessage = body.error?.message ?? response.statusText;
            this.logger.error(`Cloudinary upload failed: ${cloudinaryMessage}`);
            throw new common_1.BadRequestException(this.mapUploadError(cloudinaryMessage));
        }
        this.logger.log(`Uploaded file to Cloudinary: ${body.public_id}`);
        return {
            url: body.url,
            secureUrl: body.secure_url,
            publicId: body.public_id,
            format: body.format,
            bytes: body.bytes,
            width: body.width,
            height: body.height,
        };
    }
    async delete(publicIdOrUrl) {
        const publicId = (0, cloudinary_config_1.extractPublicId)(publicIdOrUrl);
        const timestamp = Math.floor(Date.now() / 1000);
        const params = {
            public_id: publicId,
            timestamp,
        };
        const signature = (0, cloudinary_config_1.signCloudinaryParams)(params, this.credentials.apiSecret);
        const form = new FormData();
        form.append('public_id', publicId);
        form.append('api_key', this.credentials.apiKey);
        form.append('timestamp', String(timestamp));
        form.append('signature', signature);
        const destroyUrl = `https://api.cloudinary.com/v1_1/${this.credentials.cloudName}/image/destroy`;
        const response = await fetch(destroyUrl, { method: 'POST', body: form });
        const body = (await response.json());
        if (!response.ok || body.result !== 'ok') {
            this.logger.error(`Cloudinary delete failed for ${publicId}: ${body.error?.message ?? response.statusText}`);
            throw new common_1.BadRequestException('File deletion failed');
        }
        this.logger.log(`Deleted Cloudinary asset: ${publicId}`);
    }
    getSignedUploadParams(folder = this.defaultFolder) {
        const { signedParams } = this.buildFolderUploadParams(folder);
        const signature = (0, cloudinary_config_1.signCloudinaryParams)(signedParams, this.credentials.apiSecret);
        return Promise.resolve({
            signature,
            timestamp: signedParams.timestamp,
            apiKey: this.credentials.apiKey,
            cloudName: this.credentials.cloudName,
            folder: this.resolveTargetFolder(folder),
            uploadUrl: `https://api.cloudinary.com/v1_1/${this.credentials.cloudName}/auto/upload`,
        });
    }
    resolveTargetFolder(folder) {
        if (this.folderMode === 'dynamic') {
            return (0, cloudinary_config_1.resolveAssetFolder)(this.defaultFolder, folder);
        }
        return folder ?? this.defaultFolder;
    }
    buildFolderUploadParams(folder) {
        const timestamp = Math.floor(Date.now() / 1000);
        const targetFolder = this.resolveTargetFolder(folder);
        if (this.folderMode === 'dynamic') {
            const signedParams = {
                asset_folder: targetFolder,
                timestamp,
                use_asset_folder_as_public_id_prefix: 'true',
            };
            return {
                signedParams,
                formFields: {
                    asset_folder: targetFolder,
                    timestamp: String(timestamp),
                    use_asset_folder_as_public_id_prefix: 'true',
                },
            };
        }
        const signedParams = {
            folder: targetFolder,
            timestamp,
        };
        return {
            signedParams,
            formFields: {
                folder: targetFolder,
                timestamp: String(timestamp),
            },
        };
    }
    mapUploadError(message) {
        if (message.includes('Invalid Signature')) {
            return 'Cloudinary credentials are invalid. Check CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.';
        }
        if (message.includes('Invalid api_key')) {
            return 'Cloudinary API key is invalid. Check CLOUDINARY_API_KEY in your environment.';
        }
        return `File upload failed: ${message}`;
    }
};
exports.CloudinaryStorageService = CloudinaryStorageService;
exports.CloudinaryStorageService = CloudinaryStorageService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService, Object])
], CloudinaryStorageService);
//# sourceMappingURL=cloudinary-storage.service.js.map
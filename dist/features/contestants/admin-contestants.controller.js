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
exports.AdminContestantsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const contestants_service_1 = require("./contestants.service");
const multer_config_1 = require("../../shared/storage/multer.config");
const contestants_dto_1 = require("./dto/contestants.dto");
const decorators_1 = require("../../common/decorators");
const constants_1 = require("../../common/constants");
const parse_object_id_pipe_1 = require("../../common/pipes/parse-object-id.pipe");
let AdminContestantsController = class AdminContestantsController {
    contestantsService;
    constructor(contestantsService) {
        this.contestantsService = contestantsService;
    }
    create(dto, file, user) {
        (0, multer_config_1.assertUploadedFile)(file, 'image');
        return this.contestantsService.create(dto, file, user);
    }
    update(id, dto, user) {
        return this.contestantsService.update(id, dto, user);
    }
    uploadAvatar(id, file, user) {
        (0, multer_config_1.assertUploadedFile)(file, 'image');
        return this.contestantsService.uploadAvatar(id, file, user);
    }
    remove(id, user) {
        return this.contestantsService.softDelete(id, user);
    }
};
exports.AdminContestantsController = AdminContestantsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Contestant created' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Create contestant with avatar upload' }),
    (0, swagger_1.ApiBody)({ type: contestants_dto_1.CreateContestantDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, multer_config_1.createImageMulterOptions)())),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contestants_dto_1.CreateContestantDto, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminContestantsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Contestant updated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update contestant fields' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contestants_dto_1.UpdateContestantDto, Object]),
    __metadata("design:returntype", void 0)
], AdminContestantsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/avatar'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Contestant avatar updated' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Replace contestant avatar' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, multer_config_1.createImageMulterOptions)())),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminContestantsController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Contestant soft-deleted' }),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete contestant' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminContestantsController.prototype, "remove", null);
exports.AdminContestantsController = AdminContestantsController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Contestants'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(constants_1.UserRole.ADMIN, constants_1.UserRole.STAFF),
    (0, common_1.Controller)('admin/contestants'),
    __metadata("design:paramtypes", [contestants_service_1.ContestantsService])
], AdminContestantsController);
//# sourceMappingURL=admin-contestants.controller.js.map
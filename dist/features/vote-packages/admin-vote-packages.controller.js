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
exports.AdminVotePackagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vote_packages_service_1 = require("./vote-packages.service");
const vote_packages_dto_1 = require("./dto/vote-packages.dto");
const decorators_1 = require("../../common/decorators");
const constants_1 = require("../../common/constants");
const parse_object_id_pipe_1 = require("../../common/pipes/parse-object-id.pipe");
let AdminVotePackagesController = class AdminVotePackagesController {
    votePackagesService;
    constructor(votePackagesService) {
        this.votePackagesService = votePackagesService;
    }
    create(dto) {
        return this.votePackagesService.create(dto);
    }
    update(id, dto) {
        return this.votePackagesService.update(id, dto);
    }
    remove(id) {
        return this.votePackagesService.softDelete(id);
    }
};
exports.AdminVotePackagesController = AdminVotePackagesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Vote package created' }),
    (0, swagger_1.ApiOperation)({ summary: 'Create vote package' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vote_packages_dto_1.CreateVotePackageDto]),
    __metadata("design:returntype", void 0)
], AdminVotePackagesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Vote package updated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update vote package' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, vote_packages_dto_1.UpdateVotePackageDto]),
    __metadata("design:returntype", void 0)
], AdminVotePackagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Vote package deactivated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate vote package' }),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminVotePackagesController.prototype, "remove", null);
exports.AdminVotePackagesController = AdminVotePackagesController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Vote Packages'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(constants_1.UserRole.ADMIN),
    (0, common_1.Controller)('admin/vote-packages'),
    __metadata("design:paramtypes", [vote_packages_service_1.VotePackagesService])
], AdminVotePackagesController);
//# sourceMappingURL=admin-vote-packages.controller.js.map
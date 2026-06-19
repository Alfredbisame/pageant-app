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
exports.ContestantsService = void 0;
const common_1 = require("@nestjs/common");
const contestant_repository_1 = require("../../shared/repositories/contestant.repository");
const storage_interface_1 = require("../../shared/storage/storage.interface");
const helpers_1 = require("../../common/utils/helpers");
const pagination_1 = require("../../common/utils/pagination");
const audit_service_1 = require("../audit/audit.service");
let ContestantsService = class ContestantsService {
    contestantRepository;
    storage;
    auditService;
    constructor(contestantRepository, storage, auditService) {
        this.contestantRepository = contestantRepository;
        this.storage = storage;
        this.auditService = auditService;
    }
    async findAll(query) {
        const result = await this.contestantRepository.findActiveList(query);
        return {
            data: result.data.map((c) => this.toPublic(c)),
            meta: (0, pagination_1.buildPaginationMeta)(result.total, result.page, result.limit),
        };
    }
    async findOne(id) {
        const contestant = await this.contestantRepository.findById(id);
        if (!contestant || !contestant.isActive) {
            throw new common_1.NotFoundException('Contestant not found');
        }
        return this.toPublic(contestant);
    }
    async create(dto, file, user) {
        const slug = (0, helpers_1.slugify)(`${dto.displayName}-${dto.entryNumber}`);
        const existing = await this.contestantRepository.findOne({
            $or: [{ entryNumber: dto.entryNumber }, { slug }],
        });
        if (existing) {
            throw new common_1.ConflictException('Entry number or slug already exists');
        }
        const avatarUrl = await this.resolveAvatarUrl(dto, file);
        const contestant = await this.contestantRepository.create({
            displayName: dto.displayName,
            entryNumber: dto.entryNumber,
            level: dto.level,
            bio: dto.bio,
            slug,
            avatarUrl,
            voteCount: 0,
            isActive: true,
            createdBy: user.id,
        });
        await this.auditService.log({
            actorId: user.id,
            action: 'contestant.created',
            entity: 'contestant',
            entityId: contestant._id.toString(),
            summary: { displayName: dto.displayName },
        });
        return this.toPublic(contestant);
    }
    async update(id, dto, user) {
        const contestant = await this.contestantRepository.updateById(id, dto);
        if (!contestant)
            throw new common_1.NotFoundException('Contestant not found');
        await this.auditService.log({
            actorId: user.id,
            action: 'contestant.updated',
            entity: 'contestant',
            entityId: id,
            summary: dto,
        });
        return this.toPublic(contestant);
    }
    async uploadAvatar(id, file, user) {
        const uploaded = await this.storage.upload(file, 'contestants');
        const contestant = await this.contestantRepository.updateById(id, {
            avatarUrl: uploaded.secureUrl,
        });
        if (!contestant)
            throw new common_1.NotFoundException('Contestant not found');
        await this.auditService.log({
            actorId: user.id,
            action: 'contestant.avatar_updated',
            entity: 'contestant',
            entityId: id,
            summary: { avatarUrl: uploaded.secureUrl },
        });
        return this.toPublic(contestant);
    }
    async softDelete(id, user) {
        const contestant = await this.contestantRepository.updateById(id, {
            isActive: false,
        });
        if (!contestant)
            throw new common_1.NotFoundException('Contestant not found');
        await this.auditService.log({
            actorId: user.id,
            action: 'contestant.deleted',
            entity: 'contestant',
            entityId: id,
            summary: {},
        });
        return { success: true };
    }
    async resolveAvatarUrl(dto, file) {
        if (file?.buffer?.length) {
            const uploaded = await this.storage.upload(file, 'contestants');
            return uploaded.secureUrl;
        }
        const imageUrl = dto.imageUrl;
        if (imageUrl) {
            return imageUrl;
        }
        throw new common_1.BadRequestException('An image file or imageUrl (avatar URL) is required');
    }
    toPublic(contestant) {
        return {
            id: contestant._id.toString(),
            name: contestant.displayName,
            displayName: contestant.displayName,
            entryNumber: contestant.entryNumber,
            level: contestant.level,
            bio: contestant.bio,
            image: contestant.avatarUrl,
            avatarUrl: contestant.avatarUrl,
            votes: contestant.voteCount,
            slug: contestant.slug,
        };
    }
};
exports.ContestantsService = ContestantsService;
exports.ContestantsService = ContestantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(storage_interface_1.STORAGE_SERVICE)),
    __metadata("design:paramtypes", [contestant_repository_1.ContestantRepository, Object, audit_service_1.AuditService])
], ContestantsService);
//# sourceMappingURL=contestants.service.js.map
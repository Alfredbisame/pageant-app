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
exports.VotePackagesService = void 0;
const common_1 = require("@nestjs/common");
const vote_package_repository_1 = require("../../shared/repositories/vote-package.repository");
let VotePackagesService = class VotePackagesService {
    votePackageRepository;
    constructor(votePackageRepository) {
        this.votePackageRepository = votePackageRepository;
    }
    async findActive() {
        const packages = await this.votePackageRepository.findActive();
        return packages.map((pkg) => this.toPublic(pkg));
    }
    async create(dto) {
        const pkg = await this.votePackageRepository.create({
            ...dto,
            currency: 'GHS',
            isActive: true,
        });
        return this.toPublic(pkg);
    }
    async update(id, dto) {
        const pkg = await this.votePackageRepository.updateById(id, dto);
        if (!pkg)
            throw new common_1.NotFoundException('Vote package not found');
        return this.toPublic(pkg);
    }
    async softDelete(id) {
        const pkg = await this.votePackageRepository.updateById(id, {
            isActive: false,
        });
        if (!pkg)
            throw new common_1.NotFoundException('Vote package not found');
        return { success: true };
    }
    toPublic(pkg) {
        return {
            id: pkg._id.toString(),
            name: pkg.name,
            votes: pkg.votes,
            baseAmount: pkg.baseAmount,
            currency: pkg.currency,
            isPopular: pkg.isPopular,
            sortOrder: pkg.sortOrder,
        };
    }
};
exports.VotePackagesService = VotePackagesService;
exports.VotePackagesService = VotePackagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [vote_package_repository_1.VotePackageRepository])
], VotePackagesService);
//# sourceMappingURL=vote-packages.service.js.map
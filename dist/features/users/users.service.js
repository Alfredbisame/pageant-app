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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../shared/repositories/user.repository");
const constants_1 = require("../../common/constants");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.sanitize(user);
    }
    async updateProfile(userId, dto) {
        if (dto.email) {
            const existing = await this.userRepository.findByEmail(dto.email);
            if (existing && existing._id.toString() !== userId) {
                throw new common_1.ConflictException('Email already in use');
            }
        }
        const user = await this.userRepository.updateById(userId, dto);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.sanitize(user);
    }
    async softDelete(userId) {
        const user = await this.userRepository.updateById(userId, {
            status: constants_1.UserStatus.DELETED,
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return { success: true };
    }
    async listUsers(page = 1, limit = 20) {
        const [users, total] = await this.userRepository.findPaginated(page, limit);
        return {
            data: users.map((u) => this.sanitize(u)),
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async updateRole(userId, role) {
        const user = await this.userRepository.updateById(userId, {
            role,
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.sanitize(user);
    }
    async updateStatus(userId, status) {
        const user = await this.userRepository.updateById(userId, {
            status,
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.sanitize(user);
    }
    sanitize(user) {
        return {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map
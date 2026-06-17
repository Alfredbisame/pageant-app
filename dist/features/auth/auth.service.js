"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const argon2 = __importStar(require("argon2"));
const crypto_1 = require("crypto");
const user_repository_1 = require("../../shared/repositories/user.repository");
const constants_1 = require("../../common/constants");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    configService;
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        return this.createUser({
            fullName: dto.fullName,
            email: dto.email,
            password: dto.password,
            role: constants_1.UserRole.VOTER,
        });
    }
    async registerAdmin(dto, actor) {
        if (!(0, constants_1.isAdminRole)(dto.role)) {
            throw new common_1.BadRequestException('Role must be admin or staff');
        }
        const adminCount = await this.userRepository.count({
            role: constants_1.UserRole.ADMIN,
            status: { $ne: constants_1.UserStatus.DELETED },
        });
        if (adminCount > 0) {
            if (!actor || actor.role !== constants_1.UserRole.ADMIN) {
                throw new common_1.ForbiddenException('Only existing admins can register admin or staff accounts');
            }
        }
        const input = {
            fullName: dto.fullName,
            email: dto.email,
            password: dto.password,
            role: dto.role,
        };
        return this.createUser(input);
    }
    async login(dto) {
        return this.authenticate(dto.email, dto.password);
    }
    async loginAdmin(dto) {
        const result = await this.authenticate(dto.email, dto.password);
        if (result.user.role !== constants_1.UserRole.ADMIN &&
            result.user.role !== constants_1.UserRole.STAFF) {
            throw new common_1.ForbiddenException('Admin or staff access required');
        }
        return result;
    }
    async createUser(input) {
        const existing = await this.userRepository.findByEmail(input.email);
        if (existing) {
            throw new common_1.ConflictException('Email already registered');
        }
        const passwordHash = await argon2.hash(input.password);
        const user = await this.userRepository.create({
            fullName: input.fullName,
            email: input.email.toLowerCase(),
            passwordHash,
            role: input.role,
            status: constants_1.UserStatus.ACTIVE,
            refreshTokens: [],
        });
        return this.issueTokens(user._id.toString(), user.email, user.role, user.fullName);
    }
    async authenticate(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user || user.status !== constants_1.UserStatus.ACTIVE) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const valid = await argon2.verify(user.passwordHash, password);
        if (!valid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return this.issueTokens(user._id.toString(), user.email, user.role, user.fullName);
    }
    async refresh(refreshToken) {
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.getOrThrow('jwt.refreshSecret'),
            });
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const user = await this.userRepository.findById(payload.sub);
        if (!user || user.status !== constants_1.UserStatus.ACTIVE) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const tokenHash = this.hashToken(refreshToken);
        const stored = user.refreshTokens.find((t) => t.tokenHash === tokenHash && !t.revokedAt && t.expiresAt > new Date());
        if (!stored) {
            throw new common_1.UnauthorizedException('Refresh token revoked or expired');
        }
        stored.revokedAt = new Date();
        await user.save();
        return this.issueTokens(user._id.toString(), user.email, user.role, user.fullName);
    }
    async logout(userId, refreshToken) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            return { success: true };
        const tokenHash = this.hashToken(refreshToken);
        const entry = user.refreshTokens.find((t) => t.tokenHash === tokenHash);
        if (entry) {
            entry.revokedAt = new Date();
            await user.save();
        }
        return { success: true };
    }
    async forgotPassword(dto) {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            return { message: 'If the email exists, a reset link has been sent' };
        }
        const token = (0, crypto_1.randomBytes)(32).toString('hex');
        user.passwordResetTokenHash = this.hashToken(token);
        user.passwordResetExpiresAt = new Date(Date.now() + 3600000);
        await user.save();
        return {
            message: 'If the email exists, a reset link has been sent',
            ...(process.env.NODE_ENV === 'development' ? { resetToken: token } : {}),
        };
    }
    async resetPassword(dto) {
        const tokenHash = this.hashToken(dto.token);
        const user = await this.userRepository.findOne({
            passwordResetTokenHash: tokenHash,
            passwordResetExpiresAt: { $gt: new Date() },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        user.passwordHash = await argon2.hash(dto.password);
        user.passwordResetTokenHash = undefined;
        user.passwordResetExpiresAt = undefined;
        user.refreshTokens = [];
        await user.save();
        return { message: 'Password reset successful' };
    }
    async issueTokens(userId, email, role, fullName) {
        const payload = { sub: userId, email, role };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow('jwt.secret'),
            expiresIn: this.configService.get('jwt.accessExpiresIn'),
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow('jwt.refreshSecret'),
            expiresIn: this.configService.get('jwt.refreshExpiresIn'),
        });
        const user = await this.userRepository.findById(userId);
        if (user) {
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);
            user.refreshTokens.push({
                tokenHash: this.hashToken(refreshToken),
                expiresAt,
            });
            await user.save();
        }
        return {
            accessToken,
            refreshToken,
            user: { id: userId, email, role, fullName },
        };
    }
    hashToken(token) {
        return (0, crypto_1.createHash)('sha256').update(token).digest('hex');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { createHash, randomBytes } from 'crypto';
import { UserRepository } from '../../shared/repositories/user.repository';
import { UserRole, UserStatus } from '../../common/constants';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await argon2.hash(dto.password);
    const user = await this.userRepository.create({
      fullName: dto.fullName,
      email: dto.email.toLowerCase(),
      passwordHash,
      role: UserRole.VOTER,
      status: UserStatus.ACTIVE,
      refreshTokens: [],
    });

    return this.issueTokens(
      user._id.toString(),
      user.email,
      user.role,
      user.fullName,
    );
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user || user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await argon2.verify(user.passwordHash, dto.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(
      user._id.toString(),
      user.email,
      user.role,
      user.fullName,
    );
  }

  async refresh(refreshToken: string) {
    let payload: { sub: string; email: string; role: UserRole };
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow<string>('jwt.refreshSecret'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user || user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('User not found');
    }

    const tokenHash = this.hashToken(refreshToken);
    const stored = user.refreshTokens.find(
      (t) =>
        t.tokenHash === tokenHash && !t.revokedAt && t.expiresAt > new Date(),
    );

    if (!stored) {
      throw new UnauthorizedException('Refresh token revoked or expired');
    }

    stored.revokedAt = new Date();
    await user.save();

    return this.issueTokens(
      user._id.toString(),
      user.email,
      user.role,
      user.fullName,
    );
  }

  async logout(userId: string, refreshToken: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) return { success: true };

    const tokenHash = this.hashToken(refreshToken);
    const entry = user.refreshTokens.find((t) => t.tokenHash === tokenHash);
    if (entry) {
      entry.revokedAt = new Date();
      await user.save();
    }

    return { success: true };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      return { message: 'If the email exists, a reset link has been sent' };
    }

    const token = randomBytes(32).toString('hex');
    user.passwordResetTokenHash = this.hashToken(token);
    user.passwordResetExpiresAt = new Date(Date.now() + 3600000);
    await user.save();

    // In production, send email with token. For dev, return token in response metadata via logs.
    return {
      message: 'If the email exists, a reset link has been sent',
      ...(process.env.NODE_ENV === 'development' ? { resetToken: token } : {}),
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const tokenHash = this.hashToken(dto.token);
    const user = await this.userRepository.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpiresAt: { $gt: new Date() },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    user.passwordHash = await argon2.hash(dto.password);
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpiresAt = undefined;
    user.refreshTokens = [];
    await user.save();

    return { message: 'Password reset successful' };
  }

  private async issueTokens(
    userId: string,
    email: string,
    role: UserRole,
    fullName: string,
  ) {
    const payload = { sub: userId, email, role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('jwt.secret'),
      expiresIn: this.configService.get('jwt.accessExpiresIn'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('jwt.refreshSecret'),
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

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}

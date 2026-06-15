import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../shared/repositories/user.repository';
import { UserStatus } from '../../common/constants';
import { UpdateProfileDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return this.sanitize(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    if (dto.email) {
      const existing = await this.userRepository.findByEmail(dto.email);
      if (existing && existing._id.toString() !== userId) {
        throw new ConflictException('Email already in use');
      }
    }

    const user = await this.userRepository.updateById(userId, dto);
    if (!user) throw new NotFoundException('User not found');
    return this.sanitize(user);
  }

  async softDelete(userId: string) {
    const user = await this.userRepository.updateById(userId, {
      status: UserStatus.DELETED,
    });
    if (!user) throw new NotFoundException('User not found');
    return { success: true };
  }

  async listUsers(page = 1, limit = 20) {
    const [users, total] = await this.userRepository.findPaginated(page, limit);

    return {
      data: users.map((u) => this.sanitize(u)),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateRole(userId: string, role: string) {
    const user = await this.userRepository.updateById(userId, {
      role,
    });
    if (!user) throw new NotFoundException('User not found');
    return this.sanitize(user);
  }

  async updateStatus(userId: string, status: string) {
    const user = await this.userRepository.updateById(userId, {
      status,
    });
    if (!user) throw new NotFoundException('User not found');
    return this.sanitize(user);
  }

  private sanitize(user: {
    _id: { toString(): string };
    fullName: string;
    email: string;
    role: string;
    status: string;
    createdAt: Date;
  }) {
    return {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    };
  }
}

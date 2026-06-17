import { UserRepository } from "../../shared/repositories/user.repository";
import { UserRole } from "../../common/constants";
import { UpdateProfileDto } from './dto/users.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getProfile(userId: string): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
    }>;
    softDelete(userId: string): Promise<{
        success: boolean;
    }>;
    listUsers(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            fullName: string;
            email: string;
            role: string;
            status: string;
            createdAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    updateRole(userId: string, role: UserRole): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
    }>;
    updateStatus(userId: string, status: string): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
    }>;
    private sanitize;
}

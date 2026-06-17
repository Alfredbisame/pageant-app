import { UsersService } from './users.service';
import type { AuthenticatedUser } from "../../common/types";
import { UpdateProfileDto, UpdateUserRoleDto, UpdateUserStatusDto } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(user: AuthenticatedUser): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
    }>;
    updateMe(user: AuthenticatedUser, dto: UpdateProfileDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
    }>;
    deleteMe(user: AuthenticatedUser): Promise<{
        success: boolean;
    }>;
}
export declare class AdminUsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    list(page?: number, limit?: number): Promise<{
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
    updateRole(id: string, dto: UpdateUserRoleDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
    }>;
    updateStatus(id: string, dto: UpdateUserStatusDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
    }>;
}

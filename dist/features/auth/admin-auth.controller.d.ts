import { AuthService } from './auth.service';
import { AdminLoginDto, AdminRegisterDto } from './dto/auth.dto';
import type { AuthenticatedUser } from "../../common/types";
export declare class AdminAuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: AdminRegisterDto, actor?: AuthenticatedUser): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: import("../../common/constants").UserRole;
            fullName: string;
        };
    }>;
    login(dto: AdminLoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: import("../../common/constants").UserRole;
            fullName: string;
        };
    }>;
}

import { UserRole } from "../../../common/constants";
export declare class UpdateProfileDto {
    fullName?: string;
    email?: string;
}
export declare class UpdateUserRoleDto {
    role: UserRole;
}
export declare class UpdateUserStatusDto {
    status: string;
}

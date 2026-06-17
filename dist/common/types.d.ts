import { UserRole } from './constants';
export interface JwtPayload {
    sub: string;
    email: string;
    role: UserRole;
}
export interface AuthenticatedUser {
    id: string;
    email: string;
    role: UserRole;
    fullName: string;
}
export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export interface PaginatedResult<T> {
    data: T[];
    meta: PaginationMeta;
}
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

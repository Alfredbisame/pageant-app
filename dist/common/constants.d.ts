export declare enum UserRole {
    VOTER = "voter",
    STAFF = "staff",
    ADMIN = "admin"
}
export declare const ADMIN_ROLES: readonly [UserRole.ADMIN, UserRole.STAFF];
export type AdminRole = (typeof ADMIN_ROLES)[number];
export declare function isAdminRole(role: UserRole): role is AdminRole;
export declare enum UserStatus {
    ACTIVE = "active",
    SUSPENDED = "suspended",
    DELETED = "deleted"
}
export declare enum ContestantLevel {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced"
}
export declare enum PaymentProvider {
    PAYSTACK = "paystack",
    HUBTEL = "hubtel",
    USSD = "ussd"
}
export declare enum PaymentStatus {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed"
}
export declare enum VoteLedgerType {
    CREDIT = "credit",
    ADJUSTMENT = "adjustment"
}
export declare const ROLES_KEY = "roles";
export declare const IS_PUBLIC_KEY = "isPublic";

export enum UserRole {
  VOTER = 'voter',
  STAFF = 'staff',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export enum ContestantLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export enum PaymentProvider {
  PAYSTACK = 'paystack',
  HUBTEL = 'hubtel',
  USSD = 'ussd',
}

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum VoteLedgerType {
  CREDIT = 'credit',
  ADJUSTMENT = 'adjustment',
}

export const ROLES_KEY = 'roles';
export const IS_PUBLIC_KEY = 'isPublic';

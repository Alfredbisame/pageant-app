"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_PUBLIC_KEY = exports.ROLES_KEY = exports.VoteLedgerType = exports.PaymentStatus = exports.PaymentProvider = exports.ContestantLevel = exports.UserStatus = exports.ADMIN_ROLES = exports.UserRole = void 0;
exports.isAdminRole = isAdminRole;
var UserRole;
(function (UserRole) {
    UserRole["VOTER"] = "voter";
    UserRole["STAFF"] = "staff";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.ADMIN_ROLES = [UserRole.ADMIN, UserRole.STAFF];
function isAdminRole(role) {
    return role === UserRole.ADMIN || role === UserRole.STAFF;
}
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["SUSPENDED"] = "suspended";
    UserStatus["DELETED"] = "deleted";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var ContestantLevel;
(function (ContestantLevel) {
    ContestantLevel["BEGINNER"] = "Beginner";
    ContestantLevel["INTERMEDIATE"] = "Intermediate";
    ContestantLevel["ADVANCED"] = "Advanced";
})(ContestantLevel || (exports.ContestantLevel = ContestantLevel = {}));
var PaymentProvider;
(function (PaymentProvider) {
    PaymentProvider["PAYSTACK"] = "paystack";
    PaymentProvider["HUBTEL"] = "hubtel";
    PaymentProvider["USSD"] = "ussd";
})(PaymentProvider || (exports.PaymentProvider = PaymentProvider = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["SUCCESS"] = "success";
    PaymentStatus["FAILED"] = "failed";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var VoteLedgerType;
(function (VoteLedgerType) {
    VoteLedgerType["CREDIT"] = "credit";
    VoteLedgerType["ADJUSTMENT"] = "adjustment";
})(VoteLedgerType || (exports.VoteLedgerType = VoteLedgerType = {}));
exports.ROLES_KEY = 'roles';
exports.IS_PUBLIC_KEY = 'isPublic';
//# sourceMappingURL=constants.js.map
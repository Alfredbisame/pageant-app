"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const decorators_1 = require("../../common/decorators");
const optional_jwt_auth_guard_1 = require("../../common/guards/optional-jwt-auth.guard");
let AdminAuthController = class AdminAuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register(dto, actor) {
        return this.authService.registerAdmin(dto, actor);
    }
    login(dto) {
        return this.authService.loginAdmin(dto);
    }
};
exports.AdminAuthController = AdminAuthController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(optional_jwt_auth_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Admin or staff account created' }),
    (0, swagger_1.ApiOperation)({
        summary: 'Register an admin or staff account',
        description: 'Open when no admin exists yet (bootstrap). After that, only authenticated admins can create accounts.',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AdminRegisterDto, Object]),
    __metadata("design:returntype", void 0)
], AdminAuthController.prototype, "register", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Admin login successful' }),
    (0, swagger_1.ApiOperation)({
        summary: 'Admin or staff login',
        description: 'Only users with admin or staff roles can sign in here.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AdminLoginDto]),
    __metadata("design:returntype", void 0)
], AdminAuthController.prototype, "login", null);
exports.AdminAuthController = AdminAuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth - Admin'),
    (0, common_1.Controller)('auth/admin'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AdminAuthController);
//# sourceMappingURL=admin-auth.controller.js.map
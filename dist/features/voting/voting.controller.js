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
exports.VotingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const voting_service_1 = require("./voting.service");
const voting_dto_1 = require("./dto/voting.dto");
const decorators_1 = require("../../common/decorators");
const optional_jwt_auth_guard_1 = require("../../common/guards/optional-jwt-auth.guard");
let VotingController = class VotingController {
    votingService;
    constructor(votingService) {
        this.votingService = votingService;
    }
    quote(dto) {
        return this.votingService.quote(dto);
    }
    confirm(dto, user) {
        return this.votingService.confirm(dto, user);
    }
    history(user) {
        return this.votingService.getHistory(user.id);
    }
    transactionStatus(reference) {
        return this.votingService.getTransactionStatus(reference);
    }
};
exports.VotingController = VotingController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('quote'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Vote quote calculated' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get server-validated vote quote with fees' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [voting_dto_1.VotingQuoteDto]),
    __metadata("design:returntype", void 0)
], VotingController.prototype, "quote", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(optional_jwt_auth_guard_1.OptionalJwtAuthGuard),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Post)('confirm'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Payment verified and votes credited' }),
    (0, swagger_1.ApiOperation)({ summary: 'Verify payment and credit votes' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [voting_dto_1.VotingConfirmDto, Object]),
    __metadata("design:returntype", void 0)
], VotingController.prototype, "confirm", null);
__decorate([
    (0, common_1.Get)('history'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get authenticated user vote purchase history' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VotingController.prototype, "history", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('transactions/:reference'),
    (0, swagger_1.ApiOperation)({ summary: 'Poll payment status by internal reference' }),
    __param(0, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VotingController.prototype, "transactionStatus", null);
exports.VotingController = VotingController = __decorate([
    (0, swagger_1.ApiTags)('Voting'),
    (0, common_1.Controller)('voting'),
    __metadata("design:paramtypes", [voting_service_1.VotingService])
], VotingController);
//# sourceMappingURL=voting.controller.js.map
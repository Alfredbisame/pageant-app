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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminVoteHistoryQueryDto = exports.AdminTransactionQueryDto = exports.AdminCreditVotesDto = exports.VotingConfirmDto = exports.VotingQuoteDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../common/constants");
const class_transformer_1 = require("class-transformer");
class VotingQuoteDto {
    contestantId;
    packageId;
    customAmount;
}
exports.VotingQuoteDto = VotingQuoteDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], VotingQuoteDto.prototype, "contestantId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], VotingQuoteDto.prototype, "packageId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Custom amount in pesewas' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], VotingQuoteDto.prototype, "customAmount", void 0);
class VotingConfirmDto {
    provider;
    providerReference;
    providerPayload;
    contestantId;
    packageId;
    customAmount;
    voterName;
    voterEmail;
    anonymous;
}
exports.VotingConfirmDto = VotingConfirmDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: constants_1.PaymentProvider }),
    (0, class_validator_1.IsEnum)(constants_1.PaymentProvider),
    __metadata("design:type", String)
], VotingConfirmDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VotingConfirmDto.prototype, "providerReference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], VotingConfirmDto.prototype, "providerPayload", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], VotingConfirmDto.prototype, "contestantId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], VotingConfirmDto.prototype, "packageId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Custom amount in pesewas' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], VotingConfirmDto.prototype, "customAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], VotingConfirmDto.prototype, "voterName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], VotingConfirmDto.prototype, "voterEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VotingConfirmDto.prototype, "anonymous", void 0);
class AdminCreditVotesDto {
    contestantId;
    votes;
    reason;
    providerReference;
}
exports.AdminCreditVotesDto = AdminCreditVotesDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], AdminCreditVotesDto.prototype, "contestantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AdminCreditVotesDto.prototype, "votes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Payment verified manually after webhook failure' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], AdminCreditVotesDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Provider reference to prevent double-crediting an already-settled payment',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminCreditVotesDto.prototype, "providerReference", void 0);
class AdminTransactionQueryDto {
    page;
    limit;
    contestantId;
    status;
    voterEmail;
    provider;
}
exports.AdminTransactionQueryDto = AdminTransactionQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AdminTransactionQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AdminTransactionQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], AdminTransactionQueryDto.prototype, "contestantId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: constants_1.PaymentStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.PaymentStatus),
    __metadata("design:type", String)
], AdminTransactionQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AdminTransactionQueryDto.prototype, "voterEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: constants_1.PaymentProvider }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.PaymentProvider),
    __metadata("design:type", String)
], AdminTransactionQueryDto.prototype, "provider", void 0);
class AdminVoteHistoryQueryDto {
    page;
    limit;
    contestantId;
    type;
}
exports.AdminVoteHistoryQueryDto = AdminVoteHistoryQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AdminVoteHistoryQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AdminVoteHistoryQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], AdminVoteHistoryQueryDto.prototype, "contestantId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: constants_1.VoteLedgerType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.VoteLedgerType),
    __metadata("design:type", String)
], AdminVoteHistoryQueryDto.prototype, "type", void 0);
//# sourceMappingURL=voting.dto.js.map
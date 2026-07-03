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
exports.UpdateTeamDto = exports.TeamMemberDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class TeamMemberDto {
    name;
    role;
    image;
    sortOrder;
}
exports.TeamMemberDto = TeamMemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. Sarah Chen' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeamMemberDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Executive Director' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeamMemberDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Profile image URL' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)({}, { message: 'image must be a valid URL' }),
    __metadata("design:type", String)
], TeamMemberDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort order (lower = first)',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TeamMemberDto.prototype, "sortOrder", void 0);
class UpdateTeamDto {
    heading;
    subtitle;
    members;
}
exports.UpdateTeamDto = UpdateTeamDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Section heading',
        example: 'Meet the Organizers',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeamDto.prototype, "heading", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Section subtitle' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeamDto.prototype, "subtitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of team members (replaces existing)',
        type: [TeamMemberDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TeamMemberDto),
    __metadata("design:type", Array)
], UpdateTeamDto.prototype, "members", void 0);
//# sourceMappingURL=update-team.dto.js.map
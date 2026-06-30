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
exports.UpdateImpactStatsDto = exports.ImpactStatItemDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ImpactStatItemDto {
    value;
    label;
    description;
}
exports.ImpactStatItemDto = ImpactStatItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15,000+' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImpactStatItemDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Students Reached' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImpactStatItemDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Empowering learners across the globe' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImpactStatItemDto.prototype, "description", void 0);
class UpdateImpactStatsDto {
    items;
}
exports.UpdateImpactStatsDto = UpdateImpactStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of impact stat items (replaces existing)',
        type: [ImpactStatItemDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ImpactStatItemDto),
    __metadata("design:type", Array)
], UpdateImpactStatsDto.prototype, "items", void 0);
//# sourceMappingURL=update-impact-stats.dto.js.map
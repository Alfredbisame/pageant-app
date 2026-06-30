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
exports.UpdateTimelineDto = exports.TimelineItemDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class TimelineItemDto {
    year;
    title;
    description;
    side;
    accent;
    sortOrder;
}
exports.TimelineItemDto = TimelineItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2014' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimelineItemDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'The Inaugural Spark' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimelineItemDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'What began as a classroom initiative...' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimelineItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['left', 'right'], example: 'left' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['left', 'right']),
    __metadata("design:type", String)
], TimelineItemDto.prototype, "side", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['primary', 'secondary', 'anniversary'],
        example: 'primary',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['primary', 'secondary', 'anniversary']),
    __metadata("design:type", String)
], TimelineItemDto.prototype, "accent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sort order (lower = first)', example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TimelineItemDto.prototype, "sortOrder", void 0);
class UpdateTimelineDto {
    heading;
    subtitle;
    items;
}
exports.UpdateTimelineDto = UpdateTimelineDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Section heading', example: 'Our Journey' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTimelineDto.prototype, "heading", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Section subtitle' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTimelineDto.prototype, "subtitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of timeline items (replaces existing)',
        type: [TimelineItemDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TimelineItemDto),
    __metadata("design:type", Array)
], UpdateTimelineDto.prototype, "items", void 0);
//# sourceMappingURL=update-timeline.dto.js.map
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
exports.LegacySectionSchema = exports.LegacySection = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let LegacySection = class LegacySection {
    imageUrl;
    imageAlt;
    subtitle;
    title;
    description;
    linkUrl;
    linkLabel;
    createdAt;
    updatedAt;
};
exports.LegacySection = LegacySection;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LegacySection.prototype, "imageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LegacySection.prototype, "imageAlt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Our Legacy' }),
    __metadata("design:type", String)
], LegacySection.prototype, "subtitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'A Decade of Excellence' }),
    __metadata("design:type", String)
], LegacySection.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LegacySection.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '/about' }),
    __metadata("design:type", String)
], LegacySection.prototype, "linkUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Read Our Story' }),
    __metadata("design:type", String)
], LegacySection.prototype, "linkLabel", void 0);
exports.LegacySection = LegacySection = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'legacy_sections' })
], LegacySection);
exports.LegacySectionSchema = mongoose_1.SchemaFactory.createForClass(LegacySection);
//# sourceMappingURL=legacy-section.schema.js.map
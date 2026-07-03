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
exports.RewardsSectionSchema = exports.RewardsSection = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let RewardsSection = class RewardsSection {
    subtitle;
    title;
    description;
    createdAt;
    updatedAt;
};
exports.RewardsSection = RewardsSection;
__decorate([
    (0, mongoose_1.Prop)({ default: 'Rewards' }),
    __metadata("design:type", String)
], RewardsSection.prototype, "subtitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Grand Prizes' }),
    __metadata("design:type", String)
], RewardsSection.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RewardsSection.prototype, "description", void 0);
exports.RewardsSection = RewardsSection = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'rewards_sections' })
], RewardsSection);
exports.RewardsSectionSchema = mongoose_1.SchemaFactory.createForClass(RewardsSection);
//# sourceMappingURL=rewards-section.schema.js.map
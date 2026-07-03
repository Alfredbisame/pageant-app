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
exports.PrizeSchema = exports.Prize = exports.PrizeVariant = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var PrizeVariant;
(function (PrizeVariant) {
    PrizeVariant["GOLD"] = "gold";
    PrizeVariant["GREEN"] = "green";
})(PrizeVariant || (exports.PrizeVariant = PrizeVariant = {}));
let Prize = class Prize {
    icon;
    title;
    amount;
    subtitle;
    description;
    variant;
    displayOrder;
    isActive;
    rewardsSectionId;
    createdAt;
    updatedAt;
};
exports.Prize = Prize;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Prize.prototype, "icon", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Prize.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Prize.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Prize.prototype, "subtitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Prize.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: PrizeVariant, default: PrizeVariant.GOLD }),
    __metadata("design:type", String)
], Prize.prototype, "variant", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Prize.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Prize.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'RewardsSection', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Prize.prototype, "rewardsSectionId", void 0);
exports.Prize = Prize = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'prizes' })
], Prize);
exports.PrizeSchema = mongoose_1.SchemaFactory.createForClass(Prize);
exports.PrizeSchema.index({ displayOrder: 1, isActive: 1 });
//# sourceMappingURL=prize.schema.js.map
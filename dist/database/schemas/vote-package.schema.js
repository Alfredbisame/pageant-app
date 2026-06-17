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
exports.VotePackageSchema = exports.VotePackage = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let VotePackage = class VotePackage {
    name;
    votes;
    baseAmount;
    currency;
    isPopular;
    isActive;
    sortOrder;
    createdAt;
    updatedAt;
};
exports.VotePackage = VotePackage;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], VotePackage.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], VotePackage.prototype, "votes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], VotePackage.prototype, "baseAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'GHS' }),
    __metadata("design:type", String)
], VotePackage.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], VotePackage.prototype, "isPopular", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], VotePackage.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], VotePackage.prototype, "sortOrder", void 0);
exports.VotePackage = VotePackage = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'vote_packages' })
], VotePackage);
exports.VotePackageSchema = mongoose_1.SchemaFactory.createForClass(VotePackage);
//# sourceMappingURL=vote-package.schema.js.map
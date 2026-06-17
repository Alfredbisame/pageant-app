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
exports.ContestantSchema = exports.Contestant = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../common/constants");
let Contestant = class Contestant {
    entryNumber;
    slug;
    displayName;
    bio;
    level;
    avatarUrl;
    voteCount;
    isActive;
    createdBy;
    createdAt;
    updatedAt;
};
exports.Contestant = Contestant;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], Contestant.prototype, "entryNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Contestant.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Contestant.prototype, "displayName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Contestant.prototype, "bio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: constants_1.ContestantLevel, required: true }),
    __metadata("design:type", String)
], Contestant.prototype, "level", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Contestant.prototype, "avatarUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, min: 0 }),
    __metadata("design:type", Number)
], Contestant.prototype, "voteCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Contestant.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Contestant.prototype, "createdBy", void 0);
exports.Contestant = Contestant = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'contestants' })
], Contestant);
exports.ContestantSchema = mongoose_1.SchemaFactory.createForClass(Contestant);
exports.ContestantSchema.index({ entryNumber: 1 }, { unique: true });
exports.ContestantSchema.index({ slug: 1 }, { unique: true });
exports.ContestantSchema.index({ voteCount: -1 });
exports.ContestantSchema.index({ displayName: 'text' });
//# sourceMappingURL=contestant.schema.js.map
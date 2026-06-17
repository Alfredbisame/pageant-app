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
exports.EventConfigSchema = exports.EventConfig = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let EventConfig = class EventConfig {
    eventName;
    votingEnabled;
    votingStartsAt;
    votingEndsAt;
    platformFeeRate;
    dailyVoteLimitPerVoter;
    createdAt;
    updatedAt;
};
exports.EventConfig = EventConfig;
__decorate([
    (0, mongoose_1.Prop)({ default: 'ELL Pageant 10th Anniversary' }),
    __metadata("design:type", String)
], EventConfig.prototype, "eventName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], EventConfig.prototype, "votingEnabled", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], EventConfig.prototype, "votingStartsAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], EventConfig.prototype, "votingEndsAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0.025, min: 0, max: 1 }),
    __metadata("design:type", Number)
], EventConfig.prototype, "platformFeeRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], EventConfig.prototype, "dailyVoteLimitPerVoter", void 0);
exports.EventConfig = EventConfig = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'event_config' })
], EventConfig);
exports.EventConfigSchema = mongoose_1.SchemaFactory.createForClass(EventConfig);
//# sourceMappingURL=event-config.schema.js.map
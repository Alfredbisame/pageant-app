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
exports.VoteLedgerSchema = exports.VoteLedger = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../common/constants");
let VoteLedger = class VoteLedger {
    paymentId;
    contestantId;
    votes;
    type;
    reason;
    adjustedByUserId;
    providerReference;
    createdAt;
};
exports.VoteLedger = VoteLedger;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Payment', sparse: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], VoteLedger.prototype, "paymentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Contestant', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], VoteLedger.prototype, "contestantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], VoteLedger.prototype, "votes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: constants_1.VoteLedgerType, default: constants_1.VoteLedgerType.CREDIT }),
    __metadata("design:type", String)
], VoteLedger.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], VoteLedger.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], VoteLedger.prototype, "adjustedByUserId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], VoteLedger.prototype, "providerReference", void 0);
exports.VoteLedger = VoteLedger = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: { createdAt: true, updatedAt: false },
        collection: 'vote_ledger',
    })
], VoteLedger);
exports.VoteLedgerSchema = mongoose_1.SchemaFactory.createForClass(VoteLedger);
exports.VoteLedgerSchema.index({ paymentId: 1 }, { unique: true, sparse: true });
exports.VoteLedgerSchema.index({ providerReference: 1 }, { sparse: true });
//# sourceMappingURL=vote-ledger.schema.js.map
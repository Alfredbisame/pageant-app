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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../common/constants");
const payment_schema_1 = require("../../database/schemas/payment.schema");
const base_repository_1 = require("./base.repository");
let PaymentRepository = class PaymentRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    findByProviderReference(providerReference) {
        return this.model.findOne({ providerReference }).exec();
    }
    findByReference(reference) {
        return this.model.findOne({ reference }).exec();
    }
    findByUserId(userId, limit = 20) {
        return this.model
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .exec();
    }
    countDailyVotesByEmail(email, startOfDay) {
        return this.model.countDocuments({
            voterEmail: email.toLowerCase(),
            status: constants_1.PaymentStatus.SUCCESS,
            createdAt: { $gte: startOfDay },
        });
    }
};
exports.PaymentRepository = PaymentRepository;
exports.PaymentRepository = PaymentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_schema_1.Payment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PaymentRepository);
//# sourceMappingURL=payment.repository.js.map
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
exports.VoteLedgerRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const vote_ledger_schema_1 = require("../../database/schemas/vote-ledger.schema");
const base_repository_1 = require("./base.repository");
const pagination_1 = require("../../common/utils/pagination");
let VoteLedgerRepository = class VoteLedgerRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    findByProviderReference(providerReference) {
        return this.model.findOne({ providerReference }).exec();
    }
    async findPaginated(query) {
        const { limit, skip } = (0, pagination_1.getPagination)(query);
        const filter = {};
        if (query.contestantId) {
            filter.contestantId = new mongoose_2.Types.ObjectId(query.contestantId);
        }
        if (query.type) {
            filter.type = query.type;
        }
        const [entries, total] = await Promise.all([
            this.model
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('contestantId', 'displayName entryNumber')
                .populate('paymentId', 'reference providerReference status totalAmount')
                .populate('adjustedByUserId', 'fullName email')
                .exec(),
            this.model.countDocuments(filter).exec(),
        ]);
        return [entries, total];
    }
};
exports.VoteLedgerRepository = VoteLedgerRepository;
exports.VoteLedgerRepository = VoteLedgerRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(vote_ledger_schema_1.VoteLedger.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VoteLedgerRepository);
//# sourceMappingURL=vote-ledger.repository.js.map
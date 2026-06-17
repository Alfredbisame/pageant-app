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
exports.ContestantRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const contestant_schema_1 = require("../../database/schemas/contestant.schema");
const base_repository_1 = require("./base.repository");
const pagination_1 = require("../../common/utils/pagination");
let ContestantRepository = class ContestantRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async findActiveList(query) {
        const { page, limit, skip } = (0, pagination_1.getPagination)(query);
        const filter = { isActive: true };
        if (query.level) {
            filter.level = query.level;
        }
        if (query.search) {
            filter.$text = { $search: query.search };
        }
        const sortMap = {
            votes: { voteCount: -1 },
            name: { displayName: 1 },
            entry: { entryNumber: 1 },
        };
        const sort = sortMap[query.sort ?? 'votes'];
        const [data, total] = await Promise.all([
            this.model.find(filter).sort(sort).skip(skip).limit(limit).exec(),
            this.model.countDocuments(filter).exec(),
        ]);
        return { data, total, page, limit };
    }
    incrementVoteCount(id, votes) {
        return this.model
            .findByIdAndUpdate(id, { $inc: { voteCount: votes } }, { new: true })
            .exec();
    }
    findLeaderboard(limit, offset = 0) {
        return this.model
            .find({ isActive: true })
            .sort({ voteCount: -1, entryNumber: 1 })
            .skip(offset)
            .limit(limit)
            .exec();
    }
};
exports.ContestantRepository = ContestantRepository;
exports.ContestantRepository = ContestantRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(contestant_schema_1.Contestant.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ContestantRepository);
//# sourceMappingURL=contestant.repository.js.map
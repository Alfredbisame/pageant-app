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
exports.PrizeRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const prize_schema_1 = require("../../database/schemas/prize.schema");
const base_repository_1 = require("./base.repository");
const rewards_section_repository_1 = require("./rewards-section.repository");
let PrizeRepository = class PrizeRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async findActiveSorted() {
        return this.model
            .find({ rewardsSectionId: rewards_section_repository_1.REWARDS_SINGLETON_ID, isActive: true })
            .sort({ displayOrder: 1 })
            .exec();
    }
    async findAllSorted() {
        return this.model
            .find({ rewardsSectionId: rewards_section_repository_1.REWARDS_SINGLETON_ID })
            .sort({ displayOrder: 1 })
            .exec();
    }
};
exports.PrizeRepository = PrizeRepository;
exports.PrizeRepository = PrizeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(prize_schema_1.Prize.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PrizeRepository);
//# sourceMappingURL=prize.repository.js.map
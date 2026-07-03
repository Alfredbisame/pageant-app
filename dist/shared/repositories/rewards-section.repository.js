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
exports.RewardsSectionRepository = exports.REWARDS_SINGLETON_ID = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rewards_section_schema_1 = require("../../database/schemas/rewards-section.schema");
const base_repository_1 = require("./base.repository");
exports.REWARDS_SINGLETON_ID = new mongoose_2.Types.ObjectId('60d5ec498c8f2a1b48b9487d');
let RewardsSectionRepository = class RewardsSectionRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async getSingleton() {
        let config = await this.findById(exports.REWARDS_SINGLETON_ID.toString());
        if (!config) {
            config = await this.create({
                _id: exports.REWARDS_SINGLETON_ID,
                subtitle: 'Rewards',
                title: 'Grand Prizes',
                description: 'Celebrating excellence with rewards that change lives and empower families.',
            });
        }
        return config;
    }
};
exports.RewardsSectionRepository = RewardsSectionRepository;
exports.RewardsSectionRepository = RewardsSectionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rewards_section_schema_1.RewardsSection.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RewardsSectionRepository);
//# sourceMappingURL=rewards-section.repository.js.map
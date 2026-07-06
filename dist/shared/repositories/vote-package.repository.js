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
exports.VotePackageRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const vote_package_schema_1 = require("../../database/schemas/vote-package.schema");
const base_repository_1 = require("./base.repository");
let VotePackageRepository = class VotePackageRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    findActive() {
        return this.model.find({ isActive: true }).sort({ sortOrder: 1 }).exec();
    }
    async resolvePricePerVotePaise(fallback) {
        const packages = await this.findActive();
        if (!packages.length)
            return fallback;
        const maxRate = Math.max(...packages.map((pkg) => pkg.baseAmount / pkg.votes));
        return Math.ceil(maxRate);
    }
};
exports.VotePackageRepository = VotePackageRepository;
exports.VotePackageRepository = VotePackageRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(vote_package_schema_1.VotePackage.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VotePackageRepository);
//# sourceMappingURL=vote-package.repository.js.map
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
exports.HeroSectionRepository = exports.HERO_SINGLETON_ID = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hero_section_schema_1 = require("../../database/schemas/hero-section.schema");
const base_repository_1 = require("./base.repository");
exports.HERO_SINGLETON_ID = new mongoose_2.Types.ObjectId('60d5ec498c8f2a1b48b9487c');
let HeroSectionRepository = class HeroSectionRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async getSingleton() {
        let config = await this.findById(exports.HERO_SINGLETON_ID.toString());
        if (!config) {
            config = await this.create({
                _id: exports.HERO_SINGLETON_ID,
                titleMain: 'Discover Your Confidence,',
                titleHighlight: 'Be The Face of ELL.',
                description: 'Join us in celebrating a decade of achievement. Vote for the contestants who embody the spirit, confidence, and linguistic excellence of the English Language Learning community.',
            });
        }
        return config;
    }
};
exports.HeroSectionRepository = HeroSectionRepository;
exports.HeroSectionRepository = HeroSectionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(hero_section_schema_1.HomePageHero.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HeroSectionRepository);
//# sourceMappingURL=hero-section.repository.js.map
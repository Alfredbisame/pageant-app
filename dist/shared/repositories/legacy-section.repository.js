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
exports.LegacySectionRepository = exports.LEGACY_SINGLETON_ID = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const legacy_section_schema_1 = require("../../database/schemas/legacy-section.schema");
const base_repository_1 = require("./base.repository");
exports.LEGACY_SINGLETON_ID = new mongoose_2.Types.ObjectId('60d5ec498c8f2a1b48b9487e');
let LegacySectionRepository = class LegacySectionRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async getSingleton() {
        let config = await this.findById(exports.LEGACY_SINGLETON_ID.toString());
        if (!config) {
            config = await this.create({
                _id: exports.LEGACY_SINGLETON_ID,
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApTfsG2irhid8vjCCKvda-nx71Qk89uj7jVtg2IOCtDMxb7lDe090WyX04CmW_7U41eDAI0DXAXQUpm4gaihiC8Q0kzrcoMqeOm8X0hdU03qTiTajR2Olzeg5C-2bJdCpdFUPa_5-Hs5W5mDv1lzG4ymWAvggRzb7_S2UpdmGfFOa5zu8Pu53VLaTfEkcQ8JJmyMfB2aDf3QMqb_5Y_jIqYf4iwvUOMnG3gCjzL9yydQGoN9y2D9-X9WYy_mljUZ3YpvNjL6ZSxKI',
                imageAlt: 'Diverse group of students celebrating',
                subtitle: 'Our Legacy',
                title: 'A Decade of Excellence',
                description: 'For ten years, ELL has been more than just a language program; it has been a community of ambitious individuals striving for better futures. This pageant is a celebration of that journey, honoring those who have transformed their lives through dedication, hard work, and newfound confidence.',
                linkUrl: '/about',
                linkLabel: 'Read Our Story',
            });
        }
        return config;
    }
};
exports.LegacySectionRepository = LegacySectionRepository;
exports.LegacySectionRepository = LegacySectionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(legacy_section_schema_1.LegacySection.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LegacySectionRepository);
//# sourceMappingURL=legacy-section.repository.js.map
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
exports.AboutPageSchema = exports.AboutPage = exports.TimelineSectionSchema = exports.TimelineSection = exports.TeamSectionSchema = exports.TeamSection = exports.TeamMemberSchema = exports.TeamMember = exports.TimelineItemSchema = exports.TimelineItem = exports.ImpactStatSchema = exports.ImpactStat = exports.MissionVisionItemSchema = exports.MissionVisionItem = exports.HeroSectionSchema = exports.HeroSection = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let HeroSection = class HeroSection {
    backgroundImage;
    badgeText;
    headline;
    subtitle;
};
exports.HeroSection = HeroSection;
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], HeroSection.prototype, "backgroundImage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '10th ANNIVERSARY' }),
    __metadata("design:type", String)
], HeroSection.prototype, "badgeText", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'A Decade of Empowering Voices' }),
    __metadata("design:type", String)
], HeroSection.prototype, "headline", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], HeroSection.prototype, "subtitle", void 0);
exports.HeroSection = HeroSection = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], HeroSection);
exports.HeroSectionSchema = mongoose_1.SchemaFactory.createForClass(HeroSection);
let MissionVisionItem = class MissionVisionItem {
    icon;
    title;
    body;
};
exports.MissionVisionItem = MissionVisionItem;
__decorate([
    (0, mongoose_1.Prop)({ default: 'flag' }),
    __metadata("design:type", String)
], MissionVisionItem.prototype, "icon", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], MissionVisionItem.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], MissionVisionItem.prototype, "body", void 0);
exports.MissionVisionItem = MissionVisionItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], MissionVisionItem);
exports.MissionVisionItemSchema = mongoose_1.SchemaFactory.createForClass(MissionVisionItem);
let ImpactStat = class ImpactStat {
    value;
    label;
    description;
};
exports.ImpactStat = ImpactStat;
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ImpactStat.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ImpactStat.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ImpactStat.prototype, "description", void 0);
exports.ImpactStat = ImpactStat = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ImpactStat);
exports.ImpactStatSchema = mongoose_1.SchemaFactory.createForClass(ImpactStat);
let TimelineItem = class TimelineItem {
    year;
    title;
    description;
    side;
    accent;
    sortOrder;
};
exports.TimelineItem = TimelineItem;
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], TimelineItem.prototype, "year", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], TimelineItem.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], TimelineItem.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'left', enum: ['left', 'right'] }),
    __metadata("design:type", String)
], TimelineItem.prototype, "side", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'primary', enum: ['primary', 'secondary', 'anniversary'] }),
    __metadata("design:type", String)
], TimelineItem.prototype, "accent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], TimelineItem.prototype, "sortOrder", void 0);
exports.TimelineItem = TimelineItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], TimelineItem);
exports.TimelineItemSchema = mongoose_1.SchemaFactory.createForClass(TimelineItem);
let TeamMember = class TeamMember {
    name;
    role;
    image;
    sortOrder;
};
exports.TeamMember = TeamMember;
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], TeamMember.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], TeamMember.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], TeamMember.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], TeamMember.prototype, "sortOrder", void 0);
exports.TeamMember = TeamMember = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], TeamMember);
exports.TeamMemberSchema = mongoose_1.SchemaFactory.createForClass(TeamMember);
let TeamSection = class TeamSection {
    heading;
    subtitle;
    members;
};
exports.TeamSection = TeamSection;
__decorate([
    (0, mongoose_1.Prop)({ default: 'Meet the Organizers' }),
    __metadata("design:type", String)
], TeamSection.prototype, "heading", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], TeamSection.prototype, "subtitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.TeamMemberSchema], default: [] }),
    __metadata("design:type", Array)
], TeamSection.prototype, "members", void 0);
exports.TeamSection = TeamSection = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], TeamSection);
exports.TeamSectionSchema = mongoose_1.SchemaFactory.createForClass(TeamSection);
let TimelineSection = class TimelineSection {
    heading;
    subtitle;
    items;
};
exports.TimelineSection = TimelineSection;
__decorate([
    (0, mongoose_1.Prop)({ default: 'Our Journey' }),
    __metadata("design:type", String)
], TimelineSection.prototype, "heading", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], TimelineSection.prototype, "subtitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.TimelineItemSchema], default: [] }),
    __metadata("design:type", Array)
], TimelineSection.prototype, "items", void 0);
exports.TimelineSection = TimelineSection = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], TimelineSection);
exports.TimelineSectionSchema = mongoose_1.SchemaFactory.createForClass(TimelineSection);
let AboutPage = class AboutPage {
    hero;
    missionVision;
    impactStats;
    timeline;
    team;
    createdAt;
    updatedAt;
};
exports.AboutPage = AboutPage;
__decorate([
    (0, mongoose_1.Prop)({ type: exports.HeroSectionSchema, default: () => ({}) }),
    __metadata("design:type", HeroSection)
], AboutPage.prototype, "hero", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.MissionVisionItemSchema], default: [] }),
    __metadata("design:type", Array)
], AboutPage.prototype, "missionVision", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.ImpactStatSchema], default: [] }),
    __metadata("design:type", Array)
], AboutPage.prototype, "impactStats", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.TimelineSectionSchema, default: () => ({}) }),
    __metadata("design:type", TimelineSection)
], AboutPage.prototype, "timeline", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.TeamSectionSchema, default: () => ({}) }),
    __metadata("design:type", TeamSection)
], AboutPage.prototype, "team", void 0);
exports.AboutPage = AboutPage = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'about_page' })
], AboutPage);
exports.AboutPageSchema = mongoose_1.SchemaFactory.createForClass(AboutPage);
//# sourceMappingURL=about-page.schema.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const schemas_1 = require("./schemas");
const schemaModels = [
    { name: schemas_1.User.name, schema: schemas_1.UserSchema },
    { name: schemas_1.Contestant.name, schema: schemas_1.ContestantSchema },
    { name: schemas_1.VotePackage.name, schema: schemas_1.VotePackageSchema },
    { name: schemas_1.Payment.name, schema: schemas_1.PaymentSchema },
    { name: schemas_1.VoteLedger.name, schema: schemas_1.VoteLedgerSchema },
    { name: schemas_1.EventConfig.name, schema: schemas_1.EventConfigSchema },
    { name: schemas_1.AuditLog.name, schema: schemas_1.AuditLogSchema },
    { name: schemas_1.AboutPage.name, schema: schemas_1.AboutPageSchema },
    { name: schemas_1.HomePageHero.name, schema: schemas_1.HomePageHeroSchema },
    { name: schemas_1.RewardsSection.name, schema: schemas_1.RewardsSectionSchema },
    { name: schemas_1.Prize.name, schema: schemas_1.PrizeSchema },
    { name: schemas_1.LegacySection.name, schema: schemas_1.LegacySectionSchema },
];
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    uri: configService.getOrThrow('mongodbUri'),
                }),
            }),
            mongoose_1.MongooseModule.forFeature(schemaModels),
        ],
        exports: [mongoose_1.MongooseModule],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map
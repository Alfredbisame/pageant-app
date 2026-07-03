import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import {
  AuditLog,
  AuditLogSchema,
  Contestant,
  ContestantSchema,
  EventConfig,
  EventConfigSchema,
  Payment,
  PaymentSchema,
  User,
  UserSchema,
  VoteLedger,
  VoteLedgerSchema,
  VotePackage,
  VotePackageSchema,
  AboutPage,
  AboutPageSchema,
  HomePageHero,
  HomePageHeroSchema,
  RewardsSection,
  RewardsSectionSchema,
  Prize,
  PrizeSchema,
  LegacySection,
  LegacySectionSchema,
} from './schemas';

const schemaModels = [
  { name: User.name, schema: UserSchema },
  { name: Contestant.name, schema: ContestantSchema },
  { name: VotePackage.name, schema: VotePackageSchema },
  { name: Payment.name, schema: PaymentSchema },
  { name: VoteLedger.name, schema: VoteLedgerSchema },
  { name: EventConfig.name, schema: EventConfigSchema },
  { name: AuditLog.name, schema: AuditLogSchema },
  { name: AboutPage.name, schema: AboutPageSchema },
  { name: HomePageHero.name, schema: HomePageHeroSchema },
  { name: RewardsSection.name, schema: RewardsSectionSchema },
  { name: Prize.name, schema: PrizeSchema },
  { name: LegacySection.name, schema: LegacySectionSchema },
];

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('mongodbUri'),
      }),
    }),
    MongooseModule.forFeature(schemaModels),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}

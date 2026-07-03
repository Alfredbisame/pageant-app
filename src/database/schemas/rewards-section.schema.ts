import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RewardsSectionDocument = HydratedDocument<RewardsSection>;

@Schema({ timestamps: true, collection: 'rewards_sections' })
export class RewardsSection {
  @Prop({ default: 'Rewards' })
  subtitle!: string;

  @Prop({ default: 'Grand Prizes' })
  title!: string;

  @Prop({ required: true })
  description!: string;

  createdAt!: Date;
  updatedAt!: Date;
}

export const RewardsSectionSchema =
  SchemaFactory.createForClass(RewardsSection);

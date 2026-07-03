import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum PrizeVariant {
  GOLD = 'gold',
  GREEN = 'green',
}

export type PrizeDocument = HydratedDocument<Prize>;

@Schema({ timestamps: true, collection: 'prizes' })
export class Prize {
  @Prop({ required: true })
  icon!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  amount!: string;

  @Prop({ required: true })
  subtitle!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ type: String, enum: PrizeVariant, default: PrizeVariant.GOLD })
  variant!: PrizeVariant;

  @Prop({ default: 0 })
  displayOrder!: number;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'RewardsSection', required: true })
  rewardsSectionId!: Types.ObjectId;

  createdAt!: Date;
  updatedAt!: Date;
}

export const PrizeSchema = SchemaFactory.createForClass(Prize);
PrizeSchema.index({ displayOrder: 1, isActive: 1 });

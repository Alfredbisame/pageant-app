import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VotePackageDocument = HydratedDocument<VotePackage>;

@Schema({ timestamps: true, collection: 'vote_packages' })
export class VotePackage {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, min: 1 })
  votes!: number;

  @Prop({ required: true, min: 1 })
  baseAmount!: number;

  @Prop({ default: 'GHS' })
  currency!: string;

  @Prop({ default: false })
  isPopular!: boolean;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ default: 0 })
  sortOrder!: number;

  createdAt!: Date;
  updatedAt!: Date;
}

export const VotePackageSchema = SchemaFactory.createForClass(VotePackage);

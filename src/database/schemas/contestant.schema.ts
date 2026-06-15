import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ContestantLevel } from '../../common/constants';

export type ContestantDocument = HydratedDocument<Contestant>;

@Schema({ timestamps: true, collection: 'contestants' })
export class Contestant {
  @Prop({ required: true, unique: true })
  entryNumber!: number;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug!: string;

  @Prop({ required: true, trim: true })
  displayName!: string;

  @Prop()
  bio?: string;

  @Prop({ type: String, enum: ContestantLevel, required: true })
  level!: ContestantLevel;

  @Prop({ required: true })
  avatarUrl!: string;

  @Prop({ default: 0, min: 0 })
  voteCount!: number;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy!: Types.ObjectId;

  createdAt!: Date;
  updatedAt!: Date;
}

export const ContestantSchema = SchemaFactory.createForClass(Contestant);
ContestantSchema.index({ entryNumber: 1 }, { unique: true });
ContestantSchema.index({ slug: 1 }, { unique: true });
ContestantSchema.index({ voteCount: -1 });
ContestantSchema.index({ displayName: 'text' });

export type ContestantModel = Contestant & { _id: Types.ObjectId };

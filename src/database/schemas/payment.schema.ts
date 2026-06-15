import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PaymentProvider, PaymentStatus } from '../../common/constants';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true, collection: 'payments' })
export class Payment {
  @Prop({ required: true, unique: true })
  reference!: string;

  @Prop({ required: true, unique: true })
  providerReference!: string;

  @Prop({ type: String, enum: PaymentProvider, required: true })
  provider!: PaymentProvider;

  @Prop({
    type: String,
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Prop({ required: true, min: 0 })
  baseAmount!: number;

  @Prop({ required: true, min: 0 })
  platformFee!: number;

  @Prop({ required: true, min: 0 })
  totalAmount!: number;

  @Prop({ default: 'GHS' })
  currency!: string;

  @Prop({ type: Types.ObjectId, ref: 'Contestant', required: true })
  contestantId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'VotePackage' })
  packageId?: Types.ObjectId;

  @Prop({ min: 0 })
  customAmount?: number;

  @Prop({ required: true, min: 1 })
  votesPurchased!: number;

  @Prop({ required: true, trim: true })
  voterName!: string;

  @Prop({ required: true, lowercase: true, trim: true })
  voterEmail!: string;

  @Prop({ default: false })
  anonymous!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId?: Types.ObjectId;

  @Prop({ type: Object, default: {} })
  providerPayload!: Record<string, unknown>;

  @Prop()
  verifiedAt?: Date;

  createdAt!: Date;
  updatedAt!: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
PaymentSchema.index({ providerReference: 1 }, { unique: true });
PaymentSchema.index({ voterEmail: 1, createdAt: -1 });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { VoteLedgerType } from '@/common/constants';

export type VoteLedgerDocument = HydratedDocument<VoteLedger>;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'vote_ledger',
})
export class VoteLedger {
  @Prop({ type: Types.ObjectId, ref: 'Payment', sparse: true })
  paymentId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Contestant', required: true })
  contestantId!: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  votes!: number;

  @Prop({ type: String, enum: VoteLedgerType, default: VoteLedgerType.CREDIT })
  type!: VoteLedgerType;

  @Prop({ trim: true })
  reason?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  adjustedByUserId?: Types.ObjectId;

  @Prop({ trim: true })
  providerReference?: string;

  createdAt!: Date;
}

export const VoteLedgerSchema = SchemaFactory.createForClass(VoteLedger);
VoteLedgerSchema.index({ paymentId: 1 }, { unique: true, sparse: true });
VoteLedgerSchema.index({ providerReference: 1 }, { sparse: true });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { VoteLedgerType } from '../../common/constants';

export type VoteLedgerDocument = HydratedDocument<VoteLedger>;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'vote_ledger',
})
export class VoteLedger {
  @Prop({ type: Types.ObjectId, ref: 'Payment', required: true, unique: true })
  paymentId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Contestant', required: true })
  contestantId!: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  votes!: number;

  @Prop({ type: String, enum: VoteLedgerType, default: VoteLedgerType.CREDIT })
  type!: VoteLedgerType;

  createdAt!: Date;
}

export const VoteLedgerSchema = SchemaFactory.createForClass(VoteLedger);
VoteLedgerSchema.index({ paymentId: 1 }, { unique: true });

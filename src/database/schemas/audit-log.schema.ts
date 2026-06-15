import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AuditLogDocument = HydratedDocument<AuditLog>;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'audit_logs',
})
export class AuditLog {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  actorId?: Types.ObjectId;

  @Prop({ required: true })
  action!: string;

  @Prop({ required: true })
  entity!: string;

  @Prop({ type: Types.ObjectId })
  entityId?: Types.ObjectId;

  @Prop({ type: Object, default: {} })
  summary!: Record<string, unknown>;

  createdAt!: Date;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
AuditLogSchema.index({ entity: 1, entityId: 1, createdAt: -1 });

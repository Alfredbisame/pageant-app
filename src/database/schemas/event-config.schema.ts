import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventConfigDocument = HydratedDocument<EventConfig>;

@Schema({ timestamps: true, collection: 'event_config' })
export class EventConfig {
  @Prop({ default: false })
  votingEnabled!: boolean;

  @Prop()
  votingStartsAt?: Date;

  @Prop()
  votingEndsAt?: Date;

  @Prop({ default: 0.025, min: 0, max: 1 })
  platformFeeRate!: number;

  @Prop({ min: 0 })
  dailyVoteLimitPerVoter?: number;

  createdAt!: Date;
  updatedAt!: Date;
}

export const EventConfigSchema = SchemaFactory.createForClass(EventConfig);

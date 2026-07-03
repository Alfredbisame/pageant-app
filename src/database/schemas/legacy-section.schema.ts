import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LegacySectionDocument = HydratedDocument<LegacySection>;

@Schema({ timestamps: true, collection: 'legacy_sections' })
export class LegacySection {
  @Prop({ required: true })
  imageUrl!: string;

  @Prop({ required: true })
  imageAlt!: string;

  @Prop({ default: 'Our Legacy' })
  subtitle!: string;

  @Prop({ default: 'A Decade of Excellence' })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ default: '/about' })
  linkUrl!: string;

  @Prop({ default: 'Read Our Story' })
  linkLabel!: string;

  createdAt!: Date;
  updatedAt!: Date;
}

export const LegacySectionSchema = SchemaFactory.createForClass(LegacySection);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HomePageHeroDocument = HydratedDocument<HomePageHero>;

@Schema({ timestamps: true, collection: 'hero_sections' })
export class HomePageHero {
  @Prop({ required: true })
  titleMain!: string;

  @Prop({ required: true })
  titleHighlight!: string;

  @Prop({ required: true })
  description!: string;

  createdAt!: Date;
  updatedAt!: Date;
}

export const HomePageHeroSchema = SchemaFactory.createForClass(HomePageHero);

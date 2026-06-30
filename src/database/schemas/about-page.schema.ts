import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/* ────────── Sub-schemas ────────── */

@Schema({ _id: false })
export class HeroSection {
  @Prop({ default: '' })
  backgroundImage!: string;

  @Prop({ default: '10th ANNIVERSARY' })
  badgeText!: string;

  @Prop({ default: 'A Decade of Empowering Voices' })
  headline!: string;

  @Prop({ default: '' })
  subtitle!: string;
}

export const HeroSectionSchema = SchemaFactory.createForClass(HeroSection);

@Schema({ _id: false })
export class MissionVisionItem {
  @Prop({ default: 'flag' })
  icon!: string;

  @Prop({ default: '' })
  title!: string;

  @Prop({ default: '' })
  body!: string;
}

export const MissionVisionItemSchema =
  SchemaFactory.createForClass(MissionVisionItem);

@Schema({ _id: false })
export class ImpactStat {
  @Prop({ default: '' })
  value!: string;

  @Prop({ default: '' })
  label!: string;

  @Prop({ default: '' })
  description!: string;
}

export const ImpactStatSchema = SchemaFactory.createForClass(ImpactStat);

@Schema({ _id: false })
export class TimelineItem {
  @Prop({ default: '' })
  year!: string;

  @Prop({ default: '' })
  title!: string;

  @Prop({ default: '' })
  description!: string;

  @Prop({ default: 'left', enum: ['left', 'right'] })
  side!: string;

  @Prop({ default: 'primary', enum: ['primary', 'secondary', 'anniversary'] })
  accent!: string;

  @Prop({ default: 0 })
  sortOrder!: number;
}

export const TimelineItemSchema = SchemaFactory.createForClass(TimelineItem);

@Schema({ _id: false })
export class TeamMember {
  @Prop({ default: '' })
  name!: string;

  @Prop({ default: '' })
  role!: string;

  @Prop({ default: '' })
  image!: string;

  @Prop({ default: 0 })
  sortOrder!: number;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);

@Schema({ _id: false })
export class TeamSection {
  @Prop({ default: 'Meet the Organizers' })
  heading!: string;

  @Prop({ default: '' })
  subtitle!: string;

  @Prop({ type: [TeamMemberSchema], default: [] })
  members!: TeamMember[];
}

export const TeamSectionSchema = SchemaFactory.createForClass(TeamSection);

@Schema({ _id: false })
export class TimelineSection {
  @Prop({ default: 'Our Journey' })
  heading!: string;

  @Prop({ default: '' })
  subtitle!: string;

  @Prop({ type: [TimelineItemSchema], default: [] })
  items!: TimelineItem[];
}

export const TimelineSectionSchema =
  SchemaFactory.createForClass(TimelineSection);

/* ────────── Root document ────────── */

export type AboutPageDocument = HydratedDocument<AboutPage>;

@Schema({ timestamps: true, collection: 'about_page' })
export class AboutPage {
  @Prop({ type: HeroSectionSchema, default: () => ({}) })
  hero!: HeroSection;

  @Prop({ type: [MissionVisionItemSchema], default: [] })
  missionVision!: MissionVisionItem[];

  @Prop({ type: [ImpactStatSchema], default: [] })
  impactStats!: ImpactStat[];

  @Prop({ type: TimelineSectionSchema, default: () => ({}) })
  timeline!: TimelineSection;

  @Prop({ type: TeamSectionSchema, default: () => ({}) })
  team!: TeamSection;

  createdAt!: Date;
  updatedAt!: Date;
}

export const AboutPageSchema = SchemaFactory.createForClass(AboutPage);

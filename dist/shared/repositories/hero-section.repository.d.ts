import { Model, Types } from 'mongoose';
import { HomePageHeroDocument } from "../../database/schemas/hero-section.schema";
import { BaseRepository } from './base.repository';
export declare const HERO_SINGLETON_ID: Types.ObjectId;
export declare class HeroSectionRepository extends BaseRepository<HomePageHeroDocument> {
    constructor(model: Model<HomePageHeroDocument>);
    getSingleton(): Promise<HomePageHeroDocument>;
}

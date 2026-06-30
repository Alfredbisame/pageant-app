import { Model } from 'mongoose';
import { AboutPageDocument } from "../../database/schemas/about-page.schema";
import { BaseRepository } from './base.repository';
export declare class AboutPageRepository extends BaseRepository<AboutPageDocument> {
    constructor(model: Model<AboutPageDocument>);
    getSingleton(): Promise<AboutPageDocument>;
}

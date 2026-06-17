import { Document, Model, UpdateQuery } from 'mongoose';
export type MongoFilter = Record<string, unknown>;
export declare abstract class BaseRepository<T extends Document> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    findById(id: string): Promise<T | null>;
    findOne(filter: MongoFilter): Promise<T | null>;
    find(filter?: MongoFilter): Promise<T[]>;
    create(data: Partial<T>): Promise<T>;
    updateById(id: string, data: UpdateQuery<T>): Promise<T | null>;
    deleteById(id: string): Promise<T | null>;
    count(filter?: MongoFilter): Promise<number>;
}

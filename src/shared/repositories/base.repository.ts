import { Document, Model, UpdateQuery } from 'mongoose';

// Mongoose 9 filter typing — use loose filter for repository queries
export type MongoFilter = Record<string, unknown>;

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(filter: MongoFilter): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async find(filter: MongoFilter = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async updateById(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, data, { returnDocument: 'after' })
      .exec();
  }

  async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async count(filter: MongoFilter = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }
}

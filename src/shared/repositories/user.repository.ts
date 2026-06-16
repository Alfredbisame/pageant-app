import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '@/database/schemas/user.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel('User') model: Model<UserDocument>) {
    super(model);
  }

  findByEmail(email: string) {
    return this.model.findOne({ email: email.toLowerCase() }).exec();
  }

  findPaginated(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const deletedStatus = 'deleted';
    const filter = {
      status: { $ne: deletedStatus },
    } as unknown as Parameters<typeof this.model.find>[0];

    const countFilter = {
      status: { $ne: deletedStatus },
    } as unknown as Parameters<typeof this.model.countDocuments>[0];
    return Promise.all([
      this.model
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.model.countDocuments(countFilter).exec(),
    ]);
  }
}

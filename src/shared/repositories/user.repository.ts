import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserStatus } from '../../common/constants';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel(User.name) model: Model<UserDocument>) {
    super(model);
  }

  findByEmail(email: string) {
    return this.model.findOne({ email: email.toLowerCase() }).exec();
  }

  findPaginated(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return Promise.all([
      this.model
        .find({ status: { $ne: UserStatus.DELETED } })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.model.countDocuments({ status: { $ne: UserStatus.DELETED } }).exec(),
    ]);
  }
}

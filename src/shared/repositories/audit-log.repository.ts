import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AuditLog,
  AuditLogDocument,
} from '../../database/schemas/audit-log.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class AuditLogRepository extends BaseRepository<AuditLogDocument> {
  constructor(@InjectModel(AuditLog.name) model: Model<AuditLogDocument>) {
    super(model);
  }
}

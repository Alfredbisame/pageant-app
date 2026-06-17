import { Model } from 'mongoose';
import { AuditLogDocument } from "../../database/schemas/audit-log.schema";
import { BaseRepository } from './base.repository';
export declare class AuditLogRepository extends BaseRepository<AuditLogDocument> {
    constructor(model: Model<AuditLogDocument>);
}

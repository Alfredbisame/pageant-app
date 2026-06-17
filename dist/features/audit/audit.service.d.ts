import { AuditLogRepository } from "../../shared/repositories/audit-log.repository";
export interface AuditLogInput {
    actorId?: string;
    action: string;
    entity: string;
    entityId?: string;
    summary?: Record<string, unknown>;
}
export declare class AuditService {
    private readonly auditLogRepository;
    constructor(auditLogRepository: AuditLogRepository);
    log(input: AuditLogInput): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas").AuditLog, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas").AuditLog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}

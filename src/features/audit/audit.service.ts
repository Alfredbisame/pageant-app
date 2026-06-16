import { Injectable } from '@nestjs/common';
import { AuditLogRepository } from '@/shared/repositories/audit-log.repository';

export interface AuditLogInput {
  actorId?: string;
  action: string;
  entity: string;
  entityId?: string;
  summary?: Record<string, unknown>;
}

@Injectable()
export class AuditService {
  constructor(private readonly auditLogRepository: AuditLogRepository) {}

  log(input: AuditLogInput) {
    return this.auditLogRepository.create({
      actorId: input.actorId,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      summary: input.summary ?? {},
    } as never);
  }
}

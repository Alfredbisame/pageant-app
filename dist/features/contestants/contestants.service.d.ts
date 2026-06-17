import { ContestantRepository } from "../../shared/repositories/contestant.repository";
import type { StorageService } from "../../shared/storage/storage.interface";
import { ContestantQueryDto, CreateContestantDto, UpdateContestantDto } from './dto/contestants.dto';
import { AuthenticatedUser } from "../../common/types";
import { AuditService } from "../audit/audit.service";
export declare class ContestantsService {
    private readonly contestantRepository;
    private readonly storage;
    private readonly auditService;
    constructor(contestantRepository: ContestantRepository, storage: StorageService, auditService: AuditService);
    findAll(query: ContestantQueryDto): Promise<{
        data: {
            id: string;
            name: string;
            displayName: string;
            entryNumber: number;
            level: string;
            bio: string | undefined;
            image: string;
            avatarUrl: string;
            votes: number;
            slug: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        displayName: string;
        entryNumber: number;
        level: string;
        bio: string | undefined;
        image: string;
        avatarUrl: string;
        votes: number;
        slug: string;
    }>;
    create(dto: CreateContestantDto, file: Express.Multer.File, user: AuthenticatedUser): Promise<{
        id: string;
        name: string;
        displayName: string;
        entryNumber: number;
        level: string;
        bio: string | undefined;
        image: string;
        avatarUrl: string;
        votes: number;
        slug: string;
    }>;
    update(id: string, dto: UpdateContestantDto, user: AuthenticatedUser): Promise<{
        id: string;
        name: string;
        displayName: string;
        entryNumber: number;
        level: string;
        bio: string | undefined;
        image: string;
        avatarUrl: string;
        votes: number;
        slug: string;
    }>;
    uploadAvatar(id: string, file: Express.Multer.File, user: AuthenticatedUser): Promise<{
        id: string;
        name: string;
        displayName: string;
        entryNumber: number;
        level: string;
        bio: string | undefined;
        image: string;
        avatarUrl: string;
        votes: number;
        slug: string;
    }>;
    softDelete(id: string, user: AuthenticatedUser): Promise<{
        success: boolean;
    }>;
    private toPublic;
}

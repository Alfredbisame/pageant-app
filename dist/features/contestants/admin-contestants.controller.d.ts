import { ContestantsService } from './contestants.service';
import { CreateContestantDto, UpdateContestantDto } from './dto/contestants.dto';
import type { AuthenticatedUser } from "../../common/types";
export declare class AdminContestantsController {
    private readonly contestantsService;
    constructor(contestantsService: ContestantsService);
    create(dto: CreateContestantDto, file: Express.Multer.File | undefined, user: AuthenticatedUser): Promise<{
        id: string;
        name: string;
        displayName: string;
        entryNumber: number;
        level: string | undefined;
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
        level: string | undefined;
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
        level: string | undefined;
        bio: string | undefined;
        image: string;
        avatarUrl: string;
        votes: number;
        slug: string;
    }>;
    remove(id: string, user: AuthenticatedUser): Promise<{
        success: boolean;
    }>;
}

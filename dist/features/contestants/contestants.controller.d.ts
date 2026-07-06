import { ContestantsService } from './contestants.service';
import { ContestantQueryDto } from './dto/contestants.dto';
export declare class ContestantsController {
    private readonly contestantsService;
    constructor(contestantsService: ContestantsService);
    findAll(query: ContestantQueryDto): Promise<{
        data: {
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
        level: string | undefined;
        bio: string | undefined;
        image: string;
        avatarUrl: string;
        votes: number;
        slug: string;
    }>;
}

import { VotePackagesService } from './vote-packages.service';
import { CreateVotePackageDto, UpdateVotePackageDto } from './dto/vote-packages.dto';
export declare class AdminVotePackagesController {
    private readonly votePackagesService;
    constructor(votePackagesService: VotePackagesService);
    create(dto: CreateVotePackageDto): Promise<{
        id: string;
        name: string;
        votes: number;
        baseAmount: number;
        currency: string;
        isPopular: boolean;
        sortOrder: number;
    }>;
    update(id: string, dto: UpdateVotePackageDto): Promise<{
        id: string;
        name: string;
        votes: number;
        baseAmount: number;
        currency: string;
        isPopular: boolean;
        sortOrder: number;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}

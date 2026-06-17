import { VotePackageRepository } from "../../shared/repositories/vote-package.repository";
import { CreateVotePackageDto, UpdateVotePackageDto } from './dto/vote-packages.dto';
export declare class VotePackagesService {
    private readonly votePackageRepository;
    constructor(votePackageRepository: VotePackageRepository);
    findActive(): Promise<{
        id: string;
        name: string;
        votes: number;
        baseAmount: number;
        currency: string;
        isPopular: boolean;
        sortOrder: number;
    }[]>;
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
    softDelete(id: string): Promise<{
        success: boolean;
    }>;
    private toPublic;
}

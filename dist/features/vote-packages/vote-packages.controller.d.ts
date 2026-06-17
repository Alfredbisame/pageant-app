import { VotePackagesService } from './vote-packages.service';
export declare class VotePackagesController {
    private readonly votePackagesService;
    constructor(votePackagesService: VotePackagesService);
    findActive(): Promise<{
        id: string;
        name: string;
        votes: number;
        baseAmount: number;
        currency: string;
        isPopular: boolean;
        sortOrder: number;
    }[]>;
}

export declare class CreateVotePackageDto {
    name: string;
    votes: number;
    baseAmount: number;
    isPopular?: boolean;
    sortOrder?: number;
}
export declare class UpdateVotePackageDto {
    name?: string;
    votes?: number;
    baseAmount?: number;
    isPopular?: boolean;
    isActive?: boolean;
    sortOrder?: number;
}

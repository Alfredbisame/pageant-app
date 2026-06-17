import { ContestantLevel } from "../../../common/constants";
export declare class CreateContestantDto {
    displayName: string;
    entryNumber: number;
    level: ContestantLevel;
    bio?: string;
}
export declare class UpdateContestantDto {
    displayName?: string;
    entryNumber?: number;
    level?: ContestantLevel;
    bio?: string;
}
export declare class ContestantQueryDto {
    search?: string;
    level?: ContestantLevel;
    sort?: 'votes' | 'name' | 'entry';
    page?: number;
    limit?: number;
}

export declare class TeamMemberDto {
    name: string;
    role: string;
    image: string;
    sortOrder?: number;
}
export declare class UpdateTeamDto {
    heading?: string;
    subtitle?: string;
    members: TeamMemberDto[];
}

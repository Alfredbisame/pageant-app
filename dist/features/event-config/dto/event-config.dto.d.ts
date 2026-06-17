export declare class PublicEventConfigDto {
    eventName: string;
    votingEnabled: boolean;
    votingStartsAt?: string;
    votingEndsAt?: string;
    isVotingOpen: boolean;
}
export declare class UpdateEventConfigDto {
    eventName?: string;
    votingEnabled?: boolean;
    votingStartsAt?: string;
    votingEndsAt?: string;
    platformFeeRate?: number;
    dailyVoteLimitPerVoter?: number;
}

export declare class TimelineItemDto {
    year: string;
    title: string;
    description: string;
    side: string;
    accent: string;
    sortOrder?: number;
}
export declare class UpdateTimelineDto {
    heading?: string;
    subtitle?: string;
    items: TimelineItemDto[];
}

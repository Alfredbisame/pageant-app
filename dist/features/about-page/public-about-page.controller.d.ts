import { AboutPageService } from './about-page.service';
export declare class PublicAboutPageController {
    private readonly aboutPageService;
    constructor(aboutPageService: AboutPageService);
    getPublic(): Promise<{
        hero: {
            backgroundImage: string;
            badgeText: string;
            headline: string;
            subtitle: string;
        };
        missionVision: {
            icon: string;
            title: string;
            body: string;
        }[];
        impactStats: {
            value: string;
            label: string;
            description: string;
        }[];
        timeline: {
            heading: string;
            subtitle: string;
            items: {
                year: string;
                title: string;
                description: string;
                side: string;
                accent: string;
                sortOrder: number;
            }[];
        };
        team: {
            heading: string;
            subtitle: string;
            members: {
                name: string;
                role: string;
                image: string;
                sortOrder: number;
            }[];
        };
    }>;
}

import { HomePageService } from './home-page.service';
export declare class HomePageController {
    private readonly homePageService;
    constructor(homePageService: HomePageService);
    getPublic(): Promise<{
        hero: {
            titleMain: string;
            titleHighlight: string;
            description: string;
        };
        rewards: {
            subtitle: string;
            title: string;
            description: string;
            prizes: {
                id: string;
                icon: string;
                title: string;
                amount: string;
                subtitle: string;
                description: string;
                variant: import("../../database/schemas").PrizeVariant;
            }[];
        };
        legacy: {
            imageUrl: string;
            imageAlt: string;
            subtitle: string;
            title: string;
            description: string;
            linkUrl: string;
            linkLabel: string;
        };
    }>;
}

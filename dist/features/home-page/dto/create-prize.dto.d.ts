import { PrizeVariant } from "../../../database/schemas/prize.schema";
export declare class CreatePrizeDto {
    icon: string;
    title: string;
    amount: string;
    subtitle: string;
    description: string;
    variant: PrizeVariant;
    displayOrder?: number;
    isActive?: boolean;
}

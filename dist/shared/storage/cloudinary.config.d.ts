export interface CloudinaryCredentials {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
}
export declare function parseCloudinaryUrl(url: string): CloudinaryCredentials;
export declare function signCloudinaryParams(params: Record<string, string | number>, apiSecret: string): string;
export declare function extractPublicId(publicIdOrUrl: string): string;

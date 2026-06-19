export interface CloudinaryCredentials {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
}
export declare function parseCloudinaryUrl(url: string): CloudinaryCredentials;
export declare function resolveCloudinaryCredentials(input: {
    cloudinaryUrl?: string;
    cloudName?: string;
    apiKey?: string;
    apiSecret?: string;
}): CloudinaryCredentials;
export declare function resolveAssetFolder(rootFolder: string, subfolder?: string): string;
export type CloudinaryFolderMode = 'dynamic' | 'fixed';
export declare function signCloudinaryParams(params: Record<string, string | number>, apiSecret: string): string;
export declare function extractPublicId(publicIdOrUrl: string): string;

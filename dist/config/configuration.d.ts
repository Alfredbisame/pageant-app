declare const _default: () => {
    nodeEnv: string;
    port: number;
    apiPrefix: string;
    mongodbUri: string | undefined;
    jwt: {
        secret: string | undefined;
        refreshSecret: string | undefined;
        accessExpiresIn: string;
        refreshExpiresIn: string;
    };
    cors: {
        allowedOrigins: string[];
    };
    throttle: {
        ttl: number;
        limit: number;
    };
    storage: {
        driver: string;
        uploadDir: string;
        maxFileSizeMb: number;
        cloudinaryUrl: string | undefined;
        cloudinaryFolder: string;
    };
    payments: {
        paystackSecretKey: string | undefined;
        hubtelClientId: string | undefined;
        hubtelClientSecret: string | undefined;
        pricePerVotePaise: number;
    };
    event: {
        defaults: {
            eventName: string;
            votingEnabled: boolean;
            platformFeeRate: number;
        };
    };
    seed: {
        adminEmail: string | undefined;
        adminPassword: string | undefined;
        adminName: string;
    };
};
export default _default;

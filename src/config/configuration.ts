import { parseAllowedOrigins } from './cors.config';

export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3001', 10),
  apiPrefix: process.env.API_PREFIX ?? 'api/v1',
  mongodbUri: process.env.MONGODB_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
  },
  cors: {
    allowedOrigins: parseAllowedOrigins(process.env.CORS_ORIGINS ?? ''),
  },
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL ?? '60000', 10),
    limit: parseInt(process.env.THROTTLE_LIMIT ?? '100', 10),
  },
  storage: {
    driver: process.env.STORAGE_DRIVER ?? 'local',
    uploadDir: process.env.UPLOAD_DIR ?? 'uploads',
    maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB ?? '5', 10),
    cloudinaryUrl: process.env.CLOUDINARY_URL,
  },
  payments: {
    paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
    hubtelClientId: process.env.HUBTEL_CLIENT_ID,
    hubtelClientSecret: process.env.HUBTEL_CLIENT_SECRET,
    pricePerVotePaise: parseInt(process.env.PRICE_PER_VOTE_PAISE ?? '100', 10),
  },
  event: {
    defaults: {
      votingEnabled: false,
      platformFeeRate: 0.025,
    },
  },
  seed: {
    adminEmail: process.env.SEED_ADMIN_EMAIL,
    adminPassword: process.env.SEED_ADMIN_PASSWORD,
    adminName: process.env.SEED_ADMIN_NAME ?? 'System Admin',
  },
});

import * as Joi from 'joi';
import { parseAllowedOrigins } from './cors.config';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3001),
  API_PREFIX: Joi.string().default('api/v1'),
  MONGODB_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
  CORS_ORIGINS: Joi.string()
    .required()
    .custom((value: string, helpers) => {
      const origins = parseAllowedOrigins(value);
      if (origins.length === 0) {
        return helpers.error('any.invalid');
      }
      for (const origin of origins) {
        const { error } = Joi.string().uri().validate(origin);
        if (error) {
          return helpers.error('any.invalid');
        }
      }
      return value;
    })
    .messages({
      'any.invalid':
        'CORS_ORIGINS must be a comma-separated list of valid URIs (e.g. http://localhost:3000)',
    }),
  THROTTLE_TTL: Joi.number().default(60000),
  THROTTLE_LIMIT: Joi.number().default(100),
  STORAGE_DRIVER: Joi.string().valid('local', 'cloudinary').default('local'),
  UPLOAD_DIR: Joi.string().default('uploads'),
  MAX_FILE_SIZE_MB: Joi.number().default(5),
  CLOUDINARY_URL: Joi.string().optional().allow(''),
  PAYSTACK_SECRET_KEY: Joi.string().optional().allow(''),
  HUBTEL_CLIENT_ID: Joi.string().optional().allow(''),
  HUBTEL_CLIENT_SECRET: Joi.string().optional().allow(''),
  PRICE_PER_VOTE_PAISE: Joi.number().default(100),
  SEED_ADMIN_EMAIL: Joi.string().email().optional(),
  SEED_ADMIN_PASSWORD: Joi.string().optional(),
  SEED_ADMIN_NAME: Joi.string().default('System Admin'),
});

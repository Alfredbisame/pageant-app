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
  STORAGE_DRIVER: Joi.string().valid('local', 'cloudinary').default('cloudinary'),
  UPLOAD_DIR: Joi.string().default('uploads'),
  MAX_FILE_SIZE_MB: Joi.number().default(5),
  CLOUDINARY_URL: Joi.when('STORAGE_DRIVER', {
    is: 'cloudinary',
    then: Joi.string().optional().allow(''),
    otherwise: Joi.string().optional().allow(''),
  }),
  CLOUDINARY_CLOUD_NAME: Joi.string().optional().allow(''),
  CLOUDINARY_API_KEY: Joi.string().optional().allow(''),
  CLOUDINARY_API_SECRET: Joi.string().optional().allow(''),
  CLOUDINARY_FOLDER: Joi.string().default('ell-pageant'),
  CLOUDINARY_FOLDER_MODE: Joi.string()
    .valid('dynamic', 'fixed')
    .default('dynamic'),
  PAYSTACK_SECRET_KEY: Joi.string().optional().allow(''),
  HUBTEL_CLIENT_ID: Joi.string().optional().allow(''),
  HUBTEL_CLIENT_SECRET: Joi.string().optional().allow(''),
  PRICE_PER_VOTE_PAISE: Joi.number().default(100),
  SEED_ADMIN_EMAIL: Joi.string().email().optional(),
  SEED_ADMIN_PASSWORD: Joi.string().optional(),
  SEED_ADMIN_NAME: Joi.string().default('System Admin'),
}).custom((env, helpers) => {
  if (env.STORAGE_DRIVER !== 'cloudinary') {
    return env;
  }

  const hasUrl = Boolean(env.CLOUDINARY_URL);
  const hasParts =
    Boolean(env.CLOUDINARY_CLOUD_NAME) &&
    Boolean(env.CLOUDINARY_API_KEY) &&
    Boolean(env.CLOUDINARY_API_SECRET);

  if (!hasUrl && !hasParts) {
    return helpers.error('any.custom', {
      message:
        'Cloudinary storage requires CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET',
    });
  }

  return env;
});

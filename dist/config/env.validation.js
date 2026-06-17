"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.envValidationSchema = void 0;
const Joi = __importStar(require("joi"));
const cors_config_1 = require("./cors.config");
exports.envValidationSchema = Joi.object({
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
        .custom((value, helpers) => {
        const origins = (0, cors_config_1.parseAllowedOrigins)(value);
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
        'any.invalid': 'CORS_ORIGINS must be a comma-separated list of valid URIs (e.g. http://localhost:3000)',
    }),
    THROTTLE_TTL: Joi.number().default(60000),
    THROTTLE_LIMIT: Joi.number().default(100),
    STORAGE_DRIVER: Joi.string().valid('local', 'cloudinary').default('cloudinary'),
    UPLOAD_DIR: Joi.string().default('uploads'),
    MAX_FILE_SIZE_MB: Joi.number().default(5),
    CLOUDINARY_URL: Joi.when('STORAGE_DRIVER', {
        is: 'cloudinary',
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow(''),
    }),
    CLOUDINARY_FOLDER: Joi.string().default('ell-pageant'),
    PAYSTACK_SECRET_KEY: Joi.string().optional().allow(''),
    HUBTEL_CLIENT_ID: Joi.string().optional().allow(''),
    HUBTEL_CLIENT_SECRET: Joi.string().optional().allow(''),
    PRICE_PER_VOTE_PAISE: Joi.number().default(100),
    SEED_ADMIN_EMAIL: Joi.string().email().optional(),
    SEED_ADMIN_PASSWORD: Joi.string().optional(),
    SEED_ADMIN_NAME: Joi.string().default('System Admin'),
});
//# sourceMappingURL=env.validation.js.map
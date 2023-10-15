import "dotenv/config";
import * as Joi from "joi";
import type { ObjectSchema } from "joi";
import Config from "../interfaces/config";

// Env Schema
const envSchema: ObjectSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().required(),
    PORT: Joi.string().required(),
    BASE_URL: Joi.string().required(),
    CLIENT_BASE_URL: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
    ACCESS_TOKEN_SECRET: Joi.string().required(),
    ACCESS_TOKEN_EXPIRES_IN_MINUTES: Joi.string().required(),
    REFRESH_TOKEN_SECRET: Joi.string().required(),
    REFRESH_TOKEN_EXPIRES_IN_DAYS: Joi.string().required(),
    VERIFY_TOKEN_SECRET: Joi.string().required(),
    VERIFY_TOKEN_EXPIRES_IN_HOURS: Joi.string().required(),
    RESET_TOKEN_SECRET: Joi.string().required(),
    RESET_TOKEN_EXPIRES_IN_HOURS: Joi.string().required(),
    CLOUD_NAME: Joi.string().required(),
    CLOUD_API_KEY: Joi.string().required(),
    CLOUD_API_SECRET: Joi.string().required(),
    NODEMAILER_USER: Joi.string().required(),
    NODEMAILER_PASSWORD: Joi.string().required(),
  })
  .unknown();

const {
  value: envVars,
  error,
}: { value: NodeJS.ProcessEnv | undefined; error: Error } = envSchema.validate(
  process.env
);

if (error) {
  throw error;
}

const config: Config = {
  app: {
    env: envVars.NODE_ENV,
    port: +envVars.PORT || 5000,
    base_url: envVars.BASE_URL,
  },
  client: {
    baseUrl: envVars.CLIENT_BASE_URL,
  },
  db: {
    host: envVars.DB_HOST,
    port: +envVars.DB_PORT,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
  },
  jwt: {
    accessToken: {
      secret: envVars.ACCESS_TOKEN_SECRET,
      expiresIn: +envVars.ACCESS_TOKEN_EXPIRES_IN_MINUTES * 60 * 1000,
    },
    refreshToken: {
      secret: envVars.REFRESH_TOKEN_SECRET,
      expiresIn: +envVars.REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000,
    },
    verifyToken: {
      secret: envVars.VERIFY_TOKEN_SECRET,
      expiresIn: +envVars.VERIFY_TOKEN_EXPIRES_IN_HOURS * 60 * 60 * 1000,
    },
    resetToken: {
      secret: envVars.RESET_TOKEN_SECRET,
      expiresIn: +envVars.RESET_TOKEN_EXPIRES_IN_HOURS * 60 * 60 * 1000,
    },
  },
  cloudinary: {
    cloudName: envVars.CLOUD_NAME,
    apiKey: envVars.CLOUD_API_KEY,
    apiSecret: envVars.CLOUD_API_SECRET,
  },
  nodemailer: {
    user: envVars.NODEMAILER_USER,
    password: envVars.NODEMAILER_PASSWORD,
  },
};

export default config;

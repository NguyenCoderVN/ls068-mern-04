import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // JWT Secrets
  JWT_SECRET: process.env.JWT_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  COOKIE_NAME: process.env.COOKIE_NAME || "jwt",

  // Database & Cache
  REDIS_URL: process.env.REDIS_URL,
};

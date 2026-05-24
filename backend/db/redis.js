import Redis from "ioredis";
import dotenv from "dotenv";
import { ENV_VARS } from "./env.js";
dotenv.config();

export const redisClient = new Redis(ENV_VARS.REDIS_URL);

redisClient.on("connect", () => {
  console.log("Redis connected successfully");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

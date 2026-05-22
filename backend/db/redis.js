import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const redisClient = new Redis(process.env.UPSTASH_REDIS_URL);

redisClient.on("connect", () => {
  console.log("Redis connected successfully");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

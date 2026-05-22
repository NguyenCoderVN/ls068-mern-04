import { redisClient } from "#db/redis.js";
import jwt from "jsonwebtoken";

export const setAuthCookie = (
  res,
  userId,
  cookieName = process.env.COOKIE_NAME,
  secret = process.env.JWT_SECRET,
  expiresIn = "7d",
) => {
  const token = jwt.sign({ userId }, secret, {
    expiresIn,
  });

  res.cookie(cookieName, token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export const blacklistToken = async (
  req,
  cookieName = process.env.COOKIE_NAME,
  prefix = "blacklist:",
  value = "revoked",
) => {
  const token = req?.cookies?.[cookieName];

  if (!token) return;

  const decoded = jwt.decode(token);

  if (decoded && decoded.exp) {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const timeToLive = decoded.exp - currentTimeInSeconds;

    if (timeToLive > 0) {
      await redisClient.set(
        `${prefix}${token}`,
        value,
        "EX",
        timeToLive,
      );
    }
  }
};

export const isTokenBlacklisted = async (
  token,
  prefix = "blacklist:",
) => {
  if (!token) return false;

  const result = await redisClient.get(`${prefix}${token}`);

  return result !== null;
};

export const clearAuthCookie = (
  res,
  cookieName = process.env.COOKIE_NAME,
) => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
};

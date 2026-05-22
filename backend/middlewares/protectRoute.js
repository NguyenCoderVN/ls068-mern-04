import jwt from "jsonwebtoken";
import AppError from "#utils/appError.js";
import authService from "#services/auth.service.js";
import { isTokenBlacklisted } from "#utils/jwt.util.js";

export const protectRoute = async (req, _res, next) => {
  const token = req.cookies[process.env.COOKIE_NAME];

  if (!token)
    throw new AppError("Unauthorized - No Token Provided", 401);

  if (await isTokenBlacklisted(token)) {
    throw new AppError(
      "Unauthorized - Token has been blacklisted",
      401,
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await authService.getUserById(decoded.userId);

  if (!user) throw new AppError("Unauthorized - User not found", 401);

  req.user = user;
  next();
};

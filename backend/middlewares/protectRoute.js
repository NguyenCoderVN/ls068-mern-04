import jwt from "jsonwebtoken";
import AppError from "#utils/appError.js";
import authService from "#services/auth.service.js";

export const protectRoute = async (req, _res, next) => {
  const token = req.cookies[process.env.COOKIE_NAME];

  if (!token) {
    throw new AppError("Unauthorized - No Token Provided", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await authService.getUserById(decoded.userId);

  req.user = user;

  next();
};

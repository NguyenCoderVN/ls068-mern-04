import {
  authCheck,
  login,
  logout,
  signup,
} from "#controllers/auth.controller.js";
import { protectRoute } from "#middlewares/protectRoute.js";
import { validateSignup } from "#validators/signup.validator.js";
import { Router } from "express";

export const authRoutes = Router();

authRoutes.post("/signup", validateSignup, signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/authCheck", protectRoute, authCheck);

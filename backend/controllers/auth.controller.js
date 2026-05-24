import * as authService from "#services/auth.service.js";
import {
  blacklistToken,
  clearAuthCookie,
  setAuthCookie,
} from "#utils/jwt.util.js";

export const signup = async (req, res) => {
  const user = await authService.signup(req.body);

  res.status(201).json({
    user,
  });
};

export const login = async (req, res) => {
  const user = await authService.login(req.body);

  setAuthCookie(res, user._id);

  res.status(200).json({
    user,
  });
};

export const logout = async (req, res) => {
  await blacklistToken(req);

  clearAuthCookie(res);

  res.status(200).json({
    message: "Logout successfully",
  });
};

export const authCheck = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

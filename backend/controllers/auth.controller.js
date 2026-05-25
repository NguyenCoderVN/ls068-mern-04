import { ENV_VARS } from "#db/env.js";
import * as authService from "#services/auth.service.js";
import {
  blacklistToken,
  clearAuthCookie,
  setAuthCookie,
  storeRefreshToken,
} from "#utils/jwt.util.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const user = await authService.signup(req.body);

  res.status(201).json({
    user,
  });
};

export const login = async (req, res) => {
  const user = await authService.login(req.body);

  const token = req.cookies["accessToken"];
  let isTokenValidAndMatching = false;

  if (token) {
    try {
      const decoded = jwt.verify(token, ENV_VARS.ACCESS_TOKEN_SECRET);

      if (decoded.userId === user._id.toString()) {
        isTokenValidAndMatching = true;
      }
    } catch (error) {}
  }

  if (!isTokenValidAndMatching) {
    const refreshToken = setAuthCookie(res, user._id);

    await storeRefreshToken(user._id, refreshToken);

    setAuthCookie(
      res,
      user._id,
      "accessToken",
      ENV_VARS.ACCESS_TOKEN_SECRET,
      "15m",
    );
    res.status(200).json({
      message: "You logged before, now continue",
      user,
    });
  } else {
    res.status(200).json({ user });
  }
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

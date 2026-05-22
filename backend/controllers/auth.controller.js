import authService from "#services/auth.service.js";
import { setAuthCookie } from "#utils/jwt.util.js";

export const signup = async (req, res) => {
  const user = await authService.signup(req.body);

  setAuthCookie(res, user._id);

  res.status(201).json({
    data: {
      user,
    },
  });
};

export const login = async (req, res) => {
  const user = await authService.login(req.body);

  setAuthCookie(res, user._id);

  res.status(200).json({
    data: {
      user,
    },
  });
};

export const logout = async (_req, res) => {
  res.cookie(process.env.COOKIE_NAME, "", { maxAge: 0 });

  res.status(200).json({
    message: "Logout successfully",
  });
};

export const authCheck = async (req, res) => {
  res.status(200).json({
    data: {
      user: req.user,
    },
  });
};

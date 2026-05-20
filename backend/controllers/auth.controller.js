import authService from "#services/auth.service.js";
import { setAuthCookie } from "#utils/jwt.util.js";

export const signup = async (req, res) => {
  const user = await authService.signup(req.body);

  setAuthCookie(user._id, res);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
};

export const login = async (req, res) => {
  const user = await authService.login(req.body);

  setAuthCookie(user._id, res);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

export const logout = async (_req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });

  res.status(200).json({
    status: "success",
    message: "Logout successfully",
  });
};

export const authCheck = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

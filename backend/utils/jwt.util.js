import jwt from "jsonwebtoken";

export const setAuthCookie = (
  res,
  userId,
  cookieName = "jwt",
  secret = process.env.JWT_SECRET,
  expiresIn = "15d",
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

import { genSalt, hash, compare } from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await genSalt(10);

  return await hash(password, salt);
};

export const comparePassword = async (
  candidatePassword,
  userPassword,
) => {
  return await compare(candidatePassword, userPassword);
};

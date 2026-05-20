import User from "#models/user.model.js";
import AppError from "#utils/appError.js";
import {
  comparePassword,
  hashPassword,
} from "#utils/password.util.js";

const FAKE_HASH =
  "$2b$12$LycX7N4mGfWJ.qKv2g4fO.examplefakehashdonotuseonesir";

class AuthService {
  async signup(userData) {
    const { username, email, password } = userData;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new AppError("Email or Username already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }

  async login({ username, password }) {
    const user = await User.findOne({ username }).select("+password");

    const hashToCompare = user ? user.password : FAKE_HASH;
    const isMatch = await comparePassword(password, hashToCompare);

    if (!user || !isMatch) {
      throw new AppError("Invalid username or password", 401);
    }

    user.password = undefined;
    return user;
  }

  async getUserById(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}

export default new AuthService();

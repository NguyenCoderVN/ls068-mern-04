import AppError from "#utils/appError.js";

export const validateSignup = (req, _res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return next(
      new AppError("Username, password, and email are required", 400),
    );
  }

  if (typeof password !== "string") {
    return next(new AppError("Password must be a valid string", 400));
  }

  const cleanPassword = password.trim();

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    return next(
      new AppError(
        "Username must be between 3 and 20 characters and contain only letters, numbers, or underscores",
        400,
      ),
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  const passwordErrors = [];
  if (cleanPassword.length < 8)
    passwordErrors.push("- at least 8 characters");
  if (!/[A-Z]/.test(cleanPassword))
    passwordErrors.push("- at least one uppercase letter");
  if (!/[a-z]/.test(cleanPassword))
    passwordErrors.push("- at least one lowercase letter");
  if (!/\d/.test(cleanPassword))
    passwordErrors.push("- at least one number");
  if (!/[^A-Za-z0-9]/.test(cleanPassword))
    passwordErrors.push("- at least one special character");

  if (passwordErrors.length > 0) {
    const error = new AppError("Password validation failed", 400);
    error.errors = [
      "Password must be contained more: ",
      ...passwordErrors,
    ];
    return next(error);
  }

  req.body.password = cleanPassword;
  next();
};

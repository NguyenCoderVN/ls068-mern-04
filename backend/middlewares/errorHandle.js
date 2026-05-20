export const errorHandler = (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;

  if (!err.isOperational) {
    if (
      err.message?.includes?.("404") ||
      err.response?.status === 404
    ) {
      err.statusCode = 404;
      err.message =
        "The requested content does not exist on the system";
    }

    if (err.name?.includes("JsonWebTokenError")) {
      err.statusCode = 401;
      err.message = "Invalid token. Please log in again!";
    }

    if (err.name?.includes("TokenExpiredError")) {
      err.statusCode = 401;
      err.message = "Your token has expired! Please log in again.";
    }
  }

  err.status =
    err.status ||
    (`${err.statusCode}`.startsWith("4") ? "fail" : "error");

  if (
    process.env.NODE_ENV === "production" &&
    err.statusCode === 500
  ) {
    err.message = "Internal Server Error";
  }

  // Preserve arrays (like password validation errors) from getting cast to string strings
  const responseMessage = Array.isArray(err.errors)
    ? err.errors
    : err.message;

  if (process.env.NODE_ENV === "development") {
    const stackArray = err.stack ? err.stack.split("\n") : [];
    const cleanStack = stackArray
      .map((line) => {
        const trimmedLine = line.trim();
        if (
          trimmedLine.includes("node:internal") ||
          !trimmedLine.includes("/")
        ) {
          return null;
        }
        const match = trimmedLine.match(
          /([^/]+\/[^/]+\.[a-z]+:\d+:\d+)/i,
        );
        return match ? match[0] : trimmedLine;
      })
      .filter(Boolean);

    return res.status(err.statusCode).json({
      message: responseMessage,
      error: {
        statusCode: err.statusCode,
        status: err.status,
        isOperational: err.isOperational || false,
      },
      stack: cleanStack,
    });
  }

  return res.status(err.statusCode).json({
    status: err.status,
    message: responseMessage,
  });
};

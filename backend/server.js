import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "#db/connectDB.js";
import { authRoutes } from "#routes/auth.route.js";
import { errorHandler } from "#middlewares/errorHandle.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.all("/*splat", (req, _res, next) => {
  const error = new Error(
    `Can not find ${req.originalUrl} on this server`,
  );
  error.statusCode = 404;
  next(error);
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});

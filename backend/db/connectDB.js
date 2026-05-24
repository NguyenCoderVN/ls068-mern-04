import { connect } from "mongoose";
import { ENV_VARS } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await connect(ENV_VARS.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

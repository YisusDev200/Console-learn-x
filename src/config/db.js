import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { MONGO_URL } = process.env;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log({
      error,
      message: "db connection failed",
    });
  }
};

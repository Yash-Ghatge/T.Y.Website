import mongoose from "mongoose";
import { config } from "dotenv";
config({path:"./config/.env"});


export const connection = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "JOB_PORTAL_WITH_AUTOMATION",
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
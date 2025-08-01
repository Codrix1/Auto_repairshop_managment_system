import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: '../.env', quiet: true});

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectToDB;
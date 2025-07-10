import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path: '../.env'});

console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI ?.substring(0, 10) + '...');

const connectEmployeeDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectEmployeeDB;
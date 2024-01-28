import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
const dbURL = process.env.DB_URL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL).then((data) => {
      console.log(`Database connected to ${data.connection.host}`);
    });
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};
export default connectDB;

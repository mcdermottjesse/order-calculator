import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = () => {
  const uri = process.env.MONGO_URI as string;
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

export default connectDB;

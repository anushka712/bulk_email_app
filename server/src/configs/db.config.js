import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGO_CONNECTION_URI = process.env.MONGO_CONNECTION_URI;

  try {
    if (!MONGO_CONNECTION_URI)
      throw new Error("INvalid MongoDB Connection URI!");

    const conn = await mongoose.connect(MONGO_CONNECTION_URI);

    console.log(`Mongo DB connected: ${conn?.connection?.host}`, "Success");
  } catch (error) {
    console.log(`MongoDB Error: ${error.message}`, "error");
    process.exit(1);
  }
};

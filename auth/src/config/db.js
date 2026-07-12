import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.AUTH_MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("MongoDb connection error: ", error);
    process.exit(1);
  }
};

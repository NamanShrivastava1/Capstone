import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", userSchema);

export default userModel;

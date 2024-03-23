import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    publickey: String,
    name: String,
    email: String,
    password: String,
    balance:{
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);
export default mongoose.model("user", userSchema);

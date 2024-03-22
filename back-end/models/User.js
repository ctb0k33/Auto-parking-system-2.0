import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const userSchema = new mongoose.Schema(
  {
    publickey: String,
    name: String,
    email: String,
    password: String,
    registerPark: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
    },
    parkingOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);
export default mongoose.model("user", userSchema);

import mongoose from "mongoose";
const onetimeQrSchema = new mongoose.Schema(
  {
    enterTime: Date,
    publicKey: String,
    licensePlate: String,
    carProperty: String,
  },
  {
    timestamps: true,
    collection: "onetimeQr",
  }
);

export default mongoose.model("onetimeQr", onetimeQrSchema);

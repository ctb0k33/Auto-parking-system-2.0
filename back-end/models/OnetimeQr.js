import mongoose from "mongoose";
const onetimeQrSchema = new mongoose.Schema(
  {
    enterTime: Date,
    publicKey: String,
    randomString: String,
    type: String,
    carNumber: String,
    randomString: String,
  },
  {
    timestamps: true,
    collection: "onetimeQr",
  }
);

export default mongoose.model("onetimeQr", onetimeQrSchema);

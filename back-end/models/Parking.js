import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);
const parkingSchema = new mongoose.Schema(
  {
    // _id field is not explicitly defined here; it will be added by mongoose-sequence
    name: {
      type: String,
      required: true,
    },
    images: [String],
    rating: Number,
    openTime: Date,
    address: String,
    ownerName: String,
    fare: [Number],
    maximumCapacity: Number,
    service: [String],
    contractId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: "parking",
  }
);

// Apply the auto increment plugin to the schema.
// parkingSchema.plugin(AutoIncrement, { inc_field: "_id" });

export default mongoose.model("parking", parkingSchema);

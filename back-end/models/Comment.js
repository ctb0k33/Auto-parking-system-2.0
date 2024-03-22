import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";
const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parkingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parking",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});
// commentSchema.plugin(AutoIncrement, { inc_field: "_id" });
export default mongoose.model("comment", commentSchema);

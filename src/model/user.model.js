import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
  },
  rating: {
    type : Number,
    required : true
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);

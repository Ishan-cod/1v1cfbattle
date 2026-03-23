import mongoose from "mongoose";

const matchhistoryschema = new mongoose.Schema({
  roomcode: {
    type: String,
    required: true,
  },
  starttime: {
    type: Number,
    required: true,
  },
  endtime: {
    type: Number,
    required: true,
  },
  opponent: {
    type: [String],
    required: true,
    validate: (v) => v.length > 0,
  },
  winner: {
    type: String,
  },
  problemid: {
    type: String,
  },
  status: {
    type: String,
    enum: ["WIN", "LOSS"],
    required: true,
  },
});

const historyschema = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
  },
  match: [matchhistoryschema],
});

export default mongoose.models.History ||
  mongoose.model("History", historyschema);

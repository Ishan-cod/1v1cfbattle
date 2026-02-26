import mongoose from "mongoose";

const playerschema = new mongoose.Schema(
  {
    handle: {
      type: String,
      required: true,
    },
    is_ready: {
      type: Boolean,
      default: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    last_heartbeat: {
      type: Number,
      default: null,
    },
  },
  { _id: false },
);

const settingschema = new mongoose.Schema(
  {
    rating_min: Number,
    rating_max: Number,
    tags: [String],
    time_limit_mins: {
      type: Number,
      default: 120,
    },
  },
  { _id: false },
);

const problemschema = new mongoose.Schema(
  {
    id: String,
    index: String,
    name: String,
    url: String,
    rating: Number,
    tags : [String]
  },
  { _id: false },
);

const livefeedschema = new mongoose.Schema(
  {
    user: String,
    type: String,
    verdict: String,
    time: Number,
  },
  { _id: false },
);

const matchdatascheme = new mongoose.Schema(
  {
    problem: problemschema,
    start_time: Number,
    end_time: Number,
    winner: String,
  },
  { _id: false },
);

const roomschema = new mongoose.Schema({
  roomcode: {
    type: String,
    required: true,
    unique: true,
  },
  
  status: {
    type: String,
    enum: ["WAITING", "READY", "ONGOING", "FINISHED", "CANCELLED"],
    default: "WAITING",
  },

  settings: settingschema,

  players: {
    host: playerschema,
    guest: playerschema,
  },

  match_data: matchdatascheme,

  live_feed: [livefeedschema],
});

export default mongoose.models.Room || mongoose.model("Room", roomschema);

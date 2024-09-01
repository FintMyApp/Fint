import mongoose from "mongoose";

const FreeLanceSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  portfolio: {
    type: String,
    default: "",
  },
  profileImg: {
    type: String,
  },
});

export const FreeLancers = mongoose.model("FreeLancers", FreeLanceSchema);

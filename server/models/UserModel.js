import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  otp: { type: String },
  otpExpires: { type: Date },
  passwordChangedAt: {
    type: Date,
    default: Date.now,
  },
  lastPasswordChange: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);

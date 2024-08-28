import mongoose from "mongoose";

const affiliateLinkSchema = new mongoose.Schema({
  image: String,
  link: String,
  description: String,
  createdAt: { type: Date, default: Date.now, expires: "30d" }, // Auto-delete after 30 days
});

export const AffiliateLink = mongoose.model(
  "AffiliateLink",
  affiliateLinkSchema
);

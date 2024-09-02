import { Ad } from "../models/AddMobModel.js";
import { z } from "zod";

const adSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters long"),
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  imageUrl: z.string().url("Invalid image URL"),
  link: z.string().url("Invalid link URL"),
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid end date"),
});

export const addAd = async (req, res) => {
  try {
    const {
      businessName,
      title,
      description,
      imageUrl,
      link,
      startDate,
      endDate,
    } = adSchema.parse(req.body);

    const newAd = new Ad({
      businessName,
      title,
      description,
      imageUrl,
      link,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    await newAd.save();
    res.status(201).json({ message: "Ad created successfully", ad: newAd });
  } catch (error) {
    console.error("Ad creation error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const updateAd = async (req, res) => {
  try {
    const { adId } = req.params;
    const updatedData = adSchema.partial().parse(req.body);

    const updatedAd = await Ad.findByIdAndUpdate(adId, updatedData, {
      new: true,
    });

    if (!updatedAd) {
      return res.status(404).json({ message: "Ad not found" });
    }

    res.json({ message: "Ad updated successfully", ad: updatedAd });
  } catch (error) {
    console.error("Ad update error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const deleteAd = async (req, res) => {
  try {
    const { adId } = req.params;

    const deletedAd = await Ad.findByIdAndDelete(adId);

    if (!deletedAd) {
      return res.status(404).json({ message: "Ad not found" });
    }

    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    console.error("Ad deletion error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getAds = async (req, res) => {
  try {
    const currentDate = new Date();

    const ads = await Ad.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    console.log("Ads Query Result:", ads);

    res.json(ads);
  } catch (error) {
    console.error("Error fetching ads:", error);
    res.status(500).json({ message: "Server error" });
  }
};

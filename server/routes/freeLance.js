import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { FreeLancers } from "../models/FreeLanceModel.js";
import path from "path";
import {
  FreeLancerLogin,
  FreeLancerRegister,
  getAllFreelancers,
  uploadImage,
} from "../freeLanceController/FAuthController.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/signup", FreeLancerRegister);
router.post("/signin", FreeLancerLogin);
router.post("/upload-image", upload.single("image"), uploadImage);
router.get("/All", getAllFreelancers);
router.get("/profile/:id", async (req, res) => {
  try {
    const freelancerId = req.params.id;
    const freelancer = await FreeLancers.findById(freelancerId);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.json(freelancer);
  } catch (error) {
    console.error("Error fetching freelancer:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
});
export default router;

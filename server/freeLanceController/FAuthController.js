import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { FreeLancers } from "../models/FreeLanceModel.js";
import { z } from "zod";
import multer from "multer";
import cloudinary from "cloudinary";

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const freelancerRegisterSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(50, "Full name must not exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must only contain digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
  skills: z.string().min(1, "Skills must be provided"),
  portfolio: z.string().url("Portfolio must be a valid URL"),
});

export const FreeLancerRegister = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, skills, portfolio } =
      freelancerRegisterSchema.parse(req.body);

    let existingUser = await FreeLancers.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, please login" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const fUser = new FreeLancers({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      skills,
      portfolio,
    });

    await fUser.save();

    const payload = { id: fUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      user: fUser,
      token, // Include the token in the response
    });
  } catch (error) {
    console.error("Freelancer registration error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "portfolio_images",
    });

    res.json({ imageUrl: uploadedImage.secure_url });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

const freelancerLoginSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const FreeLancerLogin = async (req, res) => {
  try {
    const { phoneNumber, password } = freelancerLoginSchema.parse(req.body);

    const fUser = await FreeLancers.findOne({ phoneNumber });
    if (!fUser) {
      return res
        .status(400)
        .json({ message: "Invalid phoneNumber or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, fUser.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid phoneNumber or password" });
    }

    const payload = { id: fUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      user: fUser,
      token, // Include the token in the response
    });
  } catch (error) {
    console.error("Freelancer login error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getAllFreelancers = async (req, res) => {
  try {
    const freelancers = await FreeLancers.find({});
    res.json(freelancers);
  } catch (error) {
    console.error("Error fetching freelancers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

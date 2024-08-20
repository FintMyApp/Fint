import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";
import { mailingService, generateOtp, resetPassword } from "./mail.js";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must not exceed 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name must be at least 1 character long")
    .max(50, "Last name must not exceed 50 characters"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must only contain digits"),
  email: z.string().email("Invalid email address"),
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
});
const loginSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const register = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } =
      registerSchema.parse(req.body);

    console.log(firstName, lastName, phoneNumber, email, password);

    let user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;

    await user.save();
    console.log(user);
    await mailingService(email, firstName, otp);

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
    console.log(token);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const login = async (req, res) => {
  const { phoneNumber, password } = loginSchema.parse(req.body);

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};
export const logout = async (req, res) => {
  try {
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};

import express from "express";
import { User } from "../models/UserModel.js";
import { z } from "zod";
import { resendOtp } from "../controllers/resendOtp.js";

const router = express.Router();

const otpSchema = z.object({
  otp: z.string().length(4, { message: "OTP must be 4 digits" }),
});

const emailParamSchema = z.object({
  email: z.string().email("Invalid email address"),
});

router.post("/verify-otp/:email", async (req, res) => {
  try {
    const emailParams = emailParamSchema.parse(req.params);
    const { otp } = otpSchema.parse(req.body);
    const { email } = emailParams;

    console.log(email);
    console.log(otp);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Verification error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/resend-otp", resendOtp);

export default router;

import { User } from "../models/UserModel.js";
import { generateOtp, mailingService } from "./mail.js";

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otpExpires > Date.now()) {
      return res
        .status(400)
        .json({ message: "Previous OTP has not yet expired. Please wait." });
    }

    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await mailingService(user.email, user.firstName, otp);

    res.status(200).json({ message: "OTP has been resent to your email." });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

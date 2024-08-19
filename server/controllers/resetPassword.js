import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/UserModel.js";
import { resetPassword } from "./mail.js";
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email does not exist",
      });
    }

    const resetToken = uuidv4();
    console.log(resetToken);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

    const resetUrl = `http://192.168.0.103:8000/api/auth/reset?token=${resetToken}`;

    const username = user.firstName;
    console.log(username);

    await resetPassword(email, username, resetUrl);
    await user.save();

    res.status(200).json({
      // message: "Password reset link sent to your email",
      resetToken, //not in production
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error while resetting password: ${error.message}`,
    });
  }
};

export const passwordReset = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password has been reset successfully",
    });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // Use decoded.id to find the user

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Attach user information to the request
    req.user = { _id: user._id, username: user.username };
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token.", error: error.message });
  }
};

export default authMiddleware;

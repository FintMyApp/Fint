import express, { Router } from "express";

import { login, register } from "../controllers/authController.js";
import {
  requestPasswordReset,
  passwordReset,
} from "../controllers/resetPassword.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", requestPasswordReset);
router.post("/reset/:token", passwordReset);

router.get("/me", authMiddleware, async (req, res) => {
  res.json(req.user);
});
export default router;

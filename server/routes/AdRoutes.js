import express from "express";
import {
  addAd,
  updateAd,
  deleteAd,
  getAds,
} from "../addMob/addMObController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/ads", authMiddleware, addAd);

router.put("/ads/:adId", authMiddleware, updateAd);

router.delete("/ads/:adId", authMiddleware, deleteAd);

router.get("/ads", getAds);

export default router;

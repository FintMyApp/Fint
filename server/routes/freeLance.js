import express, { Router } from "express";
import {
  FreeLancerLogin,
  FreeLancerRegister,
  getAllFreelancers,
} from "../freeLanceController/FAuthController.js";

// import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", FreeLancerRegister);
router.post("/signin", FreeLancerLogin);
router.get("/freelancers", getAllFreelancers);

export default router;

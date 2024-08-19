import express from "express";

const router = express.Router();

router.get("/terms", (req, res) => {
  res.json({
    content: "Terms of services text.......",
  });
});

export default router;

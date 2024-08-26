import { parse } from "url";

export const validateQrCode = async (req, res) => {
  const { ts } = req.query;
  if (ts) {
    const currentTime = Date.now();
    if (currentTime <= parseInt(ts, 10)) {
      res.json({ message: "QR code is valid" });
    } else {
      res.status(400).json({ message: "QR code has expired" });
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

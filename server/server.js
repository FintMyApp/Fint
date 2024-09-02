import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import otpVerify from "./routes/otp.js";
import Terms from "./routes/Terms.js";
import freeLanceAuth from "./routes/freeLance.js";
import admob from "./routes/AdRoutes.js";
import { DBconnection } from "./DB.js";
dotenv.config();
const app = express();
DBconnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from fint");
});

app.post("/api/data", (req, res) => {
  const { message } = req.body;
  console.log(message);

  res.json({ receivedMessage: message });
});
const port = process.env.PORT || 1000;
const HOST = process.env.HOST;
app.use("/api/auth", authRoute);
app.use("/api/otp", otpVerify);
app.use("/api/policy", Terms);
app.use("/api/freelance", freeLanceAuth);
app.use("/api/admob", admob);
app.listen(port, HOST, () => {
  console.log(`server is running on port ${port},${HOST}`);
});

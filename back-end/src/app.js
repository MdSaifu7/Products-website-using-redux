import express from "express";
import gadgetRoutes from "./router/gadget.route.js";
import authRoutes from "./router/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/gadgets", gadgetRoutes);
export default app;

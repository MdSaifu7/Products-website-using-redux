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
    origin: "https://products-website-using-redux.vercel.app",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/gadgets", gadgetRoutes);
export default app;

import express from "express";
import gadgetRoutes from "./router/gadget.route.js";
import authRoutes from "./router/auth.routes.js";
import cors from "cors";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use("/auth", authRoutes);
app.use("/gadgets", gadgetRoutes);
export default app;

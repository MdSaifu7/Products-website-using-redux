import express from "express";
import gadgetModel from "../models/gadgets.model.js";
const router = express.Router();

router.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided
  const skip = parseInt(req.query.skip) || 0; // Default skip to 0 if not provided

  const products = await gadgetModel.find().skip(skip).limit(limit);

  res.status(200).json({
    message: "All products",
    products,
  });
});

export default router;

import express from "express";
import gadgetModel from "../models/gadgets.model.js";
import multer from "multer";
import uploadFile from "../services/imagekit.service.js";
import protectRoute from "./protect.route.js";
import jwt from "jsonwebtoken";
const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit) || 6; // Default limit to 10 if not provided
  const skip = parseInt(req.query.skip) || 0; // Default skip to 0 if not provided

  const products = await gadgetModel.find().skip(skip).limit(limit);

  res.status(200).json({
    message: "All products",
    products,
  });
});

router.patch(
  "/update/product/:id",
  protectRoute,
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { title, price, description } = req.body;
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }

      const updateProduct = {
        title,
        price,
        description,
      };

      if (req.file) {
        const img = req.file;
        const { url } = await uploadFile(img.buffer, title, true);
        updateProduct.imageUrl = url;
      }

      const product = await gadgetModel.findOneAndUpdate(
        { _id: id },
        { $set: updateProduct },
        { new: true }
      );
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);

router.post(
  "/create/product",
  protectRoute,
  upload.single("image"),
  async (req, res) => {
    const { price, title, description } = req.body;
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }

      if (!price || !title || !description) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }
      if (!req.file) {
        return res.status(400).json({
          message: "Image is required",
        });
      }
      const img = req.file;

      const { url } = await uploadFile(img.buffer, title, true);
      const product = await gadgetModel.create({
        price,
        title,
        description,
        imageUrl: url,
      });
      return res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Product could not be created!",
        error: error.message,
      });
    }
  }
);

router.delete("/products/:id", protectRoute, async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    const product = await gadgetModel.findOneAndDelete({ _id: id });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Product deletion failed",
      error: error.message,
    });
  }
});

router.get("/search", async (req, res) => {
  const { search } = req.query;

  try {
    if (!search || search.trim() === "") {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const results = await gadgetModel.find({
      title: { $regex: search, $options: "i" },
    });

    if (results.length == 0) {
      return res.status(404).json({
        message: "No product found",
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      results,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

export default router;

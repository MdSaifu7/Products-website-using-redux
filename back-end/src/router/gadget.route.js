import express from "express";
import gadgetModel from "../models/gadgets.model.js";
import multer from "multer";
import uploadFile from "../services/imagekit.service.js";
// import protectRoute from "./protect.route.js";
const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided
  const skip = parseInt(req.query.skip) || 0; // Default skip to 0 if not provided

  const products = await gadgetModel.find().skip(skip).limit(limit);

  res.status(200).json({
    message: "All products",
    products,
  });
});

router.patch(
  "/update/product/:id",
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { title, price, description } = req.body;
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
    try {
      const product = await gadgetModel.findOneAndUpdate(
        { _id: id },
        { $set: updateProduct },
        { new: true }
      );
      res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

router.post("/create/product", upload.single("image"), async (req, res) => {
  const { id, price, title, description, image } = req.body;
  const img = req.file;

  const { url } = await uploadFile(img.buffer, title, true);
  const product = await gadgetModel.create({
    price,
    title,
    description,
    imageUrl: url,
  });
  res.status(201).json({
    message: "Product created successfully",
    product,
  });
});

export default router;

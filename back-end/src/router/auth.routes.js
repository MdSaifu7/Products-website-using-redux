import express from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import uploadFile from "../services/imagekit.service.js";
import protectRoute from "./protect.route.js";
const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post(
  "/register",

  upload.single("image"),
  async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if ((!username, !email, !password)) {
        return res.status(400).json({
          message: "All field are required",
        });
      }

      const result = await uploadFile(req.file.buffer, username);

      const hashPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        username,
        email,
        password: hashPassword,
        isAdmin: false,
        cart: [],
        image: result.url,
      });
      return res.status(201).json({
        message: "User registered successfully",
        user: {
          username,
          email,
          isAdmin: false,
          image: result.url,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
        error: err.message,
      });
    }
  }
);

router.post("/login", async (req, res) => {
  const { username = "", email, password } = req.body;
  try {
    if (!username && !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await userModel.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // res.cookie("token", token); // for localhost
    res.cookie("token", token, {
      // for production
      httpOnly: true,
      secure: true, // REQUIRED for HTTPS (Vercel/Render)
      sameSite: "none", // REQUIRED for cross-origin
    });
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        cart: user.cart,
        _id: user._id,
        image: user.image,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

router.patch("/user/cart", protectRoute, async (req, res) => {
  const id = req.user._id;
  const cart = req.body.cart;
  try {
    const user = await userModel.findByIdAndUpdate(id, { cart }, { new: true });
    if (!user) {
      return res.status(404).json({
        message: "User not found ",
      });
    }
    const isValidCart = cart.every((item) => item._id && item.quantity >= 1);

    if (!isValidCart) {
      return res.status(400).json({
        message: "Invalid cart format",
      });
    }

    return res.status(200).json({
      message: "Cart updated successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

router.patch(
  "/user/update",
  protectRoute,
  upload.single("image"),
  async (req, res) => {
    const id = req.user._id;
    const { username, email, password } = req.body;
    try {
      if (!username || !email || !password) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      const updateData = {
        username,
        email,
      };

      const hashPass = await bcrypt.hash(req.body.password, 10);
      updateData.password = hashPass;

      if (req.file) {
        const { url } = await uploadFile(req.file.buffer);
        updateData.image = url;
      }

      const newuser = await userModel.findOneAndUpdate(
        { _id: id },
        {
          $set: updateData,
        },
        { new: true }
      );

      return res.status(200).json({
        message: "User updated successfully",
        user: newuser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);
export default router;

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

router.post("/register", upload.single("image"), async (req, res) => {
  const { username, email, password, cart } = req.body;

  const result = await uploadFile(req.file.buffer, username);

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
    isAdmin: false,
    cart,
    image: result.url,
  });
  res.status(201).json({
    message: "User registered successfully",
    user: {
      username,
      email,
      isAdmin: false,
      image: result.url,
    },
  });
});

router.post("/login", async (req, res) => {
  const { username = null, email, password } = req.body;

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

  res.cookie("token", token);
  res.status(200).json({
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
});

router.patch("/user/cart", protectRoute, async (req, res) => {
  const id = req.body._id;
  const cart = req.body.cart;

  const user = await userModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        cart: cart,
      },
    },
    { new: true }
  );
  res.status(200).json({
    message: "Cart updated successfully",
    user,
  });
});
router.patch("/users/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;

  const updateData = {
    username: req.body.username,
    email: req.body.email,
  };
  if (req.body.password) {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    updateData.password = hashPass;
  }
  if (req.file) {
    updateData.image = await uploadFile(req.file.buffer);
  }
  try {
    const newuser = await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: updateData,
      },
      { new: true }
    );

    res.status(200).json({
      message: "User updated successfully",
      user: newuser,
    });
  } catch (error) {
    console.log(error);
  }
});
export default router;

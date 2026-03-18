import express from "express";
import userModel from "../models/user.model.js";
const router = express.Router();
router.post("/register", async (req, res) => {
  const { username, email, password, isAdmin = false, cart } = req.body;
  // Here you would typically save the user to the database
  const user = await userModel.create({
    username,
    email,
    password,
    isAdmin,
    cart,
  });
  res.status(201).json({
    message: "User registered successfully",
    user: {
      username,
      email,
      isAdmin,
    },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Here you would typically check the user's credentials and generate a token
  const user = await userModel.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      cart: user.cart,
      id: user._id,
    },
  });
});

router.patch("/users/:id", async (req, res) => {
  const id = req.params.id;
  await userModel.findOneAndUpdate(
    { _id: id },
    { $set: { cart: req.body.updatedUser.cart } }
  );
});
export default router;

import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: null,
  },
});

const userModel = mongoose.model("user", useSchema);
export default userModel;

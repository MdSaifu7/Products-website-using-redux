import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncRegisterUser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import compressImage from "../utility/compress.img";

const Register = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const RegisterHandler = async (data) => {
    const formData = new FormData();

    const compressedImage = await compressImage(data.image[0], 0.5);

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", compressedImage, "compressed.jpg");
    formData.append("nanoid", nanoid());
    // formData.append("cart", []);
    await dispatch(asyncRegisterUser(formData));

    toast.success("Account created successfully");
    reset();
    navigate("/login");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPreview(file);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(RegisterHandler)}
        className="w-full max-w-md bg-white border border-stone-100 rounded-2xl px-6 sm:px-8 py-8 sm:py-10 shadow-sm"
      >
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-light text-stone-900 tracking-tight">
            Create Account
          </h2>
          <div className="mt-3 h-px bg-stone-200 w-16" />
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-400 mb-2 font-medium">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              placeholder="Your username"
              className="w-full bg-transparent border-b border-stone-200 focus:border-stone-700 py-3 text-stone-800 outline-none placeholder:text-stone-300 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-400 mb-2 font-medium">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="you@example.com"
              className="w-full bg-transparent border-b border-stone-200 focus:border-stone-700 py-3 text-stone-800 outline-none placeholder:text-stone-300 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-400 mb-2 font-medium">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="••••••••"
              className="w-full bg-transparent border-b border-stone-200 focus:border-stone-700 py-3 text-stone-800 outline-none placeholder:text-stone-300 transition"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-400 mb-3 font-medium">
              Profile Image
            </label>

            <div className="relative w-full border border-stone-200 rounded-lg px-4 py-3 flex items-center justify-between hover:border-stone-400 transition">
              <span className="text-sm text-stone-500 truncate">
                {preview ? preview.name : "Choose an image..."}
              </span>

              <span className="text-xs text-stone-400 uppercase tracking-wider">
                Browse
              </span>

              <input
                {...register("image", { required: true })}
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {/* Preview */}
            {preview && (
              <img
                src={URL.createObjectURL(preview)}
                alt="preview"
                className="mt-4 w-full h-40 object-contain border border-stone-200 rounded-lg p-2"
              />
            )}
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-6 py-3 bg-stone-900 text-white text-xs sm:text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors duration-200"
        >
          Register
        </button>

        {/* Divider */}
        <div className="w-full h-px bg-stone-100 my-6" />

        {/* Login Link */}
        <p className="text-xs text-stone-500 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-stone-900 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncRegisterUser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import compressImage from "../utility/compress.img";

const Register = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const RegisterHandler = async (data) => {
    const formData = new FormData();
    const compressedImage = await compressImage(data.image[0], 0.5);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", compressedImage, "compressed.jpg"); // 🔥 IMPORTANT
    formData.append("nanoid", nanoid());

    await dispatch(asyncRegisterUser(formData));
    toast.success("Account created successfully");
    reset();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit(RegisterHandler)}
        className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl px-8 py-10 shadow-2xl flex flex-col items-center"
      >
        <h2 className="text-2xl font-semibold text-gray-100 tracking-wide mb-8 self-start">
          Create Account
        </h2>

        <div className="w-full flex flex-col gap-4 mb-2">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 tracking-widest uppercase pl-1">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              placeholder="Your username"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 tracking-widest uppercase pl-1">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Your email"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 tracking-widest uppercase pl-1">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 tracking-widest uppercase pl-1">
              Profile Image
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-400 outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-amber-500 file:text-gray-950 hover:file:bg-amber-400 transition cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-3 rounded-xl text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-950 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg shadow-amber-900/30"
        >
          Register
        </button>

        <div className="w-full h-px bg-gray-800 my-5" />

        <p className="text-xs text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

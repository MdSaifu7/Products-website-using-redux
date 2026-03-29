import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncLoginUser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  const LoginHandler = async (data) => {
    const success = await dispatch(asyncLoginUser(data));
    setUserLoggedIn(success);

    if (success) {
      navigate("/");
      toast.success("Login Successfully", {
        style: {
          fontSize: "12px",
          padding: "8px 12px",
        },
      });
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(LoginHandler)}
        className="w-full max-w-md bg-white border border-stone-100 rounded-2xl px-6 sm:px-8 py-8 sm:py-10 shadow-sm"
      >
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-light text-stone-900 tracking-tight">
            Welcome Back
          </h2>
          <div className="mt-3 h-px bg-stone-200 w-16" />
        </div>

        {/* Inputs */}
        <div className="space-y-5">
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
        </div>

        {/* Error */}
        {userLoggedIn === false && (
          <p className="text-red-500 text-xs mt-3">
            Invalid email or password.
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-6 py-3 bg-stone-900 text-white text-xs sm:text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors duration-200"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="w-full h-px bg-stone-100 my-6" />

        {/* Register Link */}
        <p className="text-xs text-stone-500 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-stone-900 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

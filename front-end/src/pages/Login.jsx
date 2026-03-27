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
      toast.success("Login Succesfully");
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit(LoginHandler)}
        className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl px-8 py-10 shadow-2xl flex flex-col items-center"
      >
        <h2 className="text-2xl font-semibold text-gray-100 tracking-wide mb-8 self-start">
          Welcome Back
        </h2>

        <div className="w-full flex flex-col gap-4 mb-2">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-500 tracking-widest uppercase pl-1">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="you@example.com"
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
        </div>

        {userLoggedIn === false && (
          <p className="text-red-400 text-xs mt-1 self-start pl-1">
            Invalid email or password.
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-4 py-3 rounded-xl text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-950 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg shadow-amber-900/30"
        >
          Sign In
        </button>

        <div className="w-full h-px bg-gray-800 my-5" />

        <p className="text-xs text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

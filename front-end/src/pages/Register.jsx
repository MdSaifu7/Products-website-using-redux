import { nanoid } from "nanoid";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncRegisterUser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";
const Register = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const RegisterHandler = (data) => {
    data.id = nanoid();
    data.isAdmin = false;
    data.cart = [];
    dispatch(asyncRegisterUser(data));
    // const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    // existingUsers.push(data);
    // localStorage.setItem("users", JSON.stringify(existingUsers));
    // console.log("Registered User:", data);
    reset();
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-center items-center ">
      <form
        onSubmit={handleSubmit(RegisterHandler)}
        className="w-1/2 py-5 gap-3 flex flex-col justify-center items-center px-10 border-2 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Register</h2>

        <input
          {...register("username", { required: true })}
          className="outline-0 border-b w-3/4 p-1 text-2xl"
          type="text"
          placeholder="username"
        />
        <input
          {...register("email", { required: true })}
          className="outline-0 border-b w-3/4 p-1 text-2xl"
          type="email"
          placeholder="gmail"
        />

        <input
          {...register("password", { required: true })}
          className="outline-0 border-b w-3/4 p-1 text-2xl"
          type="password"
          placeholder="********"
        />

        <input
          className="border w-3/4 rounded-2xl text-xl my-3 py-2 bg-black text-white hover:bg-gray-800"
          type="submit"
          value="Register"
        />

        <p>
          Already have an account?
          <Link className="text-blue-400 border-b ml-2" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

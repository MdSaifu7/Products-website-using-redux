import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncLoginUser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";
const Login = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoginHandler = async (data) => {
    await dispatch(asyncLoginUser(data));
    reset();
    navigate("/");
  };
  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSubmit(LoginHandler)}
        className="w-1/2 py-5 gap-3 flex flex-col justify-center items-center px-10 border-2 rounded-2xl"
      >
        <input
          {...register("email", { required: true })}
          className="outline-0 border-b w-3/4 p-1 px-[1%] text-2xl"
          type="email"
          placeholder="Saifu@gamil.com"
        />
        <input
          {...register("password", { required: true })}
          className="outline-0 border-b w-3/4  p-1 px-[1%] text-2xl"
          type="password"
          placeholder="********"
        />
        <input
          className=" border-1 w-3/4  rounded-2xl  text-xl my-3"
          type="submit"
        />
        <p>
          Don't have account ?
          <Link className="text-blue-400 border-b-1 ml-2" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

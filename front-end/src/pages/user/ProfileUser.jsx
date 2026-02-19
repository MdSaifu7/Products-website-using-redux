import { useDispatch, useSelector } from "react-redux";
import {
  asyncDeleteUser,
  asyncLogoutUser,
  asyncupdateuser,
} from "../../store/actions/userActions";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const ProfileUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer.data) || null;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      id: user.id,
      password: user.password,
      isAdmin: user.isAdmin,
    },
  });
  const updateForm = (updatedUser) => {
    updatedUser.id = user.id;
    console.log(updatedUser);
    dispatch(asyncupdateuser(updatedUser));
  };
  const deleteHandler = (id) => {
    dispatch(asyncDeleteUser(id));
    navigate("/");
  };

  const logoutHandler = () => {
    dispatch(asyncLogoutUser());
    navigate("/login");
  };

  return user ? (
    <div className="w-full flex justify-center items-center ">
      <form
        onSubmit={handleSubmit(updateForm)}
        className="w-1/2 py-5 gap-3 flex flex-col justify-center items-center px-10 border-2 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Profile</h2>

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
          value="Update Profile"
        />

        <button
          onClick={() => {
            logoutHandler();
          }}
          type="button"
          className="border w-3/4 rounded-2xl text-xl my-3 py-2 bg-red-400 text-white hover:bg-red-500"
        >
          Logout
        </button>

        <button
          onClick={() => {
            deleteHandler(user.id);
          }}
          type="button"
          className="border w-3/4 rounded-2xl text-xl my-3 py-2 bg-red-500 text-white hover:bg-red-600"
        >
          Delete Profile
        </button>
      </form>
    </div>
  ) : (
    <div className="text-red-300">"Loading user"</div>
  );
};

export default ProfileUser;

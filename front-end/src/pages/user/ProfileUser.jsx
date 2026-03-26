import { useDispatch, useSelector } from "react-redux";
import {
  asyncDeleteUser,
  asyncLogoutUser,
  asyncupdateuser,
} from "../../store/actions/userActions";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import compressImage from "../../utility/compress.img.js";
import { useState } from "react";

const ProfileUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer.data) || null;
  const [imageFile, setImageFile] = useState(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      image: user?.image,
    },
  });

  const updateForm = async (updatedUser) => {
    const formData = new FormData();
    formData.append("username", updatedUser.username);
    formData.append("email", updatedUser.email);
    formData.append("password", updatedUser.password);
    formData.append("_id", user._id);

    if (imageFile) {
      const compressed = await compressImage(imageFile, 0.5, 600);
      formData.append("image", compressed, "profile.jpg");
      dispatch(asyncupdateuser(formData));
    } else {
      updatedUser._id = user._id;
      dispatch(asyncupdateuser(updatedUser));
    }
  };

  const deleteHandler = (id) => {
    dispatch(asyncDeleteUser(id));
    navigate("/");
  };

  const logoutHandler = () => {
    dispatch(asyncLogoutUser());
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-zinc-800 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-zinc-500 tracking-widest uppercase font-medium">
            Loading
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4 py-12">
      {/* Subtle background pattern */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d4d4d8 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Floating accent bar */}
        <div className="absolute -top-px left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        <div className="bg-white border border-zinc-200 shadow-[0_8px_48px_-12px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden">
          {/* Header band */}
          <div className="relative bg-zinc-900 px-8 pt-8 pb-14">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] tracking-[0.2em] text-zinc-400 uppercase font-semibold">
                Account
              </span>
              <span className="text-[10px] tracking-[0.15em] text-zinc-500 uppercase">
                Member
              </span>
            </div>
            <h1 className="text-white text-xl font-semibold tracking-tight">
              {user?.username || "Your Profile"}
            </h1>
            <p className="text-zinc-400 text-xs mt-0.5">{user?.email}</p>

            {/* Decorative circles */}
            <div className="absolute right-6 top-4 w-24 h-24 rounded-full border border-zinc-700 opacity-30" />
            <div className="absolute right-10 top-8 w-14 h-14 rounded-full border border-zinc-600 opacity-20" />
          </div>

          {/* Avatar overlapping the header */}
          <div className="flex justify-center -mt-10 mb-2 relative z-10">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-br from-zinc-300 to-zinc-100 shadow-lg">
                <img
                  src={
                    user?.image ||
                    "https://ui-avatars.com/api/?name=" +
                      (user?.username || "User") +
                      "&background=18181b&color=fff&size=128"
                  }
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {/* Online dot */}
              <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
            </div>
          </div>

          {/* Form section */}
          <div className="px-7 pb-7">
            <form
              onSubmit={handleSubmit(updateForm)}
              className="flex flex-col gap-3"
            >
              {/* Username */}
              <div className="group">
                <label className="block text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mb-1.5 ml-1">
                  Username
                </label>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  placeholder="your_username"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-zinc-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(24,24,27,0.06)]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mb-1.5 ml-1">
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-zinc-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(24,24,27,0.06)]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mb-1.5 ml-1">
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-zinc-800 focus:bg-white focus:shadow-[0_0_0_3px_rgba(24,24,27,0.06)]"
                />
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mb-1.5 ml-1">
                  Profile Photo
                </label>
                <label className="flex items-center gap-3 w-full bg-zinc-50 border border-dashed border-zinc-300 rounded-xl px-4 py-2.5 cursor-pointer hover:border-zinc-500 hover:bg-zinc-100 transition-all duration-200 group">
                  <svg
                    className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs text-zinc-400 group-hover:text-zinc-600">
                    Upload new photo
                  </span>
                  <input
                    {...register("image")}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-1 w-full bg-zinc-900 text-white py-3 rounded-xl text-sm font-semibold tracking-wide hover:bg-zinc-700 active:scale-[0.98] transition-all duration-150 shadow-sm"
              >
                Save Changes
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-zinc-100" />
              <span className="text-[10px] text-zinc-300 tracking-widest uppercase">
                Account
              </span>
              <div className="flex-1 h-px bg-zinc-100" />
            </div>

            {/* Secondary actions */}
            <div className="flex gap-2.5">
              <button
                onClick={logoutHandler}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 text-xs font-semibold hover:bg-zinc-100 hover:border-zinc-300 active:scale-[0.97] transition-all duration-150"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>

              <button
                onClick={() => deleteHandler(user._id)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-100 bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 hover:border-red-200 active:scale-[0.97] transition-all duration-150"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[10px] text-zinc-400 mt-4 tracking-wide">
          Changes are saved immediately to your account
        </p>
      </div>
    </div>
  );
};

export default ProfileUser;

import axios from "../../api/AxiosConfig";

import { loadUser, removeUser } from "../reducers/userSlice";

export const currentUser = () => async (dispatch) => {
  try {
    const currUser = JSON.parse(localStorage.getItem("user"));

    if (currUser) {
      dispatch(loadUser(currUser));
    }
  } catch (error) {
    console.log(error);
  }
};

export const asyncLogoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeUser());
  } catch (error) {
    console.log(error);
  }
};

export const asyncupdateuser = (updatedUser) => async (dispatch) => {
  try {
    let id;

    // ✅ Check if it's FormData
    if (updatedUser instanceof FormData) {
      id = updatedUser.get("_id");
    } else {
      id = updatedUser._id;
    }

    const user = await axios.patch("/auth/users/" + id, updatedUser);

    dispatch(loadUser(user.data.user));
    localStorage.setItem("user", JSON.stringify(user.data.user));
  } catch (error) {
    console.log(error);
  }
};

export const asyncCart = (user) => async (dispatch) => {
  try {
    const res = await axios.patch("/auth/user/cart", user);

    dispatch(loadUser(res.data.user));
    localStorage.setItem("user", JSON.stringify(res.data.user));
  } catch (error) {
    console.log(error);
  }
};

export const asyncLoginUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/login", user);

    localStorage.setItem("user", JSON.stringify(res.data.user));
    dispatch(currentUser());
    return true;
  } catch (error) {
    console.log(error.response?.data);
    return false;
  }
};

export const asyncRegisterUser = (user) => async () => {
  try {
    await axios.post("auth/register", user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const asyncDeleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete("/users/" + id);

    dispatch(asyncLogoutUser());
  } catch (error) {
    console.log(error);
  }
};

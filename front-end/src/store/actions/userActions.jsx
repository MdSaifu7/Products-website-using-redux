import axios from "../../api/AxiosConfig";
import { loadUser, removeUser } from "../reducers/userSlice";

export const currentUser = () => async (dispatch) => {
  try {
    const currUser = JSON.parse(localStorage.getItem("user"));

    if (currUser) {
      dispatch(loadUser(currUser));
    } else {
      console.log("User not found");
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
    await axios.patch(`/users/` + updatedUser.id, updatedUser);

    dispatch(loadUser(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
};

export const asyncLoginUser = (user) => async () => {
  try {
    const res = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );

    localStorage.setItem("user", JSON.stringify(res.data[0]));
  } catch (error) {
    console.log(error);
  }
};

export const asyncRegisterUser = (user) => async () => {
  try {
    await axios.post("/users", user);
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

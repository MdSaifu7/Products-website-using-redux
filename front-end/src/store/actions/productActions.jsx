import axios from "../../api/AxiosConfig";
import { loadproduct } from "../reducers/productSlice";
// import { loadUser } from "../reducers/userSlice";

export const getAsyncProduct = () => async (dispatch) => {
  const res = await axios.get("/gadgets/products");

  dispatch(loadproduct(res.data));
};

export const asyncCreateProduct = (product) => async (dispatch) => {
  try {
    const res = await axios.post("/gadgets/create/product", product);
    // dispatch(getAsyncProduct());
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const asyncUpdateProduct = (product) => async (dispatch) => {
  try {
    const res = await axios.patch("/products/" + product.id, product);
    dispatch(getAsyncProduct());
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const asyncDeleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete("/products/" + id);
    dispatch(getAsyncProduct());
  } catch (error) {
    console.log(error);
  }
};

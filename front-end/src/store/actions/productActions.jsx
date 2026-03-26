import axios from "../../api/AxiosConfig";
import { loadproduct } from "../reducers/productSlice";
// import { loadUser } from "../reducers/userSlice";

export const getAsyncProduct = () => async (dispatch) => {
  const res = await axios.get("/gadgets/products");
  console.log("Get async product call");
  console.log(res.data);

  dispatch(loadproduct(res.data.products));
};

export const asyncCreateProduct = (product) => async (dispatch) => {
  try {
    await axios.post("/gadgets/create/product", product);
    dispatch(getAsyncProduct());
  } catch (error) {
    console.log(error);
  }
};

export const asyncUpdateProduct = (product) => async (dispatch) => {
  try {
    let id;
    if (product instanceof FormData) {
      id = product.get("_id");
    } else {
      id = product._id;
    }
    const res = await axios.patch("/gadgets/update/product/" + id, product);
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

import { loadQueryProduct } from "../reducers/queryProductSlice";
import axios from "../../api/AxiosConfig";
export const getAsyncQueryProduct = (search) => async (dispatch) => {
  const res = await axios.get(`/gadgets/search?search=${search}`);

  dispatch(loadQueryProduct(res.data.results));
};

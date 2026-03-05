import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/AxiosConfig";
import { loadproduct } from "../store/reducers/productSlice";
const useInfiniteProducts = () => {
  const products = useSelector((state) => state.productReducer.data);
  const [hasMore, SetHasMore] = useState(true);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const { data } = await axios.get(
      `/products?_start=${products.length}&_limit=6`
    );

    if (data.length == 0) {
      SetHasMore(false);
      return;
    }

    await dispatch(loadproduct([...products, ...data]));
  };

  useEffect(() => {
    fetchProducts();
    
  }, []);
  return { fetchProducts, hasMore, products };
};
export default useInfiniteProducts;

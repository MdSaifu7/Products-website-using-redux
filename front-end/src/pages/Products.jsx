import { useSelector } from "react-redux";
import useInfiniteProducts from "../components/useInfiniteProducts";
import { Link } from "react-router-dom";
import { asyncupdateuser } from "../store/actions/userActions";
import { Suspense } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const user = useSelector((state) => state.userReducer.data);
  const { products, hasMore, fetchProducts } = useInfiniteProducts();
  const navigate = useNavigate();

  const cartHandler = (user, product) => {
    if (!user) {
      navigate("/login");
      return;
    }
    const copyuser = { ...user, cart: user.cart.map((c) => ({ ...c })) };
    console.log(copyuser);
    const x = copyuser.cart.findIndex((p) => p.id == product.id);

    if (x == -1) {
      copyuser.cart.push({ ...product, quantity: 1 });
    } else {
      copyuser.cart[x].quantity += 1;
    }
    console.log(copyuser);
    dispatch(asyncupdateuser(copyuser));
  };

  const renderproduct =
    products?.length != 0 ? (
      products.map((product) => {
        return (
          <div
            id={product.id}
            key={product.id}
            className="flex flex-col gap-2 w-1/4 text-[18px] border p-2 rounded"
          >
            <img className="w-full h-[18vh]" src={product.image} />
            <h1>{product.title}</h1>
            <p>$ {product.price}</p>
            <h1>{product.description.slice(0, 100)}...</h1>
            <button
              onClick={() => {
                cartHandler(user, product);
              }}
              className="bg-yellow-600 py-1 px-3 rounded font-normal "
            >
              Add to cart
            </button>
            <Link
              className="w-full text-center block"
              to={`/admin/product/${product.id}`}
            >
              More info{" "}
            </Link>
          </div>
        );
      })
    ) : (
      <h1 className="text-center w-full">No products are there...</h1>
    );

  return (
    <div className="w-full text-2xl text-pink-500 text-center">
      Products Page
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="text-white w-full h-full flex justify-center flex-wrap gap-2 p-3">
          <Suspense fallback={<h1>Loading...</h1>}>{renderproduct}</Suspense>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Products;

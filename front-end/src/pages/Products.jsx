import { useDispatch, useSelector } from "react-redux";
import useInfiniteProducts from "../components/useInfiniteProducts";
import { Link } from "react-router-dom";
import { asyncupdateuser, asyncCart } from "../store/actions/userActions";
import { Suspense } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const user = useSelector((state) => state.userReducer.data);
  const { products, hasMore, fetchProducts } = useInfiniteProducts();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartHandler = (user, product) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const copyuser = { ...user, cart: user.cart.map((c) => ({ ...c })) };

    const x = copyuser.cart.findIndex((p) => p._id == product._id);

    if (x == -1) {
      copyuser.cart.push({ ...product, quantity: 1 });
    } else {
      copyuser.cart[x].quantity += 1;
    }
    console.log("copyuser after cart update");
    console.log(copyuser);
    dispatch(asyncCart(copyuser));
  };

  const renderproduct =
    products?.length != 0 ? (
      products.map((product) => {
        return (
          <div
            id={product.id}
            key={product.id}
            className="flex flex-col w-full sm:w-[47%] md:w-[31%] lg:w-[23%] bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
          >
            <img className="w-full h-52 object-cover" src={product.imageUrl} />
            <div className="flex flex-col flex-1 gap-2 p-4">
              <h1 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2">
                {product.title}
              </h1>
              <p className="text-lg font-extrabold text-emerald-600">
                $ {product.price}
              </p>
              <h1 className="text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1">
                {product.description.slice(0, 100)}...
              </h1>
              <button
                onClick={() => {
                  cartHandler(user, product);
                }}
                className="mt-2 w-full bg-slate-900 hover:bg-slate-700 active:scale-95 text-white text-xs font-semibold tracking-wide py-2.5 rounded-xl transition-all duration-150"
              >
                Add to cart
              </button>
              <Link
                className="w-full text-center block text-xs text-slate-400 hover:text-slate-700 underline underline-offset-2 transition-colors mt-0.5"
                to={`/admin/product/${product.id}`}
              >
                More info
              </Link>
            </div>
          </div>
        );
      })
    ) : (
      <h1 className="text-center w-full text-sm text-slate-400 py-20">
        No products are there...
      </h1>
    );

  return (
    <div className="w-full min-h-screen bg-slate-50 px-4 sm:px-8 lg:px-16 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-2">
        Products
      </h1>
      <p className="text-center text-xs text-slate-400 tracking-widest uppercase mb-8">
        Browse our collection
      </p>

      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={
          <h4 className="text-center text-xs text-slate-400 tracking-widest uppercase py-8">
            Loading...
          </h4>
        }
        endMessage={
          <p className="text-center text-xs text-slate-400 tracking-widest uppercase py-10">
            ✦ You have seen it all ✦
          </p>
        }
      >
        <div className="text-white w-full h-full flex justify-center flex-wrap gap-4">
          <Suspense
            fallback={<h1 className="text-sm text-slate-400">Loading...</h1>}
          >
            {renderproduct}
          </Suspense>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Products;

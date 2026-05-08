import { useDispatch, useSelector } from "react-redux";
import useInfiniteProducts from "../components/useInfiniteProducts";
import { Link } from "react-router-dom";
import { asyncCart } from "../store/actions/userActions";
import { Suspense, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { getAsyncQueryProduct } from "../store/actions/queryProductActions";
import { toast } from "react-toastify";

const Products = () => {
  const user = useSelector((state) => state.userReducer.data);
  let { products, hasMore, fetchProducts } = useInfiniteProducts();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const cartHandler = async (user, product) => {
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
    dispatch(asyncCart(copyuser));
    toast.success("Added to cart");
  };

  const searchProduct = async (search) => {
    await dispatch(getAsyncQueryProduct(search));
    navigate("/query/result");
  };

  const renderproduct =
    products?.length != 0 ? (
      products.map((product) => (
        <div
          id={product._id}
          key={product._id}
          className="group flex flex-col bg-white border border-zinc-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
          {/* Image */}
          <div className="relative overflow-hidden bg-zinc-50 h-52">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={product.imageUrl}
              alt={product.title}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-4 gap-3">
            <h2 className="text-sm font-semibold text-zinc-800 leading-snug line-clamp-2 tracking-tight">
              {product.title}
            </h2>

            <p className="text-base font-bold text-zinc-900">
              ${product.price}
            </p>

            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 flex-1">
              {product.description.slice(0, 100)}...
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => cartHandler(user, product)}
                className="w-full bg-zinc-900 hover:bg-zinc-700 active:scale-[0.98] text-white text-xs font-medium tracking-wide py-2.5 rounded-xl transition-all duration-150"
              >
                Add to cart
              </button>
              <Link
                className="w-full text-center text-xs text-zinc-400 hover:text-zinc-600 transition-colors py-0.5"
                to={`/product/detail/${product._id}`}
              >
                View details →
              </Link>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="w-full col-span-full flex flex-col items-center justify-center py-24 gap-2">
        <p className="text-2xl">🔍</p>
        <p className="text-sm text-zinc-400">No products found</p>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-[#fafafa] px-4 sm:px-8 lg:px-16 py-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight mb-1">
            Products
          </h1>
          <p className="text-sm text-zinc-400 tracking-widest uppercase">
            Browse our collection
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 max-w-xl mx-auto mb-10">
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchProduct(search)}
              className="w-full pl-10 pr-4 py-2.5 text-sm text-zinc-800 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-300 placeholder:text-zinc-400 transition"
            />
          </div>
          <button
            onClick={() => searchProduct(search)}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-700 active:scale-95 text-white text-sm font-medium rounded-xl transition-all duration-150 whitespace-nowrap"
          >
            Search
          </button>
        </div>

        {/* Grid */}
        <InfiniteScroll
          dataLength={products.length}
          next={fetchProducts}
          hasMore={hasMore}
          loader={
            <p className="text-center text-xs text-zinc-400 tracking-widest uppercase py-8 col-span-full">
              Loading...
            </p>
          }
          endMessage={
            <p className="text-center text-xs text-zinc-300 tracking-widest uppercase py-10 col-span-full">
              — end of catalogue —
            </p>
          }
        >
          <Suspense
            fallback={
              <p className="text-center text-xs text-zinc-400 py-10 col-span-full">
                Loading...
              </p>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {renderproduct}
            </div>
          </Suspense>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Products;

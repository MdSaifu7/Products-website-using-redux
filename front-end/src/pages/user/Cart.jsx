import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncCart } from "../../store/actions/userActions";

const Cart = () => {
  const user = useSelector((state) => state.userReducer.data);
  const dispatch = useDispatch();

  const incrementQuantity = (user, indx) => {
    const copyUser = { ...user, cart: user.cart.map((ci) => ({ ...ci })) };
    copyUser.cart[indx].quantity += 1;
    dispatch(asyncCart(copyUser));
  };

  const decrementQuantity = (user, indx) => {
    const copyUser = { ...user, cart: user.cart.map((ci) => ({ ...ci })) };
    if (copyUser.cart[indx].quantity === 1) {
      copyUser.cart.splice(indx, 1);
    } else {
      copyUser.cart[indx].quantity -= 1;
    }
    dispatch(asyncCart(copyUser));
  };

  const removeCartHandler = (user, indx) => {
    const copyUser = { ...user, cart: user.cart.map((ci) => ({ ...ci })) };
    copyUser.cart.splice(indx, 1);
    dispatch(asyncCart(copyUser));
  };

  const totalAmount = user?.cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = user?.cart?.reduce((acc, item) => acc + item.quantity, 0);

  const renderProducts =
    user?.cart?.length > 0 ? (
      user.cart.map((product, indx) => (
        <div
          key={product._id}
          className="flex flex-col md:flex-row items-center gap-5 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
        >
          {/* Image */}
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-[100px] h-[100px] object-contain bg-gray-50 rounded-xl p-2"
          />

          {/* Title + Price */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-sm font-semibold text-gray-800">
              {product.title}
            </h1>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-1">
              Unit price: ${product.price}
            </p>
            <p className="text-xs text-amber-500 mt-1 font-medium">
              Qty: {product.quantity}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
            <button
              onClick={() => decrementQuantity(user, indx)}
              className="text-gray-400 hover:text-red-400 text-lg font-bold transition"
            >
              −
            </button>
            <span className="text-gray-800 font-semibold text-sm w-4 text-center">
              {product.quantity}
            </span>
            <button
              onClick={() => incrementQuantity(user, indx)}
              className="text-gray-400 hover:text-amber-500 text-lg font-bold transition"
            >
              +
            </button>
          </div>

          {/* Item Total */}
          <div className="text-amber-600 font-semibold text-sm">
            ${(product.price * product.quantity).toFixed(2)}
          </div>

          {/* Remove */}
          <button
            onClick={() => removeCartHandler(user, indx)}
            className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 hover:text-red-400 border border-gray-200 hover:border-red-200 px-4 py-2 rounded-xl transition"
          >
            Remove
          </button>
        </div>
      ))
    ) : (
      <div className="text-center mt-20">
        <p className="text-4xl mb-3">🛒</p>
        <p className="text-gray-400 text-sm tracking-widest uppercase">
          Your cart is empty
        </p>
      </div>
    );

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{
        backgroundColor: "#fafafa",
        backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 tracking-wide mb-8">
          Shopping Cart
        </h1>

        {/* Cart Items */}
        <div className="flex flex-col gap-4">{renderProducts}</div>

        {/* Summary */}
        {user?.cart?.length > 0 && (
          <div className="mt-8 bg-white border border-gray-100 rounded-2xl px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
            <div>
              <h2 className="text-[10px] text-gray-400 tracking-widest uppercase mb-3">
                Cart Summary
              </h2>
              <p className="text-sm text-gray-500">
                Total Items:{" "}
                <span className="text-gray-800 font-semibold">
                  {totalItems}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Total Price:{" "}
                <span className="text-amber-500 font-semibold text-base">
                  ${totalAmount.toFixed(2)}
                </span>
              </p>
            </div>

            <button className="py-3 px-8 rounded-xl text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md shadow-amber-200">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

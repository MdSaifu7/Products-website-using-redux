import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncCart } from "../../store/actions/userActions";

const Cart = () => {
  const user = useSelector((state) => state.userReducer.data);
  const dispatch = useDispatch();

  const incrementQuantity = (user, indx) => {
    const copyUser = {
      ...user,
      cart: user.cart.map((ci) => ({ ...ci })),
    };

    copyUser.cart[indx].quantity += 1;
    dispatch(asyncCart(copyUser));
  };

  const decrementQuantity = (user, indx) => {
    const copyUser = {
      ...user,
      cart: user.cart.map((ci) => ({ ...ci })),
    };

    if (copyUser.cart[indx].quantity === 1) {
      copyUser.cart.splice(indx, 1);
    } else {
      copyUser.cart[indx].quantity -= 1;
    }

    dispatch(asyncCart(copyUser));
  };

  const removeCartHandler = (user, indx) => {
    const copyUser = {
      ...user,
      cart: user.cart.map((ci) => ({ ...ci })),
    };

    copyUser.cart.splice(indx, 1);
    dispatch(asyncCart(copyUser));
  };

  const totalAmount = user?.cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = user?.cart?.reduce((acc, item) => acc + item.quantity, 0);

  const renderProducts = user?.cart?.length ? (
    user.cart.map((product, indx) => {
      return (
        <div
          key={product.id}
          className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white shadow-md rounded-xl p-4"
        >
          {/* Image */}
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-[120px] h-[120px] object-contain bg-gray-100 rounded-lg"
          />

          {/* Title + Price */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-lg font-semibold text-gray-800">
              {product.title}
            </h1>

            <p className="text-gray-500 mt-1">Price: $ {product.price}</p>

            {/* ✅ QUANTITY DISPLAY CLEARLY */}
            <p className="text-md mt-2 text-blue-600 font-semibold">
              Quantity: {product.quantity}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 border rounded-lg px-3 py-1 bg-gray-50">
            <button
              onClick={() => decrementQuantity(user, indx)}
              className="text-lg font-bold px-2 hover:text-red-500"
            >
              −
            </button>

            {/* MAIN QUANTITY NUMBER */}
            <span className="font-bold text-lg text-gray-800">
              {product.quantity}
            </span>

            <button
              onClick={() => incrementQuantity(user, indx)}
              className="text-lg font-bold px-2 hover:text-green-500"
            >
              +
            </button>
          </div>

          {/* Total Price */}
          <div className="text-gray-700 font-semibold">
            Total: $ {(product.price * product.quantity).toFixed(2)}
          </div>

          {/* Remove */}
          <button
            onClick={() => removeCartHandler(user, indx)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      );
    })
  ) : (
    <h1 className="text-center text-xl text-gray-500 mt-10">
      Your cart is empty 🛒
    </h1>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>

        <div className="flex flex-col gap-5">{renderProducts}</div>
        {user?.cart?.length > 0 && (
          <div className="mt-10 bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left Side - Summary */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Cart Summary
              </h2>

              <p className="text-gray-600 mt-2">
                Total Items: <span className="font-semibold">{totalItems}</span>
              </p>

              <p className="text-gray-600">
                Total Price:{" "}
                <span className="font-semibold text-lg text-green-600">
                  $ {totalAmount.toFixed(2)}
                </span>
              </p>
            </div>

            {/* Right Side - Button */}
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

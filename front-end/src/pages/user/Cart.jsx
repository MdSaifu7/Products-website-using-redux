import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncupdateuser } from "../../store/actions/userActions";

const Cart = () => {
  const user = useSelector((state) => state.userReducer.data);
  const dispatch = useDispatch();

  const incrementQuantity = (user, indx) => {
    const copyUser = {
      ...user,
      cart: user.cart.map((ci) => ({ ...ci })),
    };
    copyUser.cart[indx].quantity += 1;
    dispatch(asyncupdateuser(copyUser));
  };

  const decrementQuantity = (user, indx) => {
    const copyUser = {
      ...user,
      cart: user.cart.map((ci) => ({ ...ci })),
    };

    if (copyUser.cart[indx].quantity == 1) {
      copyUser.cart.splice(indx, 1);
    } else {
      copyUser.cart[indx].quantity -= 1;
    }
    dispatch(asyncupdateuser(copyUser));
  };

  const removeCartHandler = (user, indx) => {
    const copyuser = {
      ...user,
      cart: user.cart.map((ci) => ({ ...ci })),
    };
    copyuser.cart.splice(indx, 1);

    dispatch(asyncupdateuser(copyuser));
  };

  const renderproduct = user.cart ? (
    user.cart.map((product, indx) => {
      return (
        <div
          id={product.id}
          key={product.id}
          className="flex  gap-2  text-[18px] w-[800px] bg-gray-600 p-2 rounded justify-between items-center"
        >
          <img className="w-[20%] h-[14vh]" src={product.image} />
          <h1 className="font-bold text-2xl">{product.title}</h1>
          <p>$ {product.price}</p>

          <p className="flex gap-1 items-center">
            <button
              onClick={() => {
                decrementQuantity(user, indx);
              }}
              className="text-xl"
            >
              -
            </button>

            {product.quantity}
            <button
              onClick={() => {
                incrementQuantity(user, indx);
              }}
            >
              +
            </button>
          </p>

          <button
            onClick={() => {
              removeCartHandler(user, indx);
            }}
            className="bg-yellow-600 px-4 py-1 rounded"
          >
            Remove from cart
          </button>
        </div>
      );
    })
  ) : (
    <h1>Prodcust loading....</h1>
  );

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center mb-6">Your Cart</h1>
      <div className="w-full flex flex-col justify-center gap-5">
        {renderproduct}
      </div>
    </div>
  );
};

export default Cart;

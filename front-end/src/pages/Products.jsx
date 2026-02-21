import { useDispatch, useSelector } from "react-redux";
// import { getAsyncProduct } from "../store/actions/productActions";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { asyncupdateuser } from "../store/actions/userActions";
const Products = () => {
  const { data } = useSelector((state) => state.productReducer);
  const user = useSelector((state) => state.userReducer.data);
  console.log(user);
  const dispatch = useDispatch();
  // console.log(data);
  const cartHandler = (user, product) => {
    const copyuser = { ...user, cart: user.cart.map((c) => ({ ...c })) };
    console.log(copyuser);
    const x = copyuser.cart.findIndex((p) => p.id == product.id);
    // console.log(x);
    // if (x != -1) {
    //   copyuser.cart[x].quantity += 1;
    // } else {
    //   copyuser.cart.push({ productId: id, quantity: 1 });
    // }
    // console.log(copyuser);
    //

    if (x == -1) {
      copyuser.cart.push({ ...product, quantity: 1 });
    } else {
      copyuser.cart[x].quantity += 1;
    }
    console.log(copyuser);
    dispatch(asyncupdateuser(copyuser));
  };
  const renderproduct = data ? (
    data.map((product) => {
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
    <h1>Prodcust loading....</h1>
  );

  return (
    <div className="w-full text-2xl text-pink-500 text-center">
      Products Page
      <div className="text-white w-full h-full flex justify-start flex-wrap gap-2 p-3">
        {renderproduct}
      </div>
    </div>
  );
};

export default Products;

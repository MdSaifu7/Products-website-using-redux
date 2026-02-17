import React from "react";
import { useSelector } from "react-redux";
// import { getAsyncProduct } from "../store/actions/productActions";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Products = () => {
  const { data } = useSelector((state) => state.productReducer);
  // console.log(data);

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
          <button className="bg-yellow-600 py-1 px-3 rounded font-normal ">
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

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  asyncDeleteProduct,
  asyncUpdateProduct,
} from "../../store/actions/productActions";
const ProductDetails = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productReducer);
  const product = allProducts?.data?.find((p) => p.id == id);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.data);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      price: product?.price,
      description: product?.description,
      category: product?.category,
    },
  });
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const UpdateProductHandler = (updatedProduct) => {
    updatedProduct.id = product.id;
    dispatch(asyncUpdateProduct(updatedProduct));
    reset();
  };

  const deleteProductHandler = (id) => {
    dispatch(asyncDeleteProduct(id));
    navigate("/products");
  };

  return product ? (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex  gap-1">
        <div className="w-full bg-white flex-col rounded-3xl shadow-2xl overflow-hidden">
          {/* Product Image Section */}
          <div className="bg-gray-50 flex items-center justify-center p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-h-[300px] object-contain hover:scale-105 transition duration-500"
            />
          </div>

          {/* Product Details Section */}
          <div className="p-4 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              {product.title}
            </h1>

            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              {product.description}
            </p>

            <div className="text-3xl font-bold text-green-600 mb-8">
              ${product.price}
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
                Buy Now
              </button>

              <button className="flex-1 bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition">
                Add to Cart
              </button>
              <button
                onClick={() => {
                  deleteProductHandler(product.id);
                }}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-pink-700 transition"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
        {/* form div */}
        {user && user.isAdmin ? (
          <div className=" w-full">
            <form
              onSubmit={handleSubmit(UpdateProductHandler)}
              className="w-full bg-gray-700 py-5 gap-3 flex flex-col justify-center items-center border-2 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-4">Update Product</h2>

              <input
                {...register("image", { required: true })}
                className="outline-0 border-b w-3/4 p-1 text-2xl"
                type="text"
                placeholder="Image url"
              />

              <input
                {...register("title", { required: true })}
                className="outline-0 border-b w-3/4 p-1 text-2xl"
                type="text"
                placeholder="Title"
              />
              <input
                {...register("price", { required: true })}
                className="outline-0 border-b w-3/4 p-1 text-2xl"
                type="number"
                placeholder="Price"
              />

              <textarea
                {...register("description", { required: true })}
                className="outline-0 border-b w-3/4 p-0 text-2xl"
                placeholder="Enter decription here.."
              ></textarea>

              <input
                {...register("category", { required: true })}
                className="outline-0 border-b w-3/4 p-1 text-2xl"
                type="text"
                placeholder="category"
              />
              <input
                className="border w-3/4 rounded-2xl text-xl my-3 py-2 bg-black text-white hover:bg-gray-800"
                type="submit"
                value="Update Product"
              />
            </form>
          </div>
        ) : null}
      </div>
    </>
  ) : (
    "Loading..."
  );
};

export default ProductDetails;

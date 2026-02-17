import { nanoid } from "nanoid";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncCreateProduct } from "../../store/actions/productActions";
import { useDispatch } from "react-redux";
const CreateProduct = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CreateProductHandler = (product) => {
    product.id = nanoid();
    dispatch(asyncCreateProduct(product));
    // console.log(product);
    navigate("/products");
    reset();
  };

  return (
    <div className="w-full flex justify-center items-center ">
      <form
        onSubmit={handleSubmit(CreateProductHandler)}
        className="w-1/2 py-5 gap-3 flex flex-col justify-center items-center px-10 border-2 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Add Product</h2>

        <input
          {...register("Image", { required: true })}
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
          value="Create Product"
        />

        <p>
          Already have an account?
          <Link className="text-blue-400 border-b ml-2" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CreateProduct;

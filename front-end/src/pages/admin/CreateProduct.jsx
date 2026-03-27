import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncCreateProduct } from "../../store/actions/productActions";
import { useDispatch } from "react-redux";
import compressImage from "../../utility/compress.img";

const CreateProduct = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const CreateProductHandler = async (product) => {
    product.id = nanoid();

    const compressedImage = await compressImage(product.Image[0], 0.7);
    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("image", compressedImage);

    dispatch(asyncCreateProduct(formData));
    navigate("/");
    reset();
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-2">
            Product Management
          </p>
          <h1 className="text-4xl font-light text-stone-900 tracking-tight">
            New Product
          </h1>
          <div className="mt-4 h-px bg-stone-200 w-16" />
        </div>

        <form
          onSubmit={handleSubmit(CreateProductHandler)}
          className="space-y-6"
        >
          {/* Image Upload */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-400 mb-2 font-medium">
              Product Image
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}
            <input
              {...register("Image", { required: true })}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-stone-900 file:text-white hover:file:bg-stone-700 cursor-pointer"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-400 mb-2 font-medium">
              Title
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Product name"
              className="w-full bg-transparent border-b border-stone-200 focus:border-stone-700 py-3 text-stone-800 outline-none placeholder:text-stone-300"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-400 mb-2 font-medium">
              Price
            </label>
            <input
              {...register("price", { required: true })}
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full bg-transparent border-b border-stone-200 focus:border-stone-700 py-3 text-stone-800 outline-none placeholder:text-stone-300"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-400 mb-2 font-medium">
              Category
            </label>
            <input
              {...register("category", { required: true })}
              type="text"
              placeholder="e.g. Electronics, Apparel"
              className="w-full bg-transparent border-b border-stone-200 focus:border-stone-700 py-3 text-stone-800 outline-none placeholder:text-stone-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-400 mb-2 font-medium">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              rows={4}
              placeholder="Describe the product…"
              className="w-full bg-transparent border-b border-stone-200 focus:border-stone-700 py-3 text-stone-800 outline-none resize-none placeholder:text-stone-300"
            />
          </div>

          <div className="h-px bg-stone-100" />

          <button
            type="submit"
            className="w-full py-4 bg-stone-900 text-white text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors duration-200"
          >
            Create Product
          </button>

          <p className="text-center text-sm text-stone-400">
            Back to{" "}
            <Link
              to="/products"
              className="text-stone-600 hover:text-stone-900 underline underline-offset-4"
            >
              All Products
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

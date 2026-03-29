import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  asyncDeleteProduct,
  asyncUpdateProduct,
} from "../../store/actions/productActions";
import compressImage from "../../utility/compress.img";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.productReducer);
  const navigate = useNavigate();
  const product = allProducts?.data?.find((p) => p._id == id);
  const user = useSelector((state) => state.userReducer.data);

  const [preview, setPreview] = useState(null);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      image: product?.imageUrl,
      title: product?.title,
      price: product?.price,
      description: product?.description,
    },
  });

  const UpdateProductHandler = async (updatedProduct) => {
    const formData = new FormData();

    const compressedImg = preview ? await compressImage(preview, 0.5) : null;

    formData.append("title", updatedProduct.title);
    formData.append("price", updatedProduct.price);
    formData.append("description", updatedProduct.description);
    formData.append("_id", product._id);

    if (preview) {
      formData.append("image", compressedImg);
    }

    await dispatch(asyncUpdateProduct(formData));

    reset({
      title: updatedProduct.title,
      price: updatedProduct.price,
      description: updatedProduct.description,
    });

    setPreview(null);
  };

  const deleteProductHandler = async (id) => {
    await dispatch(asyncDeleteProduct(id));
    navigate("/");
  };

  const handleImage = (e) => {
    setPreview(e.target.files[0]);
  };

  if (!product)
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-400 text-sm tracking-widest uppercase">
        Loading…
      </div>
    );

  return (
    <div
      className="
      min-h-screen bg-stone-50 
      flex flex-col lg:flex-row 
      items-center lg:items-start 
      justify-center 
      px-4 py-8 lg:py-12 
      gap-6 lg:gap-10
    "
    >
      {/* LEFT SECTION */}
      <div className="w-full max-w-md lg:max-w-lg">
        {/* Title */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-light text-stone-900 tracking-tight">
            {product.title}
          </h1>
          <div className="mt-3 lg:mt-4 h-px bg-stone-200 w-16" />
        </div>

        {/* Image */}
        <div className="w-full bg-white border border-stone-100 rounded-lg overflow-hidden mb-6 lg:mb-8">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-48 sm:h-64 lg:max-h-72 object-contain p-4 lg:p-6"
          />
        </div>

        {/* Description */}
        <p className="text-stone-500 text-sm sm:text-base leading-relaxed mb-6 lg:mb-8">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-2xl sm:text-3xl font-light text-stone-900 mb-6 lg:mb-8 text-center">
          ${product.price}
        </p>
      </div>

      {/* RIGHT SECTION (ADMIN) */}
      {user?.isAdmin && (
        <div className="w-full max-w-md lg:max-w-lg">
          <div className="mb-6 lg:mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-2 text-center border-t-2 p-2 pt-3">
              Admin
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-stone-900 tracking-tight text-center">
              Update Product
            </h2>
            <div className="mt-3 lg:mt-4 h-px bg-stone-200 w-16" />
          </div>

          <form
            onSubmit={handleSubmit(UpdateProductHandler)}
            className="space-y-4 lg:space-y-6 mb-4"
          >
            {/* Image Input */}

            <label className="block">
              <span className="block text-xs tracking-widest uppercase text-stone-400 mb-3 font-medium">
                Product Image
              </span>

              <div className="relative w-full border border-stone-200 rounded-lg px-4 py-3 flex items-center justify-between hover:border-stone-400 transition">
                <span className="text-sm text-stone-500 truncate">
                  {preview ? preview.name : "Choose an image..."}
                </span>

                <span className="text-xs text-stone-400 uppercase tracking-wider">
                  Browse
                </span>

                <input
                  type="file"
                  onChange={handleImage}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </label>

            {/* Title & Price */}
            {[
              { name: "title", type: "text", placeholder: "Title" },
              { name: "price", type: "number", placeholder: "Price" },
            ].map(({ name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-xs tracking-widest uppercase text-stone-400 mb-2 font-medium">
                  {placeholder}
                </label>
                <input
                  {...register(name, { required: true })}
                  type={type}
                  step={type === "number" ? "0.01" : undefined}
                  placeholder={placeholder}
                  className="w-full bg-transparent border-b border-stone-200 focus:border-stone-700 py-2 sm:py-3 text-stone-800 outline-none placeholder:text-stone-300"
                />
              </div>
            ))}

            {/* Description */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-stone-400 mb-2 font-medium">
                Description
              </label>
              <textarea
                {...register("description", { required: true })}
                rows={4}
                placeholder="Product description…"
                className="w-full bg-transparent border-b border-stone-200 focus:border-stone-700 py-2 sm:py-3 text-stone-800 outline-none resize-none placeholder:text-stone-300"
              />
            </div>

            <div className="h-px bg-stone-100" />

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 sm:py-4 bg-stone-900 text-white text-xs sm:text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors duration-200"
            >
              Update Product
            </button>
          </form>
          {/* Delete */}
          <div className="flex justify-center lg:justify-start">
            <button
              onClick={() => deleteProductHandler(product._id)}
              className="py-2 px-4 bg-red-500 text-white text-xs sm:text-sm tracking-widest uppercase hover:bg-red-600 transition-colors duration-200"
            >
              Delete Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

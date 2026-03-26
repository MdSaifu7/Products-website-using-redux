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
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.productReducer);

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
    const fromData = new FormData();
    const compressedImg = preview ? await compressImage(preview, 0.5) : null;
    fromData.append("title", updatedProduct.title);
    fromData.append("price", updatedProduct.price);
    fromData.append("description", updatedProduct.description);
    fromData.append("_id", product._id);
    if (preview) {
      fromData.append("image", compressedImg);
    }
    await dispatch(asyncUpdateProduct(fromData));
    reset({
      title: updatedProduct.title,
      price: updatedProduct.price,
      description: updatedProduct.description,
    });
    setPreview(null);
  };

  const deleteProductHandler = (id) => {
    dispatch(asyncDeleteProduct(id));
    navigate("/products");
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
    <div className="min-h-screen bg-stone-50 flex items-start justify-center px-4 py-12 gap-8">
      {/* Left — Product Info */}
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-stone-900 tracking-tight">
            {product.title}
          </h1>
          <div className="mt-4 h-px bg-stone-200 w-16" />
        </div>

        {/* Image */}
        <div className="w-full bg-white border border-stone-100 rounded-lg overflow-hidden mb-8">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full max-h-72 object-contain p-6"
          />
        </div>

        {/* Description */}
        <p className="text-stone-500 text-base leading-relaxed mb-8">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-3xl font-light text-stone-900 mb-8 text-center">
          ${product.price}
        </p>
      </div>

      {/* Right — Update Form (admin only) */}
      {user?.isAdmin && (
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-2">
              Admin
            </p>
            <h2 className="text-3xl font-light text-stone-900 tracking-tight">
              Update Product
            </h2>
            <div className="mt-4 h-px bg-stone-200 w-16" />
          </div>

          <form
            onSubmit={handleSubmit(UpdateProductHandler)}
            className="space-y-6"
          >
            <input
              type="file"
              className="text-black bg-yellow-500 p-4 rounded-2xl "
              onChange={handleImage}
            />

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
                  className="w-full bg-transparent border-b border-stone-200 focus:border-stone-700 py-3 text-stone-800 outline-none placeholder:text-stone-300"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs tracking-widest uppercase text-stone-400 mb-2 font-medium">
                Description
              </label>
              <textarea
                {...register("description", { required: true })}
                rows={4}
                placeholder="Product description…"
                className="w-full bg-transparent border-b border-stone-200 focus:border-stone-700 py-3 text-stone-800 outline-none resize-none placeholder:text-stone-300"
              />
            </div>

            <div className="h-px bg-stone-100" />

            <button
              type="submit"
              className="w-full py-4 bg-stone-900 text-white text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors duration-200"
            >
              Update Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

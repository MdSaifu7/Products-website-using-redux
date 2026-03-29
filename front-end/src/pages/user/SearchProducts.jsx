import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const SearchProducts = () => {
  const queryProduct = useSelector((state) => state.queryProductReducer.data);

  if (!queryProduct || queryProduct.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h2 className="text-xl font-semibold text-gray-600">
          No product found!
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* 🔍 Heading */}
      <h1 className="text-2xl font-bold mb-6">Search Results</h1>

      {/* 🧱 Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {queryProduct.map((item) => (
          <div
            key={item._id}
            className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >
            {/* 📷 Image */}
            <img
              src={item.imageUrl || "https://via.placeholder.com/150"}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            {/* 📝 Title */}
            <h2 className="text-lg font-semibold line-clamp-2">{item.title}</h2>

            {/* 💰 Price */}
            <p className="text-blue-600 font-bold mt-2">${item.price}</p>

            {/* 🛒 Button */}
            <Link
              className="w-full text-center block text-xs text-slate-400 hover:text-slate-700 underline underline-offset-2 transition-colors mt-0.5"
              to={`/product/detail/${item._id}`}
            >
              More info
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProducts;

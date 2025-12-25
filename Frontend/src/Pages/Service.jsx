import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import { useSelector } from "react-redux";
import useGetAllProducts from "../customHooks/getAllProduct.js";
import useGetCurrentUser from "../customHooks/getCurrentUser.js";


const Service = () => {
  const navigate = useNavigate();
    const { productData } = useSelector((state) => state.product);
  useGetCurrentUser(); // fetches user if needed
  const { userData } = useSelector((state) => state.user);
  useGetAllProducts();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

 
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
    {userData?.email === adminEmail && (
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-2xl font-semibold">Products</h2>

    <button
      onClick={() => navigate("/addproduct")}
      className="px-5 py-2 border border-black rounded-full text-sm hover:bg-black hover:text-white transition"
    >
      Add Product
    </button>
  </div>
)}


      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productData.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg bg-white hover:shadow-md transition"
          >
            {/* Image */}
            <div className="h-40 bg-gray-50 flex items-center justify-center rounded-t-lg">
              {p.photo?.url && (
                <img
                  src={p.photo.url}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-1.5">
              <h3 className="font-medium text-base truncate">
                {p.name}
              </h3>

              <p className="text-xs text-gray-500">
                {p.category}
              </p>

              <p className="font-semibold text-sm">
                ₹{p.price}
              </p>

              <p className="text-xs text-gray-600 line-clamp-2">
                {p.description}
              </p>

              {/* Buy Button */}
              <button
                className="mt-3 w-full text-sm border border-black py-2 rounded-md hover:bg-black hover:text-white transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;

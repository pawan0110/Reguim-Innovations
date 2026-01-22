import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import { useSelector } from "react-redux";
import useGetAllProducts from "../customHooks/getAllProduct.js";
import useGetCurrentUser from "../customHooks/getCurrentUser.js";
import { toast } from "react-toastify";

const Service = () => {
  const navigate = useNavigate();
  const { productData } = useSelector((state) => state.product);
  useGetCurrentUser(); // fetches user if needed
  const { userData } = useSelector((state) => state.user);
  useGetAllProducts();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
    document.body.appendChild(script);
  });
};

const handleBuy = async (productId, userId) => {
  try {
    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    // Create order
    const orderRes = await api.post("/api/payment/create-order", {
      productId,
    });

    const { id, amount } = orderRes.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount,
      currency: "INR",
      name: "Regium Innovations",
      description: "Product Purchase",
      order_id: id,

      handler: async function (response) {
        try {
          await api.post("/api/payment/verify-payment", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            productId,
            userId,
          });

          toast.success("Payment successful");
        } catch (error) {
          console.error(error);
          toast.error("Payment verification failed");
        }
      },

      prefill: {
        name: "Test User",
        email: "test@example.com",
      },

      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled");
        },
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error(response.error);
      toast.error("Payment failed");
    });

    rzp.open();
  } catch (error) {
    console.error("Payment Error:", error);
    toast.error("Something went wrong while processing payment");
  }
};



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
              <h3 className="font-medium text-base truncate">{p.name}</h3>

              <p className="text-xs text-gray-500">{p.category}</p>

              <p className="font-semibold text-sm">₹{p.price}</p>

              <p className="text-xs text-gray-600 line-clamp-2">
                {p.description}
              </p>

              {/* Buy Button */}
              <button
                className="mt-3 w-full text-sm border border-black py-2 rounded-md hover:bg-black hover:text-white transition"
                onClick={() => handleBuy(p._id, userData?._id)}
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

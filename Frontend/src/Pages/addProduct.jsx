import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api.js";
import { toast } from "react-toastify";
import { setProductData } from "../redux/productSlice.js";
import getAllProducts from "../customHooks/getAllProduct.js";
const AddProduct = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.product);

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    photo: null,
  });

 getAllProducts();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => v && data.append(k, v));
      const res = await api.post("/api/product/addProduct", data);
      dispatch(setProductData([res.data, ...productData]));
      toast.success("Product added");
      setFormData({ name: "", description: "", category: "", price: "", photo: null });
      setImagePreview(null);
    } catch {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/api/product/${id}`);
    dispatch(setProductData(productData.filter(p => p._id !== id)));
    toast.success("Product deleted");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-10">Product Management</h1>

      {/* -------- FORM -------- */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-14 max-w-4xl mx-auto">
        <h2 className="text-xl font-medium mb-6">Add New Product</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="name"
            placeholder="Product name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="input"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="input"
            required
          />

          <label className="upload-box">
            <input type="file" name="photo" hidden onChange={handleChange} />
            {imagePreview ? (
              <img src={imagePreview} className="h-full object-contain" />
            ) : (
              <span className="text-sm text-gray-500">Upload image</span>
            )}
          </label>

          <textarea
            name="description"
            placeholder="Product description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="input md:col-span-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-black text-white py-2.5 rounded-lg hover:bg-gray-800"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>

      {/* -------- PRODUCT LIST -------- */}
      <h2 className="text-xl font-medium mb-6">All Products</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productData.map((p) => (
          <div key={p._id} className="border rounded-xl shadow-sm bg-white">
            <div className="h-56 bg-gray-50 flex items-center justify-center">
              {p.photo?.url && (
                <img
                  src={p.photo.url}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            <div className="p-5 space-y-2">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-sm text-gray-500">Category: {p.category}</p>
              <p className="font-medium">Price: ₹{p.price}</p>
              <p className="text-sm text-gray-600">{p.description}</p>

              <button
                onClick={() => handleDelete(p._id)}
                className="w-full mt-4 border border-red-600 text-red-600 py-2 rounded-lg hover:bg-red-600 hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* -------- Tailwind helpers -------- */}
      <style>{`
        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding: 0.6rem 0.9rem;
          outline: none;
        }
        .input:focus {
          border-color: black;
          box-shadow: 0 0 0 1px black;
        }
        .upload-box {
          height: 8rem;
          border: 2px dashed #d1d5db;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .upload-box:hover {
          border-color: black;
        }
      `}</style>
    </div>
  );
};

export default AddProduct;

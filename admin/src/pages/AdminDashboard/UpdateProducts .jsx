import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateProducts() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description:"",
    image: "",
  });
  const { id } = useParams();


  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/products/${id}`)
      .then((res) => {
        const { name, price, image,description } = res.data.data;
        setProduct({ name, price, image ,description});
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Failed to fetch product details", "error");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${BACKEND_URL}/api/products/${id}`, { ...product })
      .then(() => {
        Swal.fire("Updated!", "Your product has been updated.", "success");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update the product", "error");
      });
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-200 p-6">
  <div className="max-w-md w-full bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-200">
    {/* Header with Back Button */}
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        ✨ Update Product
      </h2>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Name</label>
        <input
          name="name"
          type="text"
          required
          value={product.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Price</label>
        <input
          name="price"
          type="number"
          required
          value={product.price}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      {/* description */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Price</label>
        <input
          name="description"
          type="text"
          required
          value={product.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Image URL</label>
        <input
          name="image"
          type="text"
          required
          value={product.image}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-[1.02] hover:cursor-pointer"
      >
        Update 🚀
      </button>
    </form>
  </div>
</div>

  );
}

export default UpdateProducts;

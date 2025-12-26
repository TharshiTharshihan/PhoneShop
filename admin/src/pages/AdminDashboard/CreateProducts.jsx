import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
//import "./Create.css";
import axios from "axios";
import Swal from "sweetalert2";

function CreateProducts() {
  const [name, setname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/api/products`, {
        name,
        price,
        image,
        category,
        description,
      })
      .then(() => {
        Swal.fire(
          " You Have Successfully created",
          "",
          "success"
        );
        navigate("/");
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred. Please try again. 😔",
        })
      );
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-green-100 to-blue-200 p-6">
      <div className="w-full md:max-w-xl bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-200">
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
            ✨ Create Product
          </h2>
        </div>

        <form onSubmit={handleAdd} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              required
              onChange={(e) => setname(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              required
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              required
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select
              required
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="official">Official</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Image URL
            </label>
            <input
              type="url"
              required
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProducts;

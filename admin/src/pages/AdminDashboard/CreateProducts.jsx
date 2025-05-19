import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
//import "./Create.css";
import axios from "axios";
import Swal from "sweetalert2";

function CreateProducts() {
  const [name, setname] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/api/products`, { name, price, image })
      .then(() => {
        Swal.fire(
          "Congratulations! You Have Successfully created 😊",
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
    <div className="max-w-md mx-auto mt-50 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create
      </h2>
      <form onSubmit={handleAdd} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name:</label>
          <input
            type="text"
            required
            onChange={(e) => setname(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price:</label>
          <input
            type="number"
            required
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Image URL:
          </label>
          <input
            type="url"
            required
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 hover:cursor-pointer"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateProducts;

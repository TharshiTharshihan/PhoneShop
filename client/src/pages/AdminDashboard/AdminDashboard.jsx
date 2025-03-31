import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (productId) => {
    navigate(`/update/${productId}`);
  };

  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/api/products/${id}`)
          .then(() => {
            setProducts(products.filter((product) => product._id !== id));
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to delete the product.", "error");
          });
      } else {
        Swal.fire("Cancelled", "Your product is safe :)", "info");
      }
    });
  };

  return (
    <>
      <div className="bg-[#0000001d] ">
        <h1 className="text-center text-black   text-2xl font-mono pt-32 pb-5">
          PRODUCTS DETAILS
        </h1>
        <div className="grid grid-cols-3 gap-12 mx-auto px-4 max-w-screen-lg">
          {products.map((product) => (
            <div
              className="bg-gray-300 border-2 border-yellow-400 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
              key={product._id}
            >
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center p-4">
                <h3 className="text-lg text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">Price ${product.price}</p>
                <div className="space-y-2">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="bg-teal-500 text-white font-bold py-2 px-4 rounded-md w-full transition-opacity duration-300 hover:opacity-90 hover:bg-teal-900"
                  >
                    <i className="bi bi-pen-fill"></i>
                  </button>
                  <button
                    onClick={() => handledelete(product._id)}
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded-md w-full transition-opacity duration-300 hover:bg-red-700 hover:opacity-90"
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 p-8  ">
          <Link
            to="/create"
            className="bg-gray-600 text-white no-underline  !no-underline font-bold text-lg py-2 px-6 rounded-full hover:bg-gray-700 transition-all duration-300"
          >
            Add
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

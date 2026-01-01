import React, { useEffect, useState } from "react";
import { FaStore, FaTimesCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineTag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import AOS from "aos";
import "aos/dist/aos.css";

export default function OfficialShoeSlice() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/products`)
      .then((res) => {
        const updatedProducts = res.data.data.map((product) => ({
          ...product,
          quantity: 0,
        }));
        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  if (loading) {
    return (
      <div className="bg-transparent py-16 w-full flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-transparent py-8 w-full font-sans " data-aos="">
      <div className="relative mx-auto px-4 ">
        {/* view all */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold !text-gray-800">Shoes</h2>
            <p className="text-lg bg-gradient-to-r from-slate-600 to-red-800 bg-clip-text text-transparent ">
              Discover our irresistible collection of shoes — every steps
              unforgettable.
            </p>
          </div>
          <a
            href="/login"
            className=" hidden relative md:inline-flex items-center justify-center  px-4 py-2 overflow-hidden font-medium !text-amber-600 transition duration-300 ease-out border-2 border-amber-300 rounded-xl shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-amber-300 group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-gray-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              View All
            </span>
            <span className="relative invisible">View All</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:mt-10 mt-5 ">
          {products?.slice(0, 10).map((product) => (
            <div
              key={product._id}
              className="bg-white p-3 mb-4 rounded-lg shadow-lg border border-gray-200 relative flex flex-col justify-between hover:scale-110 transform transition-transform duration-400 hover:border-pink-500 "
            >
              <div className="absolute top-2 left-2 bg-amber-200 px-2 py-2 text-sm rounded-full flex items-center text-green-700">
                <HiOutlineTag className="mr-1" />
              </div>{" "}
              <Link to={`/product/${product._id}`} className="block ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-md "
                />
                <h3 className="text-lg font-semibold">
                  {product.name}
                </h3>
              </Link>
              <p className="text-lg font-bold text-gray-600">
                $. {product.price}
              </p>
              <div className=" flex items-center text-amber-800 justify-between">
                {product.description}
              </div>
            </div>
          ))}
        </div>

        {/* view all */}
        <div className="mt-4 flex justify-end ">
          <a
            href="/login"
            className=" md:hidden relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-amber-600 transition duration-300 ease-out border-2 border-amber-500 rounded-xl shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-amber-500 group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-gray-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              View All
            </span>
            <span className="relative invisible">View All</span>
          </a>
        </div>
      </div>
    </div>
  );
}

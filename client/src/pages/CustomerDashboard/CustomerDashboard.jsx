import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Nav from "./Nav";
import { addCart, removeCart } from "../../redux/cartSlice";
import Footer from "../../components/Footer";

function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/products`)
      .then((res) => {
        const updatedProducts = res.data.data.map((product) => ({
          ...product,
          quantity: 0, // Initialize quantity for all products
        }));
        setProducts(updatedProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Nav />

      <div className="flex justify-center max-w-6xl mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-6 flex flex-col justify-between flex-grow rounded-lg  shadow"
            >
              {/* Product Image */}
              <img
                src={product.image}
                className="w-full h-[300px] object-cover rounded-md mb-3 transition-transform transform hover:scale-105 duration-500 ease-in-out"
                alt={product.name}
                onError={(e) => {
                  e.target.src = "/fallback-image.jpg";
                }}
              />

              {/* Product Name */}
              <h3 className="text-xl font-sans text-blue-800 mb-2 text-start">
                {product.name}
              </h3>

              {/* Special / Category */}
              <p className="bg-green-100 text-blue-500 text-md font-[Roboto] px-3 py-1 rounded-full uppercase w-fit mb-3">
                ${product.price}
              </p>

              {selected ? (
                <button
                  onClick={() => {
                    dispatch(
                      addCart({
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                      })
                    );
                    setSelected(false); 
                  }}
                  className=" w-full rounded-sm bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
                >
                  Add
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch(removeCart(product._id));
                    setSelected(true);
                  }}
                  className="flex items-center justify-center w-20 h-10 rounded-md bg-red-500 text-white text-sm font-medium transition hover:bg-red-600 hover:scale-105"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CustomerDashboard;

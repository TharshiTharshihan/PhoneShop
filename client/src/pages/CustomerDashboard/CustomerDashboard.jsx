import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { addCart, removeCart } from "../../redux/cartSlice";
import Footer from "../../components/Footer";

function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const cartItems = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
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
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Nav />

      <div className="flex justify-center max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 lg:mt-16 p-6">
          {products.map((product) => {
            const inCart = cartItems.some((item) => item._id === product._id);

            return (
              <div key={product._id} className="relative group flex flex-col ">
                {/* Product Image */}
                <div className="overflow-hidden aspect-w-1 aspect-h-1 rounded-lg shadow-md border">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-[200px] transition-all duration-300 group-hover:scale-125"
                      onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    />
                  </Link>

                  {/* NEW Badge */}
                  <div className="absolute left-3 top-3">
                    <p className="px-2 py-1 text-[10px] font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full shadow">
                      New
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex items-start justify-between mt-4 space-x-4">
                  <div>
                    {/* Product Name */}
                    <h3 className="!text-lg !font-bold  !text-gray-800">
                      {product.name}
                      <span
                        className="absolute inset-0"
                        aria-hidden="true"
                      ></span>
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 md:text-base">
                      ${product.price}
                    </p>
                  </div>
                </div>

                {/* Add / Remove Button */}
                <div className="mt-4">
                  {inCart ? (
                    <button
                      onClick={() => dispatch(removeCart({ _id: product._id }))}
                      className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-red-700 hover:scale-[1.03] shadow"
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        dispatch(
                          addCart({
                            _id: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1,
                          })
                        )
                      }
                      className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-yellow-300 hover:scale-[1.03] shadow"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CustomerDashboard;

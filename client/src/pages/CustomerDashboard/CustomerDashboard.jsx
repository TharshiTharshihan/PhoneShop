import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch ,useSelector} from "react-redux";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {products.map((product) => {
          const inCart = cartItems.some((item) => item._id === product._id); 

          return (
            <div
              key={product._id}
              className="p-6 flex flex-col justify-between flex-grow rounded-lg shadow"
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

              {/* Price */}
              <p className="bg-green-100 text-blue-500 text-md font-[Roboto] px-3 py-1 rounded-full uppercase w-fit mb-3">
                ${product.price}
              </p>

              {inCart ? (
                <button
                  onClick={() => dispatch(removeCart({ _id: product._id }))}
                  className="w-full rounded-sm bg-red-600 text-white p-4 text-sm font-medium transition hover:scale-105"
                >
                  Remove
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
                  className="w-full rounded-sm bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
                >
                  Add
                </button>
              )}
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

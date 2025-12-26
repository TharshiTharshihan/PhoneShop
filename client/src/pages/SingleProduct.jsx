import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./CustomerDashboard/Nav";
import { addCart, removeCart } from "../redux/cartSlice";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function SingleProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const cartItems = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();

        if (!data.success) {
          setError(data.message);
        } else {
          setProduct(data.data);
        }
      } catch (err) {
        setError("Failed to fetch product.");
        console.log(err);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);
  const inCart = cartItems.some((item) => item._id === product._id);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>      <Nav />

      <motion.div
      className="flex flex-col lg:flex-row gap-10 mt-12 font-sans mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* LEFT IMAGE SECTION */}
      <motion.div
        className="lg:w-1/2"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div
          className="sticky top-10 rounded-xl overflow-hidden shadow-xl border"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-[450px] object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </motion.div>

      {/* RIGHT CONTENT SECTION */}
      <motion.div
        className="lg:w-1/2 p-6   "
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h2
          className="text-4xl font-bold text-gray-900 mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {product.name}
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          className="text-gray-600 leading-relaxed mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {product.description || "No description available."}
        </motion.p>

        {/* PRICE */}
        <motion.p
          className="text-2xl font-semibold text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          ${product.price}
        </motion.p>

        {/* ADD / REMOVE CART BUTTON */}
        <AnimatePresence mode="wait">
          {inCart ? (
            <motion.button
              key="remove"
              onClick={() => dispatch(removeCart({ _id: product._id }))}
              className="w-auto p-3 text-lg rounded-md bg-red-600 text-white font-medium shadow-md hover:bg-red-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              Remove from Cart
            </motion.button>
          ) : (
            <motion.button
              key="add"
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
              className="w-auto p-3 text-lg rounded-md bg-yellow-500 text-white font-medium shadow-md hover:bg-yellow-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>

    <Footer />
    </>
  );
}

export default SingleProduct;

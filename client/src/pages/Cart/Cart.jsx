import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeCart, updateQuantity } from "../../redux/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Calculate the total price of all items
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemove = (item) => {
    dispatch(removeCart(item));
  };

  const handleQuantityChange = (item, quantity) => {
    // Ensure quantity is not less than 1
    if (quantity < 1) return;
    dispatch(updateQuantity({ _id: item._id, quantity }));
  };

  const stripePromise = loadStripe(
    "pk_test_51R9irmRp8EKuZlqYGXVVbkJ8M7NaLhUTqOYd5xw0YpcYMSkrLXcyIr10Cha1su3I2d4Rg4PDd8wqJetzmIVx1Hzj00WM0Zr2m7"
  );

  const handlePayment = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/checkout`, {
        totalAmount,
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#fffbff] flex flex-col">
        {cartItems.length === 0 ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
          >
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl ">
              <h2
                id="modalTitle"
                className="text-2xl font-bold text-center text-gray-900  mb-4"
              >
                Your Cart is Empty
              </h2>
              <p className="text-center text-gray-700  mb-6">
                Go back to the shop and add some items to your cart! Don&apos;t
                miss our latest collections and offers.
              </p>
              <Link
                to="/Customer"
                style={{ textDecoration: "none" }}
                className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded transition decoration-none text-center"
              >
                Go to Shop
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex-1 max-w-3xl mx-auto w-full">
            <h1 className="text-2xl font-bold text-center my-6 text-gray-900 dark:text-white">
              Your Shopping Cart
            </h1>
            <div className="divide-y rounded-lg shadow bg-white dark:bg-gray-900">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Price: <span className="font-medium">${item.price}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        className="py-1 px-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded disabled:opacity-50"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 font-medium">
                        Qty: {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        className="py-1 px-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item)}
                    className="ml-auto bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded transition"
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col items-end">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Total:{" "}
                <span className="text-cyan-600">${totalAmount.toFixed(2)}</span>
              </p>
              <button
                className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded shadow transition disabled:opacity-50"
                onClick={handlePayment}
                disabled={cartItems.length === 0}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CartPage;

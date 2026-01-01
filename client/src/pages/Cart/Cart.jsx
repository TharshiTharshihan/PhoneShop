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
  const { currentUser } = useSelector((state) => state.user);

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
      <div className="min-h-screen bg-gradient-to-r from-green-100 via-gray-100 to-blue-200 flex flex-col p-6">
        {cartItems.length === 0 ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
          >
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl ">
              {currentUser ? (
                <>
                  {" "}
                  <h2
                    id="modalTitle"
                    className="text-2xl font-bold text-center text-gray-900  mb-4"
                  >
                    Your Cart is Empty
                  </h2>
                  <p className="text-center text-gray-700  mb-6">
                    Go back to the shop and add some items to your cart!
                    Don&apos;t miss our latest collections and offers.
                  </p>
                  <Link
                    to="/Customer"
                    style={{ textDecoration: "none" }}
                    className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded transition decoration-none text-center"
                  >
                    Go to Shop
                  </Link>
                </>
              ) : ( <>
               <h2
                    id="modalTitle"
                    className="text-2xl font-bold text-center text-gray-900  mb-4"
                  >
                    Please Login First
                  </h2>
                  <p className="text-center text-gray-700  mb-6">
                    Go back to the shop and add some items to your cart!
                    Don&apos;t miss our latest collections and offers.
                  </p>
                <Link
                  to="/login"
                  style={{ textDecoration: "none" }}
                  className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded transition decoration-none text-center"
                >
                  Login here!
                </Link></>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 max-w-6xl mx-auto w-full">
            <h1 className="text-2xl font-bold text-center my-6 text-blue-700 ">
              Your Shopping Cart
            </h1>

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

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white !border-b  !border-gray-200 hover:!bg-gray-50 "
                    >
                      {/* Image */}
                      <td className="p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded border"
                        />
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 font-semibold text-gray-900 ">
                        {item.name}
                      </td>

                      {/* Quantity Input With +/- Buttons */}
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleQuantityChange(item, item.quantity - 1)
                            }
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 !rounded-full text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 "
                            disabled={item.quantity <= 1}
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>

                          <input
                            type="number"
                            value={item.quantity}
                            readOnly
                            className="w-14 bg-gray-50 border !text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2.5 py-1  "
                          />

                          <button
                            onClick={() =>
                              handleQuantityChange(item, item.quantity + 1)
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 !rounded-full hover:bg-gray-100"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ${item.price}
                      </td>

                      {/* Remove Button */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleRemove(item)}
                          className="font-medium text-red-600"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total + Payment */}
            <div className="mt-6 flex flex-col items-end">
              <p className="text-xl font-semibold text-gray-900 ">
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

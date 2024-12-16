import React from "react";
import { useLocation } from "react-router-dom";

function Cart() {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item._id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h2>Total: ${totalAmount.toFixed(2)}</h2>
    </div>
  );
}

export default Cart;

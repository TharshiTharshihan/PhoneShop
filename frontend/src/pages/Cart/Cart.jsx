import React from "react";
import { useLocation } from "react-router-dom";

function CartPage() {
  const location = useLocation();
  const { cartItems, totalAmount } = location.state || {
    cartItems: [],
    totalAmount: 0,
  };

  return (
    <div>
      <h1>Cart Page</h1>
      <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
      <div>
        {cartItems.map((item) => (
          <div key={item._id}>
            <p>{item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartPage;

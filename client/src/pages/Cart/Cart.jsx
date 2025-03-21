import React from "react";
import { useSelector } from "react-redux";

function CartPage() {
  const cartItem = useSelector((state) => state.cart.cart);

  return (
    <div>
      {cartItem.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <div>
          {cartItem.map((item) => (
            <div key={item._id}>
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;

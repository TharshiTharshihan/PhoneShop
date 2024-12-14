import React from "react";
import { useLocation } from "react-router-dom";

function Cart() {
  const location = useLocation();
  const { cart, products } = location.state; // Access cart and products from the passed state

  // Filter the products based on the cart's selected items
  const selectedProducts = products.filter((product) => cart[product.id]);

  // Calculate the total price of the selected products
  const totalPrice = selectedProducts.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <div>
      <h2>View Cart</h2>
      <div className="cart-items">
        {selectedProducts.length > 0 ? (
          selectedProducts.map((product) => (
            <div key={product._id} className="cart-item">
              <div className="img">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="detail">
                <h3>{product.name}</h3>
                <p>Price ${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="total">
        <h3>Total: ${totalPrice}</h3>
      </div>
    </div>
  );
}

export default Cart;

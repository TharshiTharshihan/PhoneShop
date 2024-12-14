import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const navigate = useNavigate(); // Use an object to track cart items

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addCart = (product) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product._id]: true, // Add product to the cart object
    }));
    // Redirect to cart page
  };

  // Remove from Cart function
  const removeCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId]; // Remove product from the cart object
      return updatedCart;
    });
  };

  const goToCart = () => {
    navigate("/view-cart", { state: { cart, products } }); // Passing both cart and products to View Cart
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
        </div>
      </nav>
      <div className="cart-container">
        {products.map((product) => (
          <div className="product" key={product._id}>
            <div className="img">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="detail">
              <h3>{product.name}</h3>
              <p>Price ${product.price}</p>
              {cart[product._id] ? ( // Directly check if the product is in the cart
                <button onClick={() => removeCart(product._id)}>
                  <i className="bi bi-x-square-fill"></i> Remove from cart
                </button>
              ) : (
                <button onClick={() => addCart(product)}>
                  <i className="bi bi-cart-check-fill"></i> Add to cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button onClick={goToCart} className="btn btn-primary">
        Go to Cart
      </button>
    </>
  );
}

export default CustomerDashboard;

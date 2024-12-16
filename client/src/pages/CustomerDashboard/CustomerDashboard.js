import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // eslint-disable-next-line no-undef
  const totalAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => {
        const updatedProducts = res.data.data.map((product) => ({
          ...product,
          quantity: 0, // Initialize quantity for all products
        }));
        setProducts(updatedProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  const addCart = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const removeCart = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const goToCart = () => {
    const cartItems = products.filter((product) => product.quantity > 0);
    navigate("/cart", { state: { cartItems } });
  };

  return (
    <>
      <header id="header">
        <div className="header">
          <div className="logo">
            <img src="./logo.png" alt="logo" />
          </div>
          <div className="navbar">
            <ul className="menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">services</a>
              </li>
              <li>
                <Link to="/login"> Login</Link>
              </li>
              <li>
                <Link to="/signup"> Signup</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="cart-ctn">
        {products.map((product) => (
          <div className="product" key={product._id}>
            <div className="img">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="detail">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <div>
                <button
                  onClick={() => addCart(product._id)}
                  style={{ marginRight: "10px" }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeCart(product._id)}
                  style={{ backgroundColor: "red" }}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={goToCart} className="btn btn-primary">
        Go to Cart
      </button>
      <h2>Total: ${totalAmount.toFixed(2)}</h2>
    </>
  );
}

export default CustomerDashboard;

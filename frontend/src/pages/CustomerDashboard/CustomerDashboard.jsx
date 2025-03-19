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
    navigate("/cart", { state: { cartItems, totalAmount } });
  };

  return (
    <>
      <header id="header">
        <div
          className="header-c"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 50px",
          }}
        >
          <div className="logo">
            <img src="./logo.png" alt="logo" />
          </div>
          <div className="navbar">
            <ul className="menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="#">Home</Link>
              </li>
              <li>
                <Link to="#">Home</Link>
              </li>
              <li>
                <Link to="/"> Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="cart-ctn">
        {products.map((product) => (
          <div className="prod" key={product._id}>
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
                  <i
                    className="bi bi-cart-plus-fill"
                    style={{ color: "lightgreen", fontSize: "20px" }}
                  ></i>
                </button>
                <br />
                <br />
                <button
                  onClick={() => removeCart(product._id)}
                  style={{ backgroundColor: "red" }}
                >
                  <i
                    className="bi bi-x-square-fill"
                    style={{ color: "black", fontSize: "20px" }}
                  ></i>
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

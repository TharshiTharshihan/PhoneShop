import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Header from "../Header/Header.jsx";
import { addCart } from "../../redux/slice";

function CustomerDashboard() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  //const navigate = useNavigate();

  // eslint-disable-next-line no-undef
  // const totalAmount = products.reduce(
  //   (total, product) => total + product.price * product.quantity,
  //   0
  // );

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

  // const addCart = (productId) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product._id === productId
  //         ? { ...product, quantity: product.quantity + 1 }
  //         : product
  //     )
  //   );
  // };

  // const removeCart = (productId) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product._id === productId && product.quantity > 0
  //         ? { ...product, quantity: product.quantity - 1 }
  //         : product
  //     )
  //   );
  // };

  // const goToCart = () => {
  //   const cartItems = products.filter((product) => product.quantity > 0);
  //   navigate("/cart", { state: { cartItems, totalAmount } });
  // };

  return (
    <>
      <Header />

      <div className="flex justify-center bg-gray-200">
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 p-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="w-[300px] h-[450px] overflow-hidden rounded-lg bg-amber-200 shadow"
            >
              <img
                src={product.image}
                className="aspect-video w-full h-[250px] object-cover"
                alt={product.title}
                onError={(e) => {
                  e.target.src = "/fallback-image.jpg";
                }}
              />
              <div className="p-4">
                <p className="mb-1 text-sm text-primary-500">
                  {product.seller} •{" "}
                  <time>{new Date(product.date).toDateString()}</time>
                </p>
                <h3 className="text-xl font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-gray-500">{product.description}</p>
                <div className="mt-2 flex gap-1">
                  <button
                    onClick={() => {
                      dispatch(
                        addCart({ image: product.image, title: product.title })
                      );
                    }}
                    className="py-1 px-3 inline-flex items-center gap-x-2 text-xs font-medium border border-transparent bg-black text-white hover:bg-white focus:outline-none focus:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none rounded-full"
                  >
                    ADD
                  </button>

                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xl font-semibold text-orange-600">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="cart-ctn">
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
      <h2>Total: ${totalAmount.toFixed(2)}</h2> */}
    </>
  );
}

export default CustomerDashboard;

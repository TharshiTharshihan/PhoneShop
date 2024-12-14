import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (productId) => {
    navigate(`/update/${productId}`);
  };

  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/api/products/${id}`)
          .then(() => {
            setProducts(products.filter((product) => product._id !== id));
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to delete the product.", "error");
          });
      } else {
        Swal.fire("Cancelled", "Your product is safe :)", "info");
      }
    });
  };

  return (
    <>
      <div style={{ "background-color": "#1b1a1a ", "padding-top": "350px" }}>
        <h1 className="heading">Product Details</h1>
        <div className="cart-container">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <div className="img">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="detail">
                <h3>{product.name}</h3>
                <p>Price ${product.price}</p>
                <button onClick={() => handleEdit(product._id)}>
                  <i className="bi bi-pen-fill"></i>
                </button>
                <br />
                <br />
                <button onClick={() => handledelete(product._id)}>
                  <i className="bi bi-trash3-fill"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="add-btn">
        <Link to="/create">Add</Link>
      </div>
    </>
  );
}

export default AdminDashboard;

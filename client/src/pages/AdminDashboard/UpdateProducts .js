import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./Create.css";

function UpdateProducts() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { id } = useParams(); // Get the product id from the URL
  const navigate = useNavigate(); // For navigation

  // Fetch the product details using the ID
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Failed to fetch product details", "error");
      });
  }, [id]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle product update submit
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/api/products/${id}`, product)
      .then((res) => {
        Swal.fire("Updated!", "Your product has been updated.", "success");
        navigate("/admin"); // Navigate back to the AdminDashboard after update
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update the product", "error");
      });
  };

  return (
    <div class="form-container">
      <h2>Update</h2>
      <form action="#" onSubmit={handleSubmit}>
        <div class="form-group">
          <label>Name:</label>
          <input
            type="text"
            required
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label>Price:</label>
          <input
            type="text"
            required
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            required
            value={product.image}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateProducts;

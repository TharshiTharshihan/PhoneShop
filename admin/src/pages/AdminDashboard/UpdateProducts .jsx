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
  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Fetch the product details using the ID
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((res) => {
        const { name, price, image } = res.data.data;
        setProduct({
          name,
          price,
          image,
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Failed to fetch product details", "error");
      });
  }, [id]);

  // Handle product update submit
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/api/products/${id}`, { ...product })

      .then(() => {
        Swal.fire("Updated!", "Your product has been updated.", "success");
        navigate("/admin");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update the product", "error");
      });
  };

  return (
    <div className="form-container">
      <h2>Update</h2>
      <form action="#" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            name="name"
            type="text"
            required
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            name="price"
            type="text"
            required
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            name="image"
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

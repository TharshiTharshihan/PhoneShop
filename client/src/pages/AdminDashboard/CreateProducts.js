import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./Create.css";
import axios from "axios";
import Swal from "sweetalert2";

function CreateProducts() {
  const [name, setname] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/products", { name, price, image })
      .then((res) => {
        Swal.fire(
          "Congratulations! You Have Successfully created 😊",
          "",
          "success"
        );
        navigate("/login");
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred. Please try again. 😔",
        })
      );
  };
  return (
    <div class="form-container">
      <h2>Create</h2>
      <form action="#" onSubmit={handleAdd}>
        <div class="form-group">
          <label>Name:</label>
          <input
            required
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label>Price:</label>
          <input
            required
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label>Image URL:</label>
          <input
            required
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateProducts;

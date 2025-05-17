require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userModel = require("./models/users");
const db = require("./db");
const productModel = require("./models/products");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // Required for newer SDK versions
});
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

//signup

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      userModel
        .create({ name, email, password: hash })
        .then((user) => res.json("success"))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

//login

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, role: user.role },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({ status: "success", role: user.role });
          } else {
            return res.json("wrong password");
          }
        });
      } else {
        return res.json("no record");
      }
    })
    .catch((err) => {
      return res.json("error occurred");
    });
});

//create

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: "Fill all fields" });
  }
  const newProduct = new productModel(product);

  try {
    await newProduct.save();
    res.status(201).json({ status: "success", data: newProduct });
  } catch (err) {
    console.error("Error in product", err.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

// get all

app.get("/api/products", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(201).json({ status: "success", data: products });
  } catch (err) {
    console.error("Error in product", err.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

// Get a single product package by ID
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found." });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// update

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  try {
    const updatedproducts = await productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedproducts });
  } catch (err) {
    console.error("Error in update the product", err.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

// delete

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error("Error in  delete product", err.message);
    res.status(500).json({ success: false, message: " error" });
  }
});

// Payments
app.post("/api/checkout", async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Customized Tour Package" },
            unit_amount: Math.round(totalAmount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:4000/success`,
      cancel_url: `http://localhost:4000/cart`,
    });

    res.json({ id: session.id });
  } catch (e) {
    console.error("Stripe Error:", e);
    res.status(500).json({ error: e.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

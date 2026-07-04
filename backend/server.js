require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// GET All Products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET Single Product
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// CREATE Product
app.post("/products", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  await product.save();

  res.status(201).json(product);
});

// UPDATE Product
app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
});

// DELETE Product
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
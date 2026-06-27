require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Sample Data
let products = [
  { id: 1, name: "Rice", price: 100 },
  { id: 2, name: "Wheat", price: 80 }
];

// GET All Products
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

// GET Single Product
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json(product);
});

// POST Product
app.post("/products", (req, res) => {
  const { name, price } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product added successfully",
    product: newProduct,
  });
});

// PUT Product
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.name = req.body.name;
  product.price = req.body.price;

  res.status(200).json({
    message: "Product updated successfully",
    product,
  });
});

// DELETE Product
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  products = products.filter((p) => p.id !== id);

  res.status(200).json({
    message: "Product deleted successfully",
  });
});

// SEARCH Product
app.get("/search", (req, res) => {
  const keyword = req.query.name;

  const result = products.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );

  res.status(200).json(result);
});
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong!"
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

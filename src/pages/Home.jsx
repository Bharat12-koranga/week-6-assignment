import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const saveProduct = async () => {
    if (!name || !price) {
      alert("Please enter product name and price");
      return;
    }

    if (editId) {
      await fetch(`http://localhost:5000/products/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
        }),
      });
    } else {
      await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
        }),
      });
    }

    setName("");
    setPrice("");
    setEditId(null);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  const editProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setEditId(product._id);
  };

  return (
    <>
      <Navbar />
      <Hero />

      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>{editId ? "Update Product" : "Add Product"}</h2>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <button onClick={saveProduct}>
          {editId ? "Update Product" : "Add Product"}
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>

            <button onClick={() => editProduct(product)}>
              Edit
            </button>

            <button
              onClick={() => deleteProduct(product._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Home;
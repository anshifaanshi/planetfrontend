import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://planet-coki.onrender.com/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <p
        className="text-center mt-5 fw-bold"
        style={{ fontSize: "1.5rem", color: "#555" }}
      >
        Loading products...
      </p>
    );
  }

  return (
    <div
      className="container my-5"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <h1 className="fw-bold mb-5 text-center" style={{ color: "#ffc107" }}>
        Our Products
      </h1>

      <div className="row g-4 justify-content-center">
        {products.map((product) => (
          <div
            key={product._id}
            className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
          >
            <div
              className="card shadow-sm h-100"
              style={{
                width: "100%",
                maxWidth: "300px",
                border: "1px solid #dee2e6",
                textAlign: "center",
              }}
            >
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <h5
                  className="card-title fw-bold"
                  style={{ color: "#0d6efd" }}
                >
                  {product.name}
                </h5>
                <p
                  className="card-text"
                  style={{ color: "#6c757d", fontSize: "1.1rem" }}
                >
                  ₹{product.price}
                </p>
                <button
                  className="btn btn-success mt-auto"
                  style={{
                    padding: "8px 16px",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

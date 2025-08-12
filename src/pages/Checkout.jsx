

import React, { useEffect, useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [cart, setCart] = useState({ items: [] });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getall");
        setCart(res.data);
      } catch (err) {
        setError(err.message || "Error fetching cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!email) {
      setOrderMessage("Please enter your email.");
      return;
    }
    // Here you would send order + email data to backend API
    setOrderMessage(`Order placed successfully! Confirmation sent to ${email}`);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading checkout...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
      }}
    >
      <h1>Checkout</h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div
            style={{
              textAlign: "left",
              marginBottom: 20,
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 15,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            {cart.items.map(({ product, quantity }) => (
              <div key={product._id} style={{ marginBottom: 15 }}>
                <h4>{product.name}</h4>
                <p>
                  ₹{product.price} × {quantity} = ₹{product.price * quantity}
                </p>
              </div>
            ))}
            <hr />
            <h3>Total: ₹{totalPrice}</h3>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: 8 }}>
              Enter your email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: 16,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
              placeholder="you@example.com"
            />
          </div>

          <button
            onClick={handlePlaceOrder}
            style={{
              padding: "12px 30px",
              fontSize: 16,
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
          >
            Place Order
          </button>

          {orderMessage && (
            <p style={{ marginTop: 20, color: orderMessage.includes("successfully") ? "green" : "red" }}>
              {orderMessage}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;

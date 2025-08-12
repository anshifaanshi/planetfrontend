
    
      import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getall");
        setCart(res.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching cart data");
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleProceedToCheckout = () => {
    navigate("/payment");
  };

  const handleClearCart = async () => {
    try {
      await axios.delete("https://planet-coki.onrender.com/api/clear");
      setCart({ items: [] });
    } catch (err) {
      setError("Error clearing cart");
    }
  };

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-4">{error}</div>;
  }

  return (
    <div className="d-flex justify-content-center my-5">
      <div style={{ maxWidth: "800px", width: "100%" }}>
        <h1 className="text-warning mb-4 text-center">🛒 Your Shopping Cart</h1>
        {cart.items.length === 0 ? (
          <div className="alert alert-info text-center">
            Your cart is empty. <Link to="/products">Browse products</Link>.
          </div>
        ) : (
          <div className="card shadow">
            <div className="card-body">
              <ul className="list-group mb-4">
                {cart.items.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <small className="text-muted">
                        Quantity: {item.quantity} × ₹{item.price}
                      </small>
                    </div>
                    <span className="fw-bold text-success">
                      ₹{item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Total:</h5>
                <h5 className="text-primary mb-0">₹{totalPrice}</h5>
              </div>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-success btn-lg"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>
                <button
                  className="btn btn-outline-danger btn-lg"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

         
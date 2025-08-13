
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import EventPage from "./pages/Events";
import ProductPage from "./pages/Products";
import Checkout from "./pages/Checkout";
import { useCartStore } from "./store";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const cartCount = useCartStore((s) => s.items.length);

  return (
    <BrowserRouter>
      {/* Navbar */}
      
           "
   


      {/* Page content */}
    <div className="container py-4 flex-grow-1">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand text-warning fw-bold" to="/">
      DemoApp
    </Link>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link text-light" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/cart">Cart </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/signup">Signup</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav></div>
  )
}

export default Header
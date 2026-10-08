import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <Link to="/" className="nav-logo">
          <img
            src="/src/assets/images/logo.png"
            alt="Laptopify"
          />
        </Link>

        {/* NAVIGATION */}
        <nav className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/how-it-works">
            How It Works
          </Link>

          <Link to="/laptops">
            Laptops
          </Link>

          <Link to="/contact">
            Contact
          </Link>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="nav-actions">

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>

          <Link
            to="/sell-laptop"
            className="primary-btn"
          >
            Get Started
            <span>↗</span>
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;
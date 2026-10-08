import { Link } from "react-router-dom";
import "../App.css";

function Navbar({ theme, onToggleTheme }) {
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

          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" /></svg>
            )}
          </button>

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

import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./SiteFooter.css";

function SiteFooter() {
  const shareUrl = encodeURIComponent(window.location.origin);

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link to="/" className="site-footer-logo" aria-label="Laptopify home">
            <img src={logo} alt="Laptopify — Smart Laptop Buyback and Procurement" />
          </Link>
          <p>Make your next move with a clear, trusted laptop buyback process.</p>
          <span className="site-footer-promise">Secure verification · Fair valuation · Hassle-free selling</span>
        </div>

        <nav className="site-footer-column" aria-label="Explore Laptopify">
          <h2>Explore</h2>
          <Link to="/">Home</Link>
          <Link to="/about">About Laptopify</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/laptops">Laptop brands</Link>
        </nav>

        <nav className="site-footer-column" aria-label="Laptopify services">
          <h2>Sell with us</h2>
          <Link to="/sell-laptop">Sell your laptop</Link>
          <Link to="/kyc">KYC verification</Link>
          <Link to="/contact">Contact support</Link>
          <Link to="/login">Login</Link>
        </nav>

        <div className="site-footer-column site-footer-contact">
          <h2>Get in touch</h2>
          <a href="mailto:cherishbywedknotcraft@gmail.com">cherishbywedknotcraft@gmail.com</a>
          <a href="tel:9876543210">9876543210</a>
          <p>Questions about selling your laptop? Our team is here to help.</p>
        </div>

        <div className="site-footer-column site-footer-social">
          <h2>Share Laptopify</h2>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer">Facebook <span aria-hidden="true">↗</span></a>
          <a href={`https://wa.me/?text=${shareUrl}`} target="_blank" rel="noreferrer">WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Laptopify. All rights reserved.</span>
        <span>Built for a smarter way to sell your laptop.</span>
      </div>
    </footer>
  );
}

export default SiteFooter;

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Laptops from "./pages/Laptops";
import Contact from "./pages/Contact";
import SellLaptop from "./pages/SellLaptop";
import KYC from "./pages/KYC";
import Login from "./pages/Login";
import SiteFooter from "./components/SiteFooter";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("laptopify-theme") || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("laptopify-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <AppFrame theme={theme} onToggleTheme={() => setTheme((value) => value === "dark" ? "light" : "dark")} />
    </BrowserRouter>
  );
}

function AppFrame({ theme, onToggleTheme }) {
  const location = useLocation();

  useEffect(() => {
    const targets = document.querySelectorAll("main > section, main .brand-card, main .contact-info-card, main [data-reveal]");
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-motion-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    targets.forEach((element) => {
      element.classList.add("scroll-motion");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="route-transition" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sell-laptop" element={<SellLaptop />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <SiteFooter />
    </div>
  );
}

export default App;

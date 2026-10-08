import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Laptops from "./pages/Laptops";
import Contact from "./pages/Contact";
import SellLaptop from "./pages/SellLaptop";
import KYC from "./pages/KYC";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <Routes>
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
    </BrowserRouter>
  );
}

export default App;
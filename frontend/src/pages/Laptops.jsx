import { useState } from "react";
import { Link } from "react-router-dom";
import "./Laptops.css";

import dell1 from "../assets/images/Dell-1.png";
import dell2 from "../assets/images/Dell-2.png";
import dell3 from "../assets/images/Dell-3.png";
import dell4 from "../assets/images/Dell-4.png";

import hp1 from "../assets/images/HP-1.png";
import hp2 from "../assets/images/HP-2.png";
import hp3 from "../assets/images/HP-3.png";
import hp4 from "../assets/images/HP-4.png";

import lenovo1 from "../assets/images/lenovo-1.png";
import lenovo2 from "../assets/images/lenovo-2.png";
import lenovo3 from "../assets/images/lenovo-3.png";
import lenovo4 from "../assets/images/lenovo-4.png";

import apple1 from "../assets/images/apple-1.png";
import apple2 from "../assets/images/apple-2.png";
import apple3 from "../assets/images/apple-3.png";

import asus1 from "../assets/images/asus-1.png";
import asus2 from "../assets/images/asus-2.png";
import asus3 from "../assets/images/asus-3.png";

import acer1 from "../assets/images/acer-1.png";
import acer2 from "../assets/images/acer-2.png";
import acer3 from "../assets/images/acer-3.png";

import samsung1 from "../assets/images/samsung-1.png";
import samsung2 from "../assets/images/samsung-2.png";
import samsung3 from "../assets/images/samsung-3.png";
import samsung4 from "../assets/images/samsung-4.png";

import msi1 from "../assets/images/MSI-1.png";
import msi2 from "../assets/images/MSI-2.png";

import microsoft1 from "../assets/images/Microsoft-1.png";
import microsoft2 from "../assets/images/Microsoft-2.png";
import microsoft3 from "../assets/images/Microsoft-3.png";

import xiaomi1 from "../assets/images/xiaomi-1.png";
import xiaomi2 from "../assets/images/xiaomi-2.png";


const brands = [
  {
    name: "Dell",
    category: "Business & Performance",
    tagline: "Built for work. Designed for reliability.",
    description:
      "Dell laptops are designed for business, productivity and professional computing. From everyday Inspiron systems to premium and performance-focused models, Dell offers a wide range of devices.",
    images: [dell1, dell2, dell3, dell4],
    models: ["Inspiron", "Vostro", "Latitude", "XPS"],
    specs: {
      processor: "Intel Core i5 / i7",
      ram: "8 GB – 32 GB",
      storage: "256 GB – 1 TB SSD",
      display: "14 – 15.6 inch",
      gpu: "Intel / NVIDIA",
      os: "Windows 11",
    },
  },

  {
    name: "HP",
    category: "Everyday & Professional",
    tagline: "Smart computing for every need.",
    description:
      "HP laptops combine practical design, productivity features and modern hardware. They are suitable for students, professionals, business users and everyday computing.",
    images: [hp1, hp2, hp3, hp4],
    models: ["Pavilion", "Victus", "Envy", "ProBook"],
    specs: {
      processor: "Intel Core i3 / i5 / i7",
      ram: "8 GB – 32 GB",
      storage: "256 GB – 1 TB SSD",
      display: "14 – 15.6 inch",
      gpu: "Intel / NVIDIA",
      os: "Windows 11",
    },
  },

  {
    name: "Lenovo",
    category: "Productivity & Performance",
    tagline: "Powerful performance. Practical design.",
    description:
      "Lenovo offers laptops across business, education, productivity and performance categories. ThinkPad, IdeaPad and Legion families serve different user requirements.",
    images: [lenovo1, lenovo2, lenovo3, lenovo4],
    models: ["ThinkPad", "IdeaPad", "Yoga", "Legion"],
    specs: {
      processor: "Intel Core / AMD Ryzen",
      ram: "8 GB – 32 GB",
      storage: "256 GB – 1 TB SSD",
      display: "14 – 16 inch",
      gpu: "Integrated / NVIDIA",
      os: "Windows 11",
    },
  },

  {
    name: "Apple",
    category: "Premium Computing",
    tagline: "Powerful. Elegant. Effortless.",
    description:
      "Apple MacBook laptops combine premium design, efficient performance and a smooth user experience. They are popular for professional work, creative workflows and everyday productivity.",
    images: [apple1, apple2, apple3],
    models: ["MacBook Air", "MacBook Pro", "MacBook"],
    specs: {
      processor: "Apple Silicon",
      ram: "8 GB – 36 GB",
      storage: "256 GB – 1 TB SSD",
      display: "13 – 16 inch",
      gpu: "Apple Integrated GPU",
      os: "macOS",
    },
  },

  {
    name: "ASUS",
    category: "Performance & Gaming",
    tagline: "Performance that keeps up with you.",
    description:
      "ASUS laptops cover everyday productivity, creative work, gaming and high-performance computing. Their product range includes lightweight and performance-focused machines.",
    images: [asus1, asus2, asus3],
    models: ["VivoBook", "ZenBook", "ROG"],
    specs: {
      processor: "Intel Core / AMD Ryzen",
      ram: "8 GB – 32 GB",
      storage: "512 GB – 1 TB SSD",
      display: "14 – 16 inch",
      gpu: "NVIDIA / Integrated",
      os: "Windows 11",
    },
  },

  {
    name: "Acer",
    category: "Affordable Performance",
    tagline: "Reliable technology for everyday life.",
    description:
      "Acer laptops provide practical options for students, professionals and everyday users. Their range includes lightweight notebooks and performance-oriented systems.",
    images: [acer1, acer2, acer3],
    models: ["Aspire", "Swift", "Nitro"],
    specs: {
      processor: "Intel Core / AMD Ryzen",
      ram: "8 GB – 32 GB",
      storage: "256 GB – 1 TB SSD",
      display: "14 – 15.6 inch",
      gpu: "Intel / NVIDIA",
      os: "Windows 11",
    },
  },

  {
    name: "Samsung",
    category: "Modern Computing",
    tagline: "Slim design. Smart performance.",
    description:
      "Samsung laptops combine modern styling, portability and productivity. Galaxy Book devices are designed for users who value mobility and connected experiences.",
    images: [samsung1, samsung2, samsung3, samsung4],
    models: ["Galaxy Book", "Galaxy Book Pro", "Galaxy Book4", "Galaxy Book Ultra"],
    specs: {
      processor: "Intel Core",
      ram: "8 GB – 32 GB",
      storage: "256 GB – 1 TB SSD",
      display: "13 – 16 inch",
      gpu: "Integrated / NVIDIA",
      os: "Windows 11",
    },
  },

  {
    name: "MSI",
    category: "Gaming & Performance",
    tagline: "Engineered for serious performance.",
    description:
      "MSI laptops are built for demanding workloads, gaming and performance-focused users. Powerful processors and dedicated graphics make them suitable for intensive applications.",
    images: [msi1, msi2],
    models: ["Katana", "Cyborg", "Stealth"],
    specs: {
      processor: "Intel Core / AMD Ryzen",
      ram: "16 GB – 64 GB",
      storage: "512 GB – 2 TB SSD",
      display: "15.6 – 17 inch",
      gpu: "NVIDIA GeForce",
      os: "Windows 11",
    },
  },

  {
    name: "Microsoft",
    category: "Professional Computing",
    tagline: "Clean design. Premium productivity.",
    description:
      "Microsoft Surface laptops focus on portability, premium design and professional productivity. They are suitable for users who prefer a lightweight and refined computing experience.",
    images: [microsoft1, microsoft2, microsoft3],
    models: ["Surface Laptop", "Surface Pro", "Surface Laptop Studio"],
    specs: {
      processor: "Intel Core / Snapdragon",
      ram: "8 GB – 32 GB",
      storage: "256 GB – 1 TB SSD",
      display: "13 – 15 inch",
      gpu: "Integrated / NVIDIA",
      os: "Windows 11",
    },
  },

  {
    name: "Xiaomi",
    category: "Smart & Value Computing",
    tagline: "Modern features at practical value.",
    description:
      "Xiaomi laptops focus on modern design, everyday performance and value. They are suitable for productivity, entertainment and general computing.",
    images: [xiaomi1, xiaomi2],
    models: ["RedmiBook", "Xiaomi Notebook"],
    specs: {
      processor: "Intel Core / AMD Ryzen",
      ram: "8 GB – 16 GB",
      storage: "256 GB – 512 GB SSD",
      display: "14 – 15.6 inch",
      gpu: "Integrated",
      os: "Windows",
    },
  },
];


function Laptops() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const openBrand = (brand) => {
    setSelectedBrand(brand);
    setSelectedImage(brand.images[0]);

    setTimeout(() => {
      document
        .getElementById("brand-details")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <main className="laptops-page">

      {/* HERO */}

      <section className="laptops-hero">

        <div className="laptops-hero-glow glow-left"></div>
        <div className="laptops-hero-glow glow-right"></div>

        <div className="laptops-hero-inner">

          <div className="hero-mini">
            <span></span>
            TRUSTED LAPTOP BRANDS
          </div>

          <h1>
            Explore popular
            <br />
            <strong>laptop brands.</strong>
          </h1>

          <p>
            Discover laptops from leading technology brands across
            business, productivity, premium, gaming and performance
            categories.
          </p>

        </div>

      </section>


      {/* BRAND GRID */}

      <section className="brand-section">

        <div className="section-heading">

          <div>
            <span>01 — EXPLORE</span>
            <h2>Choose a brand.</h2>
          </div>

          <p>
            Select any brand to explore its available laptop collection,
            specifications, models and performance category.
          </p>

        </div>


        <div className="brand-grid">

          {brands.map((brand, index) => (

            <button
              key={brand.name}
              className={`brand-card ${
                selectedBrand?.name === brand.name ? "selected" : ""
              }`}
              onClick={() => openBrand(brand)}
            >

              <div className="brand-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="brand-image-wrap">

                <img
                  src={brand.images[0]}
                  alt={brand.name}
                />

              </div>

              <div className="brand-info">

                <span>{brand.category}</span>

                <h3>{brand.name}</h3>

                <p>{brand.tagline}</p>

              </div>

              <div className="brand-arrow">
                Explore <b>↗</b>
              </div>

            </button>

          ))}

        </div>

      </section>


      {/* SELECTED BRAND */}

      {selectedBrand && (

        <section
          className="brand-details"
          id="brand-details"
        >

          <div className="details-top">

            <div>

              <span className="details-label">
                02 — BRAND COLLECTION
              </span>

              <h2>
                {selectedBrand.name}
                <span>.</span>
              </h2>

              <p className="details-tagline">
                {selectedBrand.tagline}
              </p>

            </div>

            <button
              className="close-brand"
              onClick={() => setSelectedBrand(null)}
            >
              Close ×
            </button>

          </div>


          <div className="details-layout">

            {/* IMAGE AREA */}

            <div className="brand-gallery">

              <div className="main-laptop-image">

                <div className="image-glow"></div>

                <img
                  src={selectedImage}
                  alt={selectedBrand.name}
                />

                <div className="image-counter">
                  {selectedBrand.images.findIndex(
                    (img) => img === selectedImage
                  ) + 1}
                  {" / "}
                  {selectedBrand.images.length}
                </div>

              </div>


              <div className="thumbnail-row">

                {selectedBrand.images.map((image, index) => (

                  <button
                    key={image}
                    className={
                      selectedImage === image
                        ? "thumbnail active"
                        : "thumbnail"
                    }
                    onClick={() => setSelectedImage(image)}
                  >

                    <img
                      src={image}
                      alt={`${selectedBrand.name} ${index + 1}`}
                    />

                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                  </button>

                ))}

              </div>

            </div>


            {/* DETAILS */}

            <div className="brand-information">

              <div className="info-category">
                {selectedBrand.category}
              </div>

              <h3>
                Know the device.
                <br />
                <span>Know its value.</span>
              </h3>

              <p className="brand-description">
                {selectedBrand.description}
              </p>


              <div className="model-list">

                <span>POPULAR SERIES</span>

                <div>

                  {selectedBrand.models.map((model) => (

                    <span key={model} className="model-pill">
                      {model}
                    </span>

                  ))}

                </div>

              </div>


              {/* SPECIFICATIONS */}

              <div className="spec-box">

                <div className="spec-heading">
                  <span>TECHNICAL PROFILE</span>
                  <b>{selectedBrand.name}</b>
                </div>


                <div className="spec-grid">

                  <div className="spec-item">
                    <span>PROCESSOR</span>
                    <strong>{selectedBrand.specs.processor}</strong>
                  </div>

                  <div className="spec-item">
                    <span>RAM</span>
                    <strong>{selectedBrand.specs.ram}</strong>
                  </div>

                  <div className="spec-item">
                    <span>STORAGE</span>
                    <strong>{selectedBrand.specs.storage}</strong>
                  </div>

                  <div className="spec-item">
                    <span>DISPLAY</span>
                    <strong>{selectedBrand.specs.display}</strong>
                  </div>

                  <div className="spec-item">
                    <span>GRAPHICS</span>
                    <strong>{selectedBrand.specs.gpu}</strong>
                  </div>

                  <div className="spec-item">
                    <span>OPERATING SYSTEM</span>
                    <strong>{selectedBrand.specs.os}</strong>
                  </div>

                </div>

              </div>


              <Link
                to="/sell-laptop"
                className="sell-brand-button"
              >
                Sell Your {selectedBrand.name} Laptop
                <span>↗</span>
              </Link>

            </div>

          </div>

        </section>

      )}


      {/* WHY SECTION */}

      <section className="why-laptops">

        <div className="why-label">
          03 — LAPTOPIFY
        </div>

        <div className="why-content">

          <h2>
            Every laptop has
            <br />
            a <span>story.</span>
          </h2>

          <p>
            Laptopify helps sellers turn that story into a structured
            laptop request. Instead of relying only on appearance,
            important specifications and physical condition are reviewed
            before valuation.
          </p>

        </div>


        <div className="why-cards">

          <div>
            <span>01</span>
            <h3>Specifications</h3>
            <p>
              Processor, RAM, storage, operating system and purchase
              details are captured during submission.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Condition</h3>
            <p>
              Physical condition and important hardware components can
              be checked during professional inspection.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Valuation</h3>
            <p>
              Inspection findings support a structured valuation that
              can be reviewed before purchase approval.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="laptops-cta">

        <div>

          <span>READY TO SELL?</span>

          <h2>
            Turn your laptop
            <br />
            into <strong>real value.</strong>
          </h2>

          <p>
            Submit your laptop details and start the Laptopify
            buyback process.
          </p>

          <Link to="/sell-laptop">
            Start Selling
            <span>↗</span>
          </Link>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="laptops-footer">

        <div className="footer-brand">

          <div className="footer-logo">
            LAPTOP<span>IFY</span>
          </div>

          <p>
            Smart Laptop Buyback & Procurement Platform
          </p>

        </div>


        <div className="footer-links">

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/laptops">Laptops</Link>
          <Link to="/contact">Contact</Link>

        </div>


        <div className="footer-bottom">

          <span>© 2026 Laptopify. All rights reserved.</span>

          <span>
            Secure • Transparent • Structured
          </span>

        </div>

      </footer>

    </main>
  );
}

export default Laptops;
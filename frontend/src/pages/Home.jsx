import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

import heroImage from "../assets/images/neon-laptop.png";

import dell from "../assets/images/Dell-1.png";
import hp from "../assets/images/HP-1.png";
import lenovo from "../assets/images/lenovo-1.png";
import apple from "../assets/images/apple-1.png";
import asus from "../assets/images/asus-1.png";
import acer from "../assets/images/acer-3.png";
import samsung from "../assets/images/samsung-1.png";
import xiaomi from "../assets/images/xiaomi-1.png";
import msi from "../assets/images/MSI-1.png";
import microsoft from "../assets/images/Microsoft-1.png";

function Home() {
  const brands = [
    {
      name: "Dell",
      image: dell,
      category: "Business & Performance",
      text: "Business laptops designed for productivity, professional work and everyday performance.",
    },
    {
      name: "HP",
      image: hp,
      category: "Everyday Computing",
      text: "Reliable laptops for everyday computing, business and professional requirements.",
    },
    {
      name: "Lenovo",
      image: lenovo,
      category: "Power & Productivity",
      text: "Productivity-focused laptops suitable for work, study and professional workloads.",
    },
    {
      name: "Apple",
      image: apple,
      category: "Premium Computing",
      text: "Premium laptops evaluated through their model, specifications and physical condition.",
    },
    {
      name: "ASUS",
      image: asus,
      category: "Performance & Gaming",
      text: "Performance and gaming laptops with detailed hardware-based evaluation.",
    },
    {
      name: "Acer",
      image: acer,
      category: "Reliable Computing",
      text: "Practical laptops across everyday computing and performance categories.",
    },
    {
      name: "Samsung",
      image: samsung,
      category: "Modern Computing",
      text: "Modern laptops designed for productivity, mobility and everyday computing.",
    },
    {
      name: "Xiaomi",
      image: xiaomi,
      category: "Smart Computing",
      text: "Value-focused laptops with practical specifications and modern design.",
    },
    {
      name: "MSI",
      image: msi,
      category: "Gaming & Performance",
      text: "High-performance laptops designed for demanding workloads and gaming.",
    },
    {
      name: "Microsoft",
      image: microsoft,
      category: "Professional Computing",
      text: "Premium professional computing devices with modern hardware and design.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Submit",
      text: "Enter your laptop details and create a buyback request.",
    },
    {
      number: "02",
      title: "Verify",
      text: "Complete KYC verification and submit required documents.",
    },
    {
      number: "03",
      title: "Inspect",
      text: "An assigned inspector verifies your laptop condition.",
    },
    {
      number: "04",
      title: "Value",
      text: "Receive a transparent inspection-based valuation.",
    },
    {
      number: "05",
      title: "Purchase",
      text: "Track approval, payment and purchase completion.",
    },
  ];

  return (
    <main className="laptopify-home">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="home-hero">

        <div className="hero-grid-overlay"></div>

        <div className="hero-glow hero-glow-blue"></div>
        <div className="hero-glow hero-glow-purple"></div>

        <div className="hero-content">

          {/* LEFT SIDE */}

          <div className="hero-copy">

            <div className="hero-label">
              <span></span>
              LAPTOP BUYBACK & PROCUREMENT PLATFORM
            </div>

            <h1>
              Turn Your
              <br />
              Laptop Into
              <br />
              <strong>Real Value.</strong>
            </h1>

            <p className="hero-description">
              Laptopify brings laptop submission, KYC verification,
              professional inspection, fair valuation and purchase tracking
              into one structured platform.
            </p>

            <div className="hero-buttons">

              <Link to="/login" className="primary-button">
                Start Selling
                <span>↗</span>
              </Link>

              <Link
                to="/how-it-works"
                className="secondary-button"
              >
                Explore How It Works
              </Link>

            </div>

            {/* PROCESS */}

            <div className="hero-process">

              {steps.map((step) => (
                <div className="hero-process-item" key={step.number}>

                  <strong>{step.number}</strong>

                  <span>{step.title}</span>

                </div>
              ))}

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="hero-visual">

            <div className="hero-image-wrapper">

              <img
                src={heroImage}
                alt="Laptopify Laptop Buyback Workspace"
                className="hero-main-image"
              />

            </div>


            {/* FLOATING CARD 1 */}

            <div className="floating-card floating-card-top">

              <div className="floating-icon">
                ✓
              </div>

              <div>
                <small>SECURE PROCESS</small>
                <strong>KYC VERIFIED</strong>
              </div>

            </div>


            {/* FLOATING CARD 2 */}

            <div className="floating-card floating-card-left">

              <div className="floating-icon">
                ₹
              </div>

              <div>
                <small>FAIR VALUE</small>
                <strong>INSPECTION BASED</strong>
              </div>

            </div>


            {/* FLOATING CARD 3 */}

            <div className="floating-card floating-card-right">

              <div className="floating-icon">
                ⚡
              </div>

              <div>
                <small>PROCESS</small>
                <strong>FAST & EASY</strong>
              </div>

            </div>


            {/* FLOATING CARD 4 */}

            <div className="floating-card floating-card-bottom">

              <div className="floating-icon">
                ✓
              </div>

              <div>
                <small>PLATFORM</small>
                <strong>TRUSTED</strong>
              </div>

            </div>


            <div className="hero-value-text">
              
            </div>

          </div>

        </div>


        <div className="hero-scroll">
          <span></span>
          Scroll to explore
        </div>

      </section>


      {/* =====================================================
          WHAT IS LAPTOPIFY
      ===================================================== */}

      <section className="intro-section">

        <div className="section-label">
          <span></span>
          WHAT IS LAPTOPIFY?
        </div>

        <div className="intro-grid">

          <h2>
            A smarter way to
            <br />
            manage your
            <br />
            <em>laptop buyback.</em>
          </h2>

          <div className="intro-text">

            <p className="large-text">
              Laptopify is a structured laptop buyback and procurement
              management platform that brings the complete process into
              one place.
            </p>

            <p>
              Sellers can submit laptop details, complete KYC verification,
              request inspection, receive valuation and track purchase
              completion through a clear and organized workflow.
            </p>

            <div className="intro-highlight">

              <strong>ONE PLATFORM.</strong>

              <span>
                From laptop submission to final purchase completion.
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="process-section">

        <div className="section-heading">

          <div>

            <div className="section-label">
              <span></span>
              THE LAPTOPIFY PROCESS
            </div>

            <h2>
              From laptop
              <br />
              <em>to completed purchase.</em>
            </h2>

          </div>

          <p>
            A transparent five-step workflow designed to make laptop
            buyback simple, organized and trackable.
          </p>

        </div>


        <div className="process-grid">

          {steps.map((step) => (

            <div className="process-card" key={step.number}>

              <span className="process-number">
                {step.number}
              </span>

              <div className="process-icon">
                {step.number === "01" && "⌘"}
                {step.number === "02" && "✓"}
                {step.number === "03" && "⌕"}
                {step.number === "04" && "₹"}
                {step.number === "05" && "↗"}
              </div>

              <h3>{step.title}</h3>

              <p>{step.text}</p>

              <span className="process-arrow">
                ↗
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          PLATFORM
      ===================================================== */}

      <section className="platform-section">

        <div className="platform-card">

          <div className="platform-content">

            <div className="section-label">
              <span></span>
              WHY LAPTOPIFY?
            </div>

            <h2>
              More than a
              <br />
              laptop
              <br />
              <em>submission form.</em>
            </h2>

            <p>
              Laptopify connects seller management, KYC verification,
              inspection, valuation, purchase tracking and inventory
              management into one complete platform.
            </p>

            <Link to="/about" className="outline-button">
              Learn About Laptopify ↗
            </Link>

          </div>


          <div className="platform-stats">

            <div>
              <span>01</span>
              <section>
                <strong>Seller Management</strong>
                <p>Manage seller information and requests.</p>
              </section>
            </div>

            <div>
              <span>02</span>
              <section>
                <strong>Inspection Management</strong>
                <p>Assign inspectors and record inspection results.</p>
              </section>
            </div>

            <div>
              <span>03</span>
              <section>
                <strong>Valuation & Approval</strong>
                <p>Review values and manage approval decisions.</p>
              </section>
            </div>

            <div>
              <span>04</span>
              <section>
                <strong>Purchase & Inventory</strong>
                <p>Track purchases and maintain inventory.</p>
              </section>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONDITIONS
      ===================================================== */}

      <section className="condition-section">

        <div className="section-heading">

          <div>

            <div className="section-label">
              <span></span>
              LAPTOP CONDITION
            </div>

            <h2>
              Every laptop has
              <br />
              a different <em>story.</em>
            </h2>

          </div>

          <p>
            Laptopify supports structured condition information so
            inspection and valuation can consider the actual condition
            of the device.
          </p>

        </div>


        <div className="condition-grid">

          <div className="condition-card">
            <span>01</span>
            <strong>A+</strong>
            <h3>Excellent</h3>
            <p>Minimal visible wear and excellent working condition.</p>
          </div>

          <div className="condition-card">
            <span>02</span>
            <strong>A</strong>
            <h3>Good</h3>
            <p>Good working condition with normal signs of usage.</p>
          </div>

          <div className="condition-card">
            <span>03</span>
            <strong>B</strong>
            <h3>Average</h3>
            <p>Functional laptop with noticeable usage marks.</p>
          </div>

          <div className="condition-card">
            <span>04</span>
            <strong>C</strong>
            <h3>Needs Repair</h3>
            <p>Laptop requiring repair or additional inspection.</p>
          </div>

        </div>

      </section>


      {/* =====================================================
          BRANDS
      ===================================================== */}

      <section className="brands-section">

        <div className="section-heading">

          <div>

            <div className="section-label">
              <span></span>
              SUPPORTED BRANDS
            </div>

            <h2>
              Your laptop.
              <br />
              <em>Your brand.</em>
            </h2>

          </div>

          <p>
            Laptopify supports multiple laptop brands and models.
            Every submitted device follows the same structured
            inspection and valuation journey.
          </p>

        </div>


        <section className="brand-showcase-section">

  <div className="section-heading">

    
    

  </div>


  <div className="brand-showcase">


    {/* ================= DELL ================= */}

    <article className="brand-showcase-card">

      <div className="brand-showcase-image">

        <span className="brand-number">
          01
        </span>

        <div className="brand-image-glow"></div>

        <img
          src={dell}
          alt="Dell laptop"
        />

      </div>


      <div className="brand-showcase-content">

        <span className="brand-category">
          BUSINESS & PERFORMANCE
        </span>

        <h3>
          Your Dell laptop.
          <br />
          <span>Professionally evaluated.</span>
        </h3>

        <p>
          Dell laptops can be submitted with complete
          hardware and purchase information. Laptopify
          records the device details before professional
          inspection and valuation.
        </p>


        <div className="brand-points">

          <div className="brand-point">

            <strong>01</strong>

            <div>
              <b>Hardware Details</b>
              <small>
                Processor, RAM & Storage
              </small>
            </div>

          </div>


          <div className="brand-point">

            <strong>02</strong>

            <div>
              <b>Condition Check</b>
              <small>
                Physical & working condition
              </small>
            </div>

          </div>


          <div className="brand-point">

            <strong>03</strong>

            <div>
              <b>Fair Valuation</b>
              <small>
                Inspection based value
              </small>
            </div>

          </div>

        </div>

      </div>

    </article>



    {/* ================= HP ================= */}

    <article className="brand-showcase-card reverse">

      <div className="brand-showcase-image">

        <span className="brand-number">
          02
        </span>

        <div className="brand-image-glow"></div>

        <img
          src={hp}
          alt="HP laptop"
        />

      </div>


      <div className="brand-showcase-content">

        <span className="brand-category">
          EVERYDAY COMPUTING
        </span>

        <h3>
          Your HP laptop.
          <br />
          <span>Ready for evaluation.</span>
        </h3>

        <p>
          HP laptops can be submitted with model,
          processor, RAM, storage, operating system,
          purchase year and physical condition details.
        </p>


        <div className="brand-points">

          <div className="brand-point">
            <strong>01</strong>

            <div>
              <b>Laptop Specifications</b>
              <small>
                Processor, RAM & Storage
              </small>
            </div>
          </div>


          <div className="brand-point">
            <strong>02</strong>

            <div>
              <b>Physical Inspection</b>
              <small>
                Screen, keyboard & body
              </small>
            </div>
          </div>


          <div className="brand-point">
            <strong>03</strong>

            <div>
              <b>Transparent Value</b>
              <small>
                Based on inspection results
              </small>
            </div>
          </div>

        </div>

      </div>

    </article>



    {/* ================= LENOVO ================= */}

    <article className="brand-showcase-card">

      <div className="brand-showcase-image">

        <span className="brand-number">
          03
        </span>

        <div className="brand-image-glow"></div>

        <img
          src={lenovo}
          alt="Lenovo laptop"
        />

      </div>


      <div className="brand-showcase-content">

        <span className="brand-category">
          POWER & PRODUCTIVITY
        </span>

        <h3>
          Your Lenovo laptop.
          <br />
          <span>Built for productivity.</span>
        </h3>

        <p>
          Lenovo devices move through a structured
          inspection covering hardware verification,
          physical condition and overall device
          performance.
        </p>


        <div className="brand-points">

          <div className="brand-point">
            <strong>01</strong>

            <div>
              <b>Hardware Verification</b>
              <small>
                Processor, RAM & Storage
              </small>
            </div>
          </div>


          <div className="brand-point">
            <strong>02</strong>

            <div>
              <b>Device Condition</b>
              <small>
                Body, display & components
              </small>
            </div>
          </div>


          <div className="brand-point">
            <strong>03</strong>

            <div>
              <b>Valuation</b>
              <small>
                Inspection based assessment
              </small>
            </div>
          </div>

        </div>

      </div>

    </article>



    {/* ================= APPLE ================= */}

    <article className="brand-showcase-card reverse">

      <div className="brand-showcase-image">

        <span className="brand-number">
          04
        </span>

        <div className="brand-image-glow"></div>

        <img
          src={apple}
          alt="Apple MacBook"
        />

      </div>


      <div className="brand-showcase-content">

        <span className="brand-category">
          PREMIUM COMPUTING
        </span>

        <h3>
          Your Apple laptop.
          <br />
          <span>Premium device, carefully evaluated.</span>
        </h3>

        <p>
          Apple laptops can be submitted with model,
          specifications, purchase information and
          condition. Laptopify follows the same
          structured inspection and valuation journey.
        </p>


        <div className="brand-points">

          <div className="brand-point">
            <strong>01</strong>

            <div>
              <b>Model Details</b>
              <small>
                Model, year & specifications
              </small>
            </div>
          </div>


          <div className="brand-point">
            <strong>02</strong>

            <div>
              <b>Physical Condition</b>
              <small>
                Body, display & components
              </small>
            </div>
          </div>


          <div className="brand-point">
            <strong>03</strong>

            <div>
              <b>Fair Assessment</b>
              <small>
                Transparent valuation process
              </small>
            </div>
          </div>

        </div>

      </div>

    </article>



    {/* ================= ASUS ================= */}

    <article className="brand-showcase-card">

      <div className="brand-showcase-image">

        <span className="brand-number">
          05
        </span>

        <div className="brand-image-glow"></div>

        <img
          src={asus}
          alt="ASUS laptop"
        />

      </div>


      <div className="brand-showcase-content">

        <span className="brand-category">
          PERFORMANCE & GAMING
        </span>

        <h3>
          Your ASUS laptop.
          <br />
          <span>Performance gets inspected.</span>
        </h3>

        <p>
          ASUS performance and gaming laptops can be
          submitted with detailed hardware information.
          Inspection verifies the device condition before
          valuation and approval.
        </p>


        <div className="brand-points">

          <div className="brand-point">
            <strong>01</strong>

            <div>
              <b>Performance Hardware</b>
              <small>
                Processor, RAM & Storage
              </small>
            </div>
          </div>


          <div className="brand-point">
            <strong>02</strong>

            <div>
              <b>Component Inspection</b>
              <small>
                Display, keyboard & ports
              </small>
            </div>
          </div>


          <div className="brand-point">
            <strong>03</strong>

            <div>
              <b>Inspection Value</b>
              <small>
                Condition based valuation
              </small>
            </div>
          </div>

        </div>

      </div>

    </article>

  </div>

</section>

        <div className="brands-grid">

          {brands.map((brand) => (

            <div className="brand-card" key={brand.name}>

              <div className="brand-image">

                <img
                  src={brand.image}
                  alt={`${brand.name} laptop`}
                />

              </div>

              <div>

                <strong>{brand.name}</strong>

                <span>{brand.category}</span>

                <p>{brand.text}</p>

              </div>

              <span className="brand-arrow">
                ↗
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="final-cta">
        

        <div className="cta-glow"></div>

        <div className="cta-content">

          <div className="section-label">
            <span></span>
            READY TO START?
          </div>

          <h2>
            Turn your old laptop
            <br />
            into <em>real value.</em>
          </h2>

          <p>
            Start your Laptopify journey with a smarter,
            transparent and trackable laptop buyback process.
          </p>

          <Link to="/sell-laptop" className="hero-primary-btn">
  Start Selling
  <span>↗</span>
</Link>
        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      

    </main>
  );
}

export default Home;

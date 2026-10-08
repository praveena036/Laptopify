import { useState } from "react";
import { Link } from "react-router-dom";
import "./SellLaptop.css";

function SellLaptop() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    processor: "",
    ram: "",
    storage: "",
    operatingSystem: "",
    purchaseYear: "",
    originalPrice: "",
    expectedPrice: "",
    condition: "",
    reason: "",
  });

  const [imageName, setImageName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageName(file.name);
    }
  };

  return (
    <div className="sell-page">

      {/* =========================
          TOP NAV
      ========================= */}

      <header className="sell-header">
        <div className="sell-header-inner">

          <Link to="/" className="sell-logo">
            LAPTOP<span>IFY</span>
          </Link>

          <nav className="sell-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/laptops">Laptops</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <Link to="/login" className="sell-login">
            Login
          </Link>

        </div>
      </header>


      {/* =========================
          PAGE INTRO
      ========================= */}

      <section className="sell-intro">

        <div className="sell-intro-content">

          <div className="sell-label">
            <span></span>
            SELL YOUR LAPTOP
          </div>

          <h1>
            Turn your old laptop
            <br />
            into <strong>real value.</strong>
          </h1>

          <p>
            Tell us about your laptop. Our structured process helps
            you submit your device, complete verification, get it
            inspected and receive a fair valuation.
          </p>

        </div>

      </section>


      {/* =========================
          PROGRESS
      ========================= */}

      <section className="sell-progress">

        <div className="progress-item active">
          <span>01</span>

          <div>
            <strong>Laptop Details</strong>
            <small>Tell us about your device</small>
          </div>
        </div>

        <div className="progress-line"></div>

        <div className="progress-item">
          <span>02</span>

          <div>
            <strong>KYC Verification</strong>
            <small>Verify your identity</small>
          </div>
        </div>

        <div className="progress-line"></div>

        <div className="progress-item">
          <span>03</span>

          <div>
            <strong>Inspection</strong>
            <small>Device inspection</small>
          </div>
        </div>

        <div className="progress-line"></div>

        <div className="progress-item">
          <span>04</span>

          <div>
            <strong>Valuation</strong>
            <small>Get estimated value</small>
          </div>
        </div>

        <div className="progress-line"></div>

        <div className="progress-item">
          <span>05</span>

          <div>
            <strong>Purchase</strong>
            <small>Complete the process</small>
          </div>
        </div>

      </section>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="sell-container">

        <div className="sell-form-wrapper">


          {/* =========================
              FORM
          ========================= */}

          <div className="sell-form-card">

            <div className="form-heading">

              <div>

                <span className="small-label">
                  LAPTOP INFORMATION
                </span>

                <h2>Tell us about your laptop</h2>

                <p>
                  Provide accurate details so our team can evaluate
                  your laptop correctly.
                </p>

              </div>

              <div className="form-step">
                STEP
                <strong>01</strong>
              </div>

            </div>


            {/* =========================
                BASIC DETAILS
            ========================= */}

            <div className="form-section">

              <h3>Basic laptop details</h3>

              <div className="form-grid">


                {/* BRAND */}

                <div className="input-group">

                  <label>Laptop Brand *</label>

                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select brand
                    </option>

                    <option value="Dell">
                      Dell
                    </option>

                    <option value="HP">
                      HP
                    </option>

                    <option value="Lenovo">
                      Lenovo
                    </option>

                    <option value="Apple">
                      Apple
                    </option>

                    <option value="Asus">
                      Asus
                    </option>

                    <option value="Acer">
                      Acer
                    </option>

                    <option value="Samsung">
                      Samsung
                    </option>

                    <option value="MSI">
                      MSI
                    </option>

                    <option value="Microsoft">
                      Microsoft
                    </option>

                    <option value="Huawei">
                      Huawei
                    </option>

                    <option value="LG">
                      LG
                    </option>

                  </select>

                </div>


                {/* MODEL */}

                <div className="input-group">

                  <label>Model *</label>

                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Example: Inspiron 15"
                  />

                </div>


                {/* PROCESSOR */}

                <div className="input-group">

                  <label>Processor *</label>

                  <input
                    type="text"
                    name="processor"
                    value={formData.processor}
                    onChange={handleChange}
                    placeholder="Example: Intel Core i5"
                  />

                </div>


                {/* RAM */}

                <div className="input-group">

                  <label>RAM *</label>

                  <select
                    name="ram"
                    value={formData.ram}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select RAM
                    </option>

                    <option value="4 GB">
                      4 GB
                    </option>

                    <option value="8 GB">
                      8 GB
                    </option>

                    <option value="16 GB">
                      16 GB
                    </option>

                    <option value="32 GB">
                      32 GB
                    </option>

                    <option value="64 GB">
                      64 GB
                    </option>

                  </select>

                </div>


                {/* STORAGE */}

                <div className="input-group">

                  <label>Storage *</label>

                  <select
                    name="storage"
                    value={formData.storage}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select storage
                    </option>

                    <option value="256 GB SSD">
                      256 GB SSD
                    </option>

                    <option value="512 GB SSD">
                      512 GB SSD
                    </option>

                    <option value="1 TB SSD">
                      1 TB SSD
                    </option>

                    <option value="1 TB HDD">
                      1 TB HDD
                    </option>

                    <option value="2 TB HDD">
                      2 TB HDD
                    </option>

                  </select>

                </div>


                {/* OPERATING SYSTEM */}

                <div className="input-group">

                  <label>Operating System *</label>

                  <select
                    name="operatingSystem"
                    value={formData.operatingSystem}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select OS
                    </option>

                    <option value="Windows 11">
                      Windows 11
                    </option>

                    <option value="Windows 10">
                      Windows 10
                    </option>

                    <option value="macOS">
                      macOS
                    </option>

                    <option value="Linux">
                      Linux
                    </option>

                    <option value="ChromeOS">
                      ChromeOS
                    </option>

                  </select>

                </div>


                {/* PURCHASE YEAR */}

                <div className="input-group">

                  <label>Purchase Year *</label>

                  <input
                    type="number"
                    name="purchaseYear"
                    value={formData.purchaseYear}
                    onChange={handleChange}
                    placeholder="Example: 2023"
                    min="2000"
                    max="2026"
                  />

                </div>


                {/* CONDITION */}

                <div className="input-group">

                  <label>Condition *</label>

                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select condition
                    </option>

                    {/* IMPORTANT:
                        These values match Django model */}
                    <option value="excellent">
                      Excellent
                    </option>

                    <option value="good">
                      Good
                    </option>

                    <option value="average">
                      Average
                    </option>

                    <option value="needs_repair">
                      Needs Repair
                    </option>

                  </select>

                </div>

              </div>

            </div>


            {/* =========================
                PRICE
            ========================= */}

            <div className="form-section">

              <h3>Pricing information</h3>

              <div className="form-grid">


                {/* ORIGINAL PRICE */}

                <div className="input-group">

                  <label>
                    Original Purchase Price *
                  </label>

                  <div className="price-input">

                    <span>₹</span>

                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      placeholder="55000"
                    />

                  </div>

                </div>


                {/* EXPECTED PRICE */}

                <div className="input-group">

                  <label>
                    Expected Selling Price *
                  </label>

                  <div className="price-input">

                    <span>₹</span>

                    <input
                      type="number"
                      name="expectedPrice"
                      value={formData.expectedPrice}
                      onChange={handleChange}
                      placeholder="40000"
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* =========================
                REASON
            ========================= */}

            <div className="form-section">

              <h3>Reason for selling</h3>

              <div className="input-group full-width">

                <label>
                  Tell us why you want to sell your laptop *
                </label>

                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Example: Upgrading to a newer laptop..."
                  rows="5"
                ></textarea>

              </div>

            </div>


            {/* =========================
                IMAGE
            ========================= */}

            <div className="form-section">

              <h3>Laptop images</h3>

              <p className="section-description">
                Upload clear images of your laptop. This helps with
                the inspection process.
              </p>

              <label className="upload-box">

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImage}
                />

                <div className="upload-icon">
                  ↑
                </div>

                <strong>
                  {imageName || "Upload laptop image"}
                </strong>

                <small>
                  PNG, JPG or WEBP
                </small>

              </label>

            </div>


            {/* =========================
                ACTIONS
            ========================= */}

            <div className="form-actions">

              <Link
                to="/"
                className="cancel-button"
              >
                Cancel
              </Link>

              <Link
                to="/kyc"
                className="continue-button"
              >
                Continue to KYC
                <span>→</span>
              </Link>

            </div>

          </div>


          {/* =========================
              RIGHT PREVIEW
          ========================= */}

          <aside className="laptop-preview">

            <div className="preview-glow"></div>

            <div className="preview-label">
              YOUR LAPTOP
            </div>

            <div className="preview-device">

              <div className="device-screen">

                <div className="screen-logo">
                  LAPTOP<span>IFY</span>
                </div>

                <div className="screen-line"></div>

                <div className="screen-line short"></div>

                <div className="screen-line"></div>

              </div>

              <div className="device-base">
                <div className="device-keyboard"></div>
              </div>

            </div>


            {/* PREVIEW DETAILS */}

            <div className="preview-details">

              <div>
                <small>BRAND</small>

                <strong>
                  {formData.brand || "YOUR BRAND"}
                </strong>
              </div>

              <div>
                <small>MODEL</small>

                <strong>
                  {formData.model || "YOUR MODEL"}
                </strong>
              </div>

              <div>
                <small>CONDITION</small>

                <strong>
                  {formData.condition
                    ? formData.condition === "needs_repair"
                      ? "Needs Repair"
                      : formData.condition.charAt(0).toUpperCase() +
                        formData.condition.slice(1)
                    : "NOT SELECTED"}
                </strong>
              </div>

            </div>


            {/* PREVIEW SPECS */}

            <div className="preview-specs">

              <div>
                <span>PROCESSOR</span>

                <strong>
                  {formData.processor || "—"}
                </strong>
              </div>

              <div>
                <span>RAM</span>

                <strong>
                  {formData.ram || "—"}
                </strong>
              </div>

              <div>
                <span>STORAGE</span>

                <strong>
                  {formData.storage || "—"}
                </strong>
              </div>

            </div>


            {/* PREVIEW NOTE */}

            <div className="preview-note">

              <span>✦</span>

              <p>
                Final valuation is determined after professional
                inspection and verification.
              </p>

            </div>

          </aside>

        </div>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="sell-footer">

        <div>

          <strong>
            LAPTOP<span>IFY</span>
          </strong>

          <p>
            Smart Laptop Buyback & Procurement
          </p>

        </div>

        <p>
          © 2026 Laptopify. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default SellLaptop;
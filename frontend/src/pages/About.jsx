import "./About.css";

const brands = [
  {
    name: "Dell",
    image: "/src/assets/images/Dell-1.png",
    processor: "Intel Core i5 / i7",
    ram: "8GB / 16GB",
    storage: "512GB SSD / 1TB",
    gpu: "Intel Iris Xe / NVIDIA",
    display: "14 – 15.6 inch",
    os: "Windows 11",
    bestFor: "Business, Students & Professionals",
  },
  {
    name: "HP",
    image: "/src/assets/images/HP-1.png",
    processor: "Intel Core i5 / i7",
    ram: "8GB / 16GB",
    storage: "512GB SSD",
    gpu: "Intel Iris Xe / NVIDIA",
    display: "14 – 15.6 inch",
    os: "Windows 11",
    bestFor: "Office, Students & Everyday Use",
  },
  {
    name: "Lenovo",
    image: "/src/assets/images/lenovo-1.png",
    processor: "Intel Core i5 / Ryzen 5",
    ram: "8GB / 16GB",
    storage: "512GB SSD",
    gpu: "Integrated / NVIDIA",
    display: "14 – 16 inch",
    os: "Windows 11",
    bestFor: "Business, Coding & Productivity",
  },
  {
    name: "Apple",
    image: "/src/assets/images/apple-1.png",
    processor: "Apple M-series",
    ram: "8GB / 16GB / 24GB",
    storage: "256GB – 1TB SSD",
    gpu: "Integrated Apple GPU",
    display: "13 – 16 inch",
    os: "macOS",
    bestFor: "Creators, Developers & Professionals",
  },
  {
    name: "ASUS",
    image: "/src/assets/images/asus-1.png",
    processor: "Intel Core / AMD Ryzen",
    ram: "8GB / 16GB / 32GB",
    storage: "512GB SSD / 1TB SSD",
    gpu: "NVIDIA GeForce / Integrated",
    display: "14 – 16 inch",
    os: "Windows 11",
    bestFor: "Gaming, Students & Creators",
  },
  {
    name: "Acer",
    image: "/src/assets/images/acer-1.png",
    processor: "Intel Core / AMD Ryzen",
    ram: "8GB / 16GB",
    storage: "512GB SSD",
    gpu: "Integrated / NVIDIA",
    display: "14 – 15.6 inch",
    os: "Windows 11",
    bestFor: "Students, Office & Gaming",
  },
  {
    name: "Samsung",
    image: "/src/assets/images/samsung-1.png",
    processor: "Intel Core / Snapdragon",
    ram: "8GB / 16GB",
    storage: "256GB / 512GB SSD",
    gpu: "Integrated",
    display: "13 – 15.6 inch",
    os: "Windows",
    bestFor: "Portability & Everyday Productivity",
  },
  {
    name: "MSI",
    image: "/src/assets/images/MSI-1.png",
    processor: "Intel Core i7 / i9",
    ram: "16GB / 32GB",
    storage: "512GB / 1TB SSD",
    gpu: "NVIDIA GeForce RTX",
    display: "15.6 – 17.3 inch",
    os: "Windows 11",
    bestFor: "Gaming, Editing & High Performance",
  },
  {
    name: "Microsoft",
    image: "/src/assets/images/Microsoft-1.png",
    processor: "Intel Core / Snapdragon",
    ram: "8GB / 16GB / 32GB",
    storage: "256GB – 1TB SSD",
    gpu: "Integrated / NVIDIA",
    display: "13 – 15 inch",
    os: "Windows 11",
    bestFor: "Professionals & Premium Productivity",
  },
  {
    name: "Huawei",
    image: "/src/assets/images/Huawei-1.png",
    processor: "Intel Core / AMD Ryzen",
    ram: "8GB / 16GB",
    storage: "512GB SSD",
    gpu: "Integrated",
    display: "14 – 16 inch",
    os: "Windows",
    bestFor: "Students & Professionals",
  },
  {
    name: "LG",
    image: "/src/assets/images/LG-1.png",
    processor: "Intel Core i5 / i7",
    ram: "8GB / 16GB",
    storage: "512GB SSD",
    gpu: "Integrated",
    display: "14 – 17 inch",
    os: "Windows 11",
    bestFor: "Travel, Office & Productivity",
  },
  {
    name: "Xiaomi",
    image: "/src/assets/images/xiaomi-1.png",
    processor: "Intel Core / AMD Ryzen",
    ram: "8GB / 16GB",
    storage: "512GB SSD",
    gpu: "Integrated",
    display: "14 – 15.6 inch",
    os: "Windows",
    bestFor: "Students & Everyday Computing",
  },
];

const features = [
  {
    number: "01",
    title: "Verified Information",
    text: "Laptop specifications, seller information and documents are organized through a structured workflow.",
  },
  {
    number: "02",
    title: "Professional Inspection",
    text: "Laptop condition, hardware components and physical features can be reviewed before valuation.",
  },
  {
    number: "03",
    title: "Fair Valuation",
    text: "The inspection and valuation process helps determine an appropriate purchase value.",
  },
  {
    number: "04",
    title: "Transparent Tracking",
    text: "Every request moves through clearly defined stages from submission to purchase completion.",
  },
];

function About() {
  return (
    <main className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-glow"></div>

        <div className="about-hero-content">
          <span className="about-eyebrow">
            ABOUT LAPTOPIFY
          </span>

          <h1>
            More than a laptop.
            <br />
            <span>It is your next opportunity.</span>
          </h1>

          <p>
            Laptopify is a structured laptop buyback and procurement
            platform designed to make selling, inspection, valuation
            and purchase management simpler, clearer and more reliable.
          </p>

          <div className="hero-points">
            <div>
              <strong>01</strong>
              <span>Submit</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Inspect</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Value</span>
            </div>

            <div>
              <strong>04</strong>
              <span>Complete</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="about-intro section-space">
        <div className="section-heading">
          <span>THE LAPTOPIFY IDEA</span>
          <h2>
            A smarter way to manage
            <br />
            <strong>laptop buyback.</strong>
          </h2>
        </div>

        <div className="intro-grid">
          <div className="intro-large">
            <p>
              Selling an old laptop should not feel complicated.
              Laptopify brings the important steps together in one
              structured platform.
            </p>

            <p>
              From seller registration and laptop submission to KYC
              verification, inspection, valuation and purchase,
              each stage is designed to be easy to understand and
              track.
            </p>

            <p>
              The platform also creates a structured workflow for
              employees and administrators so laptop requests can be
              reviewed, inspected, valued and processed efficiently.
            </p>
          </div>

          <div className="intro-highlight">
            <div className="highlight-number">L</div>

            <h3>
              Laptop
              <br />
              <span>Buyback.</span>
            </h3>

            <p>
              Simple submission. Structured inspection.
              Transparent valuation.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="stat-item">
          <strong>12+</strong>
          <span>Laptop Brands</span>
        </div>

        <div className="stat-item">
          <strong>05</strong>
          <span>Core Process Stages</span>
        </div>

        <div className="stat-item">
          <strong>03</strong>
          <span>Platform Roles</span>
        </div>

        <div className="stat-item">
          <strong>01</strong>
          <span>Connected Workflow</span>
        </div>
      </section>

      {/* WHY LAPTOPIFY */}
      <section className="why-section section-space">
        <div className="section-heading centered">
          <span>WHY LAPTOPIFY?</span>
          <h2>
            Built around
            <br />
            <strong>trust & transparency.</strong>
          </h2>

          <p>
            A structured workflow helps sellers, inspectors and
            administrators work with the same information.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <span className="feature-number">
                {feature.number}
              </span>

              <div className="feature-icon">
                {feature.number === "01" && "✓"}
                {feature.number === "02" && "◈"}
                {feature.number === "03" && "₹"}
                {feature.number === "04" && "↗"}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>

              <div className="feature-line"></div>
            </article>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section className="brands-section section-space">

        <div className="section-heading">
          <span>LAPTOP BRANDS</span>

          <h2>
            Explore the brands
            <br />
            <strong>you can sell with Laptopify.</strong>
          </h2>

          <p>
            From everyday laptops to professional workstations and
            gaming machines, Laptopify can organize important device
            information before the inspection and valuation stages.
          </p>
        </div>

        <div className="brand-grid">

          {brands.map((brand, index) => (
            <article
              className="brand-card"
              key={brand.name}
              style={{ "--delay": `${index * 0.05}s` }}
            >

              <div className="brand-card-top">
                <span className="brand-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="brand-name">
                  {brand.name}
                </span>
              </div>

              <div className="brand-image-wrap">
                <img
                  src={brand.image}
                  alt={`${brand.name} laptop`}
                  className="brand-image"
                />
              </div>

              <div className="brand-info">
                <h3>{brand.name}</h3>

                <p>
                  Laptop specifications can vary by model and
                  configuration. The following information gives
                  an easy overview of common configurations.
                </p>

                <div className="spec-list">

                  <div className="spec-row">
                    <span>Processor</span>
                    <strong>{brand.processor}</strong>
                  </div>

                  <div className="spec-row">
                    <span>RAM</span>
                    <strong>{brand.ram}</strong>
                  </div>

                  <div className="spec-row">
                    <span>Storage</span>
                    <strong>{brand.storage}</strong>
                  </div>

                  <div className="spec-row">
                    <span>GPU</span>
                    <strong>{brand.gpu}</strong>
                  </div>

                  <div className="spec-row">
                    <span>Display</span>
                    <strong>{brand.display}</strong>
                  </div>

                  <div className="spec-row">
                    <span>Operating System</span>
                    <strong>{brand.os}</strong>
                  </div>

                </div>

                <div className="best-for">
                  <span>BEST FOR</span>
                  <strong>{brand.bestFor}</strong>
                </div>
              </div>

            </article>
          ))}

        </div>
      </section>

      {/* LAPTOP KNOWLEDGE */}
      <section className="knowledge-section section-space">

        <div className="section-heading centered">
          <span>UNDERSTANDING YOUR LAPTOP</span>

          <h2>
            What affects your laptop's
            <br />
            <strong>value?</strong>
          </h2>

          <p>
            Laptop valuation depends on multiple hardware,
            condition and ownership factors.
          </p>
        </div>

        <div className="knowledge-grid">

          <article>
            <div className="knowledge-number">01</div>
            <h3>Processor</h3>
            <p>
              The processor determines the overall computing
              performance of a laptop. Newer and more capable
              processors can improve productivity and multitasking.
            </p>
          </article>

          <article>
            <div className="knowledge-number">02</div>
            <h3>RAM</h3>
            <p>
              RAM affects how smoothly applications and multiple
              tasks can run. Higher RAM capacity is useful for
              development, editing and professional workloads.
            </p>
          </article>

          <article>
            <div className="knowledge-number">03</div>
            <h3>Storage</h3>
            <p>
              SSD storage generally provides faster system and
              application performance. Storage capacity also
              influences the usefulness of the laptop.
            </p>
          </article>

          <article>
            <div className="knowledge-number">04</div>
            <h3>GPU</h3>
            <p>
              A dedicated GPU can be important for gaming,
              3D applications, video editing and other graphics
              intensive workloads.
            </p>
          </article>

          <article>
            <div className="knowledge-number">05</div>
            <h3>Condition</h3>
            <p>
              Physical condition, screen quality, keyboard,
              battery, ports, charger and other components can
              influence inspection results.
            </p>
          </article>

          <article>
            <div className="knowledge-number">06</div>
            <h3>Purchase Details</h3>
            <p>
              Purchase year, original purchase price and expected
              selling price are important information during
              the laptop submission process.
            </p>
          </article>

        </div>
      </section>

      {/* CONDITION */}
      <section className="condition-section section-space">

        <div className="condition-copy">
          <span>CONDITION GUIDE</span>

          <h2>
            Every laptop has
            <br />
            <strong>a story.</strong>
          </h2>

          <p>
            Before a final valuation is approved, laptop condition
            and specifications need to be reviewed through the
            inspection workflow.
          </p>
        </div>

        <div className="condition-grid">

          <div className="condition-card excellent">
            <span>01</span>
            <h3>Excellent</h3>
            <p>
              Very good physical condition with minimal signs
              of use and properly working components.
            </p>
          </div>

          <div className="condition-card good">
            <span>02</span>
            <h3>Good</h3>
            <p>
              Normal signs of usage while the major laptop
              components remain functional.
            </p>
          </div>

          <div className="condition-card average">
            <span>03</span>
            <h3>Average</h3>
            <p>
              Visible signs of usage or minor issues that may
              need consideration during inspection.
            </p>
          </div>

          <div className="condition-card repair">
            <span>04</span>
            <h3>Needs Repair</h3>
            <p>
              Laptop requires repair or has significant hardware
              or physical issues requiring inspection.
            </p>
          </div>

        </div>
      </section>

      {/* PROCESS */}
      <section className="about-process section-space">

        <div className="section-heading centered">
          <span>THE LAPTOPIFY JOURNEY</span>

          <h2>
            From your laptop
            <br />
            <strong>to its next life.</strong>
          </h2>
        </div>

        <div className="journey">

          <div className="journey-step">
            <span>01</span>
            <h3>Submit</h3>
            <p>
              Enter your laptop brand, model, hardware details,
              condition and expected price.
            </p>
          </div>

          <div className="journey-arrow">→</div>

          <div className="journey-step">
            <span>02</span>
            <h3>Verify</h3>
            <p>
              Complete the required seller and KYC information
              for the request.
            </p>
          </div>

          <div className="journey-arrow">→</div>

          <div className="journey-step">
            <span>03</span>
            <h3>Inspect</h3>
            <p>
              An assigned employee can inspect the laptop and
              record relevant findings.
            </p>
          </div>

          <div className="journey-arrow">→</div>

          <div className="journey-step">
            <span>04</span>
            <h3>Value</h3>
            <p>
              Inspection information is used to suggest and
              review the laptop valuation.
            </p>
          </div>

          <div className="journey-arrow">→</div>

          <div className="journey-step">
            <span>05</span>
            <h3>Purchase</h3>
            <p>
              Once approved, the request moves through purchase
              processing and completion.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">

        <div className="cta-glow"></div>

        <div className="cta-content">

          <span>READY TO START?</span>

          <h2>
            Give your laptop
            <br />
            <strong>another purpose.</strong>
          </h2>

          <p>
            Start by submitting your laptop details and let the
            Laptopify workflow take care of the next steps.
          </p>

          <a href="/sell-laptop" className="about-cta-button">
            Sell Your Laptop
            <span>↗</span>
          </a>

        </div>

      </section>

      {/* FOOTER */}
      

    </main>
  );
}

export default About;
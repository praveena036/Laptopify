import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    title: "Submit Your Laptop",
    short: "Tell us about your device",
    description:
      "Start by providing your laptop brand, model, processor, RAM, storage, operating system, purchase year, condition and expected selling price.",
    image: "/src/assets/images/Dell-1.png",
  },
  {
    number: "02",
    title: "KYC Verification",
    short: "Verify your identity",
    description:
      "Complete your seller profile and upload the required identity and address documents. Your KYC request moves through the verification process.",
    image: "/src/assets/images/HP-1.png",
  },
  {
    number: "03",
    title: "Laptop Inspection",
    short: "Professional device check",
    description:
      "An assigned inspector reviews the physical condition and important laptop components including screen, keyboard, battery, charger, camera, speaker and ports.",
    image: "/src/assets/images/lenovo-1.png",
  },
  {
    number: "04",
    title: "Valuation",
    short: "Get a reviewed value",
    description:
      "Inspection findings are used to suggest a laptop value. The valuation can then be reviewed and approved, modified or rejected by the administrator.",
    image: "/src/assets/images/apple-1.png",
  },
  {
    number: "05",
    title: "Purchase Completion",
    short: "Complete the process",
    description:
      "After approval, the request moves through purchase processing, payment and final purchase completion.",
    image: "/src/assets/images/asus-1.png",
  },
];

const workflow = [
  {
    number: "01",
    title: "Submitted",
    text: "Laptop request is submitted by the seller.",
  },
  {
    number: "02",
    title: "KYC Verification",
    text: "Seller documents are checked.",
  },
  {
    number: "03",
    title: "Inspection Pending",
    text: "Request waits for inspection.",
  },
  {
    number: "04",
    title: "Inspector Assigned",
    text: "An employee is assigned to inspect the laptop.",
  },
  {
    number: "05",
    title: "Inspection Completed",
    text: "Inspection details and remarks are recorded.",
  },
  {
    number: "06",
    title: "Valuation Pending",
    text: "Laptop value is prepared for review.",
  },
  {
    number: "07",
    title: "Approved / Rejected",
    text: "Administrator reviews the valuation.",
  },
  {
    number: "08",
    title: "Purchase Processing",
    text: "Approved laptop enters purchase processing.",
  },
  {
    number: "09",
    title: "Purchase Completed",
    text: "Purchase is completed and inventory can be created.",
  },
];

const inspectionItems = [
  "Physical Condition",
  "Screen",
  "Keyboard",
  "Battery",
  "Charger",
  "Camera",
  "Speaker",
  "Ports",
  "Processor Verification",
  "RAM Verification",
  "Storage Verification",
];

const roles = [
  {
    role: "SELLER",
    title: "Seller",
    icon: "S",
    description:
      "The seller submits laptop information, completes KYC, uploads documents and tracks the request through the platform.",
    points: [
      "Register and login",
      "Complete seller profile",
      "Submit laptop details",
      "Upload KYC documents",
      "Track request status",
      "View valuation and purchase status",
    ],
  },
  {
    role: "INSPECTOR",
    title: "Employee / Inspector",
    icon: "I",
    description:
      "The assigned employee inspects the laptop, verifies specifications, records findings and suggests a valuation.",
    points: [
      "View assigned laptops",
      "Review seller information",
      "Inspect laptop condition",
      "Verify hardware specifications",
      "Add remarks and images",
      "Suggest laptop value",
    ],
  },
  {
    role: "ADMIN",
    title: "Administrator",
    icon: "A",
    description:
      "The administrator manages sellers, requests, inspections, valuations, purchases and inventory.",
    points: [
      "Manage sellers",
      "Verify KYC",
      "Assign inspectors",
      "Review inspections",
      "Approve or reject valuation",
      "Manage purchases and inventory",
    ],
  },
];

function HowItWorks() {
  return (
    <main className="how-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="how-hero">

        <div className="how-hero-glow"></div>

        <div className="how-hero-content">

          <span className="how-eyebrow">
            HOW LAPTOPIFY WORKS
          </span>

          <h1>
            From your laptop
            <br />
            <span>to its next value.</span>
          </h1>

          <p>
            Laptopify brings laptop submission, KYC verification,
            professional inspection, valuation and purchase
            management into one structured workflow.
          </p>

          <div className="hero-mini-flow">
            <span>SUBMIT</span>
            <b>→</b>
            <span>VERIFY</span>
            <b>→</b>
            <span>INSPECT</span>
            <b>→</b>
            <span>VALUE</span>
            <b>→</b>
            <span>PURCHASE</span>
          </div>

        </div>

      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="how-intro">

        <div className="how-section-title">

          <span>THE PROCESS</span>

          <h2>
            Five simple stages.
            <br />
            <strong>One connected journey.</strong>
          </h2>

          <p>
            Laptopify follows a structured process so sellers,
            inspectors and administrators can clearly understand
            what happens at every stage.
          </p>

        </div>

      </section>

      {/* =====================================================
          FIVE MAIN STEPS
      ===================================================== */}

      <section className="main-steps">

        {steps.map((step, index) => (
          <article
            className={`main-step-card ${
              index % 2 === 1 ? "reverse" : ""
            }`}
            key={step.number}
          >

            <div className="step-image-side">

              <div className="step-image-glow"></div>

              <div className="step-number">
                {step.number}
              </div>

              <img
                src={step.image}
                alt={step.title}
              />

            </div>

            <div className="step-content">

              <span className="step-label">
                STEP {step.number}
              </span>

              <h3>{step.title}</h3>

              <h4>{step.short}</h4>

              <p>{step.description}</p>

              <div className="step-line"></div>

            </div>

          </article>
        ))}

      </section>

      {/* =====================================================
          REQUEST WORKFLOW
      ===================================================== */}

      <section className="workflow-section">

        <div className="how-section-title centered">

          <span>REQUEST WORKFLOW</span>

          <h2>
            Every request has
            <br />
            <strong>a clear status.</strong>
          </h2>

          <p>
            A laptop request moves through defined stages from
            initial submission to completed purchase.
          </p>

        </div>

        <div className="workflow-timeline">

          {workflow.map((item, index) => (
            <div
              className="workflow-item"
              key={item.number}
            >

              <div className="workflow-marker">
                <span>{item.number}</span>
              </div>

              {index !== workflow.length - 1 && (
                <div className="workflow-connector"></div>
              )}

              <div className="workflow-card">

                <span>
                  STAGE {item.number}
                </span>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* =====================================================
          NEW LAPTOP USAGE SECTION
      ===================================================== */}

      <section className="laptop-usage-section">

        <div className="laptop-usage-image">

          <div className="usage-glow"></div>

          <img
  src="/src/assets/images/Laptop-Usage.png"
  alt="Laptop Usage Guide"
/>

          <div className="usage-floating-card">

            <span>01</span>

            <strong>
              Know Your Device
            </strong>

          </div>

        </div>

        <div className="laptop-usage-content">

          <span className="usage-label">
            BEFORE YOU SUBMIT
          </span>

          <h2>
            Know your laptop.
            <br />
            <strong>Know its value.</strong>
          </h2>

          <p>
            Before starting your Laptopify request, understand
            the important information about your laptop. Having
            accurate details makes your submission easier and
            helps the inspection team understand your device.
          </p>

          <p>
            Keep your laptop brand, model, processor, RAM,
            storage, operating system, purchase year and
            current condition ready before submitting your
            request.
          </p>

          <div className="usage-points">

            <div className="usage-point">

              <span>01</span>

              <div>

                <strong>
                  Identify Your Laptop
                </strong>

                <p>
                  Know the brand, model and basic device information.
                </p>

              </div>

            </div>

            <div className="usage-point">

              <span>02</span>

              <div>

                <strong>
                  Check Your Specifications
                </strong>

                <p>
                  Keep processor, RAM, storage and operating system details ready.
                </p>

              </div>

            </div>

            <div className="usage-point">

              <span>03</span>

              <div>

                <strong>
                  Understand Its Condition
                </strong>

                <p>
                  Be clear about the physical and working condition of your laptop.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          INSPECTION
      ===================================================== */}

      <section className="inspection-section">

        <div className="inspection-visual">

          <div className="inspection-ring ring-one"></div>

          <div className="inspection-ring ring-two"></div>

          <img
            src="/src/assets/images/MSI-1.png"
            alt="Laptop inspection"
          />

          <div className="inspection-badge">

            <strong>360°</strong>

            <span>
              INSPECTION
            </span>

          </div>

        </div>

        <div className="inspection-content">

          <span>
            PROFESSIONAL INSPECTION
          </span>

          <h2>
            We look beyond
            <br />
            <strong>the outside.</strong>
          </h2>

          <p>
            During inspection, important physical and hardware
            details can be reviewed before a final valuation is
            approved.
          </p>

          <div className="inspection-grid">

            {inspectionItems.map((item, index) => (
              <div
                className="inspection-item"
                key={item}
              >

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>
                  {item}
                </strong>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          ROLES
      ===================================================== */}

      <section className="roles-section">

        <div className="how-section-title centered">

          <span>WHO DOES WHAT?</span>

          <h2>
            Three roles.
            <br />
            <strong>One workflow.</strong>
          </h2>

          <p>
            Laptopify separates seller, inspector and administrator
            responsibilities to keep the process structured.
          </p>

        </div>

        <div className="roles-grid">

          {roles.map((role) => (
            <article
              className="role-card"
              key={role.role}
            >

              <div className="role-top">

                <div className="role-icon">
                  {role.icon}
                </div>

                <span>
                  {role.role}
                </span>

              </div>

              <h3>
                {role.title}
              </h3>

              <p>
                {role.description}
              </p>

              <div className="role-points">

                {role.points.map((point) => (
                  <div key={point}>

                    <span>✓</span>

                    <strong>
                      {point}
                    </strong>

                  </div>
                ))}

              </div>

            </article>
          ))}

        </div>

      </section>

      {/* =====================================================
          PURCHASE JOURNEY
      ===================================================== */}

      <section className="purchase-section">

        <div className="purchase-content">

          <span>
            PURCHASE JOURNEY
          </span>

          <h2>
            Once approved,
            <br />
            <strong>the final stage begins.</strong>
          </h2>

          <p>
            After valuation approval, the laptop moves through
            purchase processing and payment stages until the
            purchase is completed.
          </p>

          <div className="purchase-flow">

            <div>
              <span>01</span>
              <strong>Approved</strong>
            </div>

            <b>→</b>

            <div>
              <span>02</span>
              <strong>Purchase Processing</strong>
            </div>

            <b>→</b>

            <div>
              <span>03</span>
              <strong>Payment Pending</strong>
            </div>

            <b>→</b>

            <div>
              <span>04</span>
              <strong>Payment Completed</strong>
            </div>

            <b>→</b>

            <div>
              <span>05</span>
              <strong>Purchase Completed</strong>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="how-cta">

        <div className="how-cta-glow"></div>

        <div className="how-cta-content">

          <span>
            READY TO BEGIN?
          </span>

          <h2>
            Your laptop's next chapter
            <br />
            <strong>starts here.</strong>
          </h2>

          <p>
            Submit your laptop details and begin the Laptopify
            buyback journey.
          </p>

          <a
            href="/sell-laptop"
            className="how-cta-button"
          >
            Start Selling
            <span>↗</span>
          </a>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      

    </main>
  );
}

export default HowItWorks;
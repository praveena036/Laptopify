import { Link } from "react-router-dom";
import "./ProcessSteps.css";

const steps = [
  {
    number: "01",
    title: "Laptop Details",
    description: "Tell us about your device",
    path: "/sell-laptop",
  },
  {
    number: "02",
    title: "KYC Verification",
    description: "Verify your identity",
    path: "/kyc",
  },
  {
    number: "03",
    title: "Inspection",
    description: "Device inspection",
    path: "/inspection",
  },
  {
    number: "04",
    title: "Valuation",
    description: "Get estimated value",
    path: "/valuation",
  },
  {
    number: "05",
    title: "Purchase",
    description: "Complete the process",
    path: "/purchase",
  },
];

function ProcessSteps({ activeStep = 1 }) {
  return (
    <div className="process-steps">

      {steps.map((step, index) => (
        <div className="process-step-wrapper" key={step.number}>

          <Link
            to={step.path}
            className={`process-step ${
              activeStep === index + 1 ? "active" : ""
            }`}
          >
            <div className="step-circle">
              {step.number}
            </div>

            <div className="step-content">
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </Link>

          {index !== steps.length - 1 && (
            <div className="step-line"></div>
          )}

        </div>
      ))}

    </div>
  );
}

export default ProcessSteps;
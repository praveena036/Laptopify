import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./KYC.css";
import ProcessSteps from "../components/ProcessSteps";

function KYC() {
  const [identityProof, setIdentityProof] = useState(null);
  const [addressProof, setAddressProof] = useState(null);

  const [status, setStatus] = useState("Pending verification");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage("");

    // Check documents
    if (!identityProof) {
      setMessage("Please upload your Identity Proof.");
      return;
    }

    if (!addressProof) {
      setMessage("Please upload your Address Proof.");
      return;
    }

    // Get logged-in seller ID
    const sellerId = localStorage.getItem("user_id");

    // Get laptop request ID
    const laptopRequestId = localStorage.getItem("laptop_request_id");

    if (!sellerId) {
      setMessage("Seller login information is missing. Please login again.");
      return;
    }

    if (!laptopRequestId) {
      setMessage(
        "Laptop request information is missing. Please complete the laptop submission first."
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("seller_id", sellerId);
      formData.append("laptop_request_id", laptopRequestId);
      formData.append("identity_proof", identityProof);
      formData.append("address_proof", addressProof);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/kyc/submit/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("KYC Response:", response.data);

      setStatus("Under verification");
      setMessage(
        "KYC documents submitted successfully. Our team will verify your documents."
      );
    } catch (error) {
      console.error("KYC Error:", error);

      if (error.response?.data) {
        setMessage(
          error.response.data.message ||
            "KYC submission failed. Please try again."
        );
      } else {
        setMessage(
          "Unable to connect to the server. Please make sure Django is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kyc-page">

      {/* HERO */}
      <section className="kyc-hero">

        <div className="kyc-label">
          STEP 02 · KYC VERIFICATION
        </div>

        <h1>
          Verify your <span>identity.</span>
        </h1>

        <p>
          Complete your KYC verification to continue the Laptopify
          laptop buyback process.
        </p>

      </section>

      {/* PROCESS */}
      <section className="kyc-process">
        <ProcessSteps activeStep={2} />
      </section>

      {/* MAIN */}
      <main className="kyc-container">

        <div className="kyc-card">

          {/* HEADER */}
          <div className="kyc-card-header">

            <div>

              <span>
                SECURE VERIFICATION
              </span>

              <h2>
                KYC Verification
              </h2>

              <p>
                Upload the required documents so our team can verify
                your identity.
              </p>

            </div>

            <div className="kyc-step">

              <small>
                STEP
              </small>

              <strong>
                02
              </strong>

            </div>

          </div>

          {/* DOCUMENTS */}
          <div className="kyc-fields">

            {/* IDENTITY PROOF */}
            <div className="kyc-field">

              <label>
                Identity Proof
              </label>

              <label className="document-upload">

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) =>
                    setIdentityProof(e.target.files[0])
                  }
                />

                <div className="upload-icon">
                  ↑
                </div>

                <strong>
                  {identityProof
                    ? identityProof.name
                    : "Upload Identity Proof"}
                </strong>

                <small>
                  Aadhaar / PAN / Driving Licence
                </small>

              </label>

            </div>

            {/* ADDRESS PROOF */}
            <div className="kyc-field">

              <label>
                Address Proof
              </label>

              <label className="document-upload">

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) =>
                    setAddressProof(e.target.files[0])
                  }
                />

                <div className="upload-icon">
                  ↑
                </div>

                <strong>
                  {addressProof
                    ? addressProof.name
                    : "Upload Address Proof"}
                </strong>

                <small>
                  Address verification document
                </small>

              </label>

            </div>

          </div>

          {/* MESSAGE */}
          {message && (
            <div
              className={
                status === "Under verification"
                  ? "kyc-message success"
                  : "kyc-message error"
              }
            >
              {message}
            </div>
          )}

          {/* STATUS */}
          <div className="kyc-status">

            <div className="status-icon">
              ✓
            </div>

            <div>

              <strong>
                KYC Status
              </strong>

              <p>
                {status}
              </p>

            </div>

          </div>

          {/* ACTIONS */}
          <div className="kyc-actions">

            <Link
              to="/sell-laptop"
              className="back-button"
            >
              ← Back
            </Link>

            <button
              type="button"
              className="kyc-button"
              onClick={handleSubmit}
              disabled={loading}
            >

              {loading ? "Submitting..." : "Submit KYC"}

              <span>
                →
              </span>

            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default KYC; 
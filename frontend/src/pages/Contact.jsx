import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSubmitted(false);
    setErrorMessage("");

    try {
      await api.post("/api/contact/", formData);

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const responseMessage = error.response?.data?.message || error.response?.data?.detail;
      const fallback = error.response
        ? "We couldn't send your message right now. Please try again shortly."
        : "We couldn't connect to the contact service. Please try again shortly.";
      setErrorMessage(responseMessage || fallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">

      {/* HERO */}

      <section className="contact-hero">

        <div className="contact-hero-glow glow-one"></div>
        <div className="contact-hero-glow glow-two"></div>

        <div className="contact-hero-content">

          <span className="contact-eyebrow">
            GET IN TOUCH
          </span>

          <h1>
            Let's talk about
            <br />
            <strong>your laptop.</strong>
          </h1>

          <p>
            Have a question about selling your laptop, verification,
            inspection or the Laptopify process? Send us a message
            and our team will get back to you.
          </p>

        </div>

      </section>


      {/* CONTACT MAIN */}

      <section className="contact-main">

        {/* LEFT INFORMATION */}

        <div className="contact-information">

          <span className="contact-label">
            CONTACT LAPTOPIFY
          </span>

          <h2>
            We are here to
            <br />
            <strong>help.</strong>
          </h2>

          <p className="contact-description">
            Whether you are preparing to sell your laptop or simply
            want to understand how the Laptopify process works,
            you can reach out to us using the form.
          </p>


          <div className="contact-info-list">

            <div className="contact-info-card">

              <div className="contact-icon">
                ✉
              </div>

              <div>
                <span>EMAIL</span>

                <strong>
                  cherishbywedknotcraft@gmail.com
                </strong>

                <p>
                  Send us your questions anytime.
                </p>
              </div>

            </div>


            <div className="contact-info-card">

              <div className="contact-icon">
                ☎
              </div>

              <div>
                <span>PHONE</span>

                <strong>
                  9876543210
                </strong>

                <p>
                  Available for Laptopify enquiries.
                </p>
              </div>

            </div>


            <div className="contact-info-card">

              <div className="contact-icon">
                ◉
              </div>

              <div>
                <span>SUPPORT</span>

                <strong>
                  Laptop Buyback Support
                </strong>

                <p>
                  Questions about submission, KYC or inspection.
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* FORM */}

        <div className="contact-form-card">

          <div className="form-top">

            <div>

              <span>
                SEND A MESSAGE
              </span>

              <h3>
                How can we help?
              </h3>

            </div>

            <div className="form-number">
              01
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="contact-form-grid">

              <div className="contact-input">

                <label>
                  YOUR NAME *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />

              </div>


              <div className="contact-input">

                <label>
                  EMAIL ADDRESS *
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>


              <div className="contact-input">

                <label>
                  MOBILE NUMBER
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                />

              </div>


              <div className="contact-input">

                <label>
                  SUBJECT *
                </label>

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select a subject
                  </option>

                  <option value="Laptop Selling">
                    Laptop Selling
                  </option>

                  <option value="KYC Verification">
                    KYC Verification
                  </option>

                  <option value="Inspection">
                    Laptop Inspection
                  </option>

                  <option value="Valuation">
                    Valuation
                  </option>

                  <option value="Purchase Status">
                    Purchase Status
                  </option>

                  <option value="Other">
                    Other Enquiry
                  </option>

                </select>

              </div>

            </div>


            <div className="contact-input message-input">

              <label>
                YOUR MESSAGE *
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows="6"
                required
              ></textarea>

            </div>


            <div className="form-bottom">

              <p>
                By submitting this form, you are sending an enquiry
                to the Laptopify support team.
              </p>

              <button
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}

                {!loading && <span>↗</span>}
              </button>

            </div>


            {submitted && (

              <div className="success-message" role="status" aria-live="polite">
                ✓ Your message has been submitted successfully.
              </div>

            )}

            {errorMessage && (
              <div className="error-message" role="alert" aria-live="assertive">
                {errorMessage}
              </div>
            )}

          </form>

        </div>

      </section>


      {/* PROCESS INFORMATION */}

      <section className="contact-process">

        <div className="process-heading">

          <span>
            WHAT HAPPENS NEXT?
          </span>

          <h2>
            From your message
            <br />
            to the <strong>right support.</strong>
          </h2>

        </div>


        <div className="process-grid">

          <div className="process-card">

            <span>01</span>

            <div className="process-icon">
              ✉
            </div>

            <h3>
              Message Received
            </h3>

            <p>
              Your enquiry is received with the information you
              provide through the contact form.
            </p>

          </div>


          <div className="process-card">

            <span>02</span>

            <div className="process-icon">
              ◌
            </div>

            <h3>
              Request Reviewed
            </h3>

            <p>
              Your question can be reviewed based on the type of
              support or Laptopify process you selected.
            </p>

          </div>


          <div className="process-card">

            <span>03</span>

            <div className="process-icon">
              ✓
            </div>

            <h3>
              Support Response
            </h3>

            <p>
              Our support team can respond with the appropriate
              information for your enquiry.
            </p>

          </div>

        </div>

      </section>


      {/* HELP */}

      <section className="contact-help">

        <div className="help-content">

          <span>
            NEED HELP?
          </span>

          <h2>
            Questions about
            <br />
            <strong>selling your laptop?</strong>
          </h2>

          <p>
            Laptopify follows a structured journey from laptop
            submission and verification through inspection,
            valuation and purchase.
          </p>

          <Link to="/how-it-works">
            See How It Works
            <span>↗</span>
          </Link>

        </div>


        <div className="help-list">

          <div>

            <span>01</span>

            <div>

              <h3>
                How do I sell my laptop?
              </h3>

              <p>
                Start from the Sell Your Laptop page and provide
                your laptop details.
              </p>

            </div>

          </div>


          <div>

            <span>02</span>

            <div>

              <h3>
                What happens after submission?
              </h3>

              <p>
                The request can move through verification,
                inspection and valuation stages.
              </p>

            </div>

          </div>


          <div>

            <span>03</span>

            <div>

              <h3>
                How is the laptop evaluated?
              </h3>

              <p>
                Laptop specifications and inspection details are
                considered before valuation.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="contact-cta">

        <div>

          <span>
            READY TO BEGIN?
          </span>

          <h2>
            Your laptop journey
            <br />
            starts <strong>here.</strong>
          </h2>

          <p>
            Have your laptop details ready and start your
            Laptopify submission.
          </p>

          <Link to="/sell-laptop">
            Sell Your Laptop
            <span>↗</span>
          </Link>

        </div>

      </section>


      {/* FOOTER */}

      

    </main>
  );
}

export default Contact;

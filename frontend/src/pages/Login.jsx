import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  // =========================
  // SEND OTP
  // =========================
  const sendOTP = async () => {
    setMessage("");
    setGeneratedOtp("");

    if (!mobile || mobile.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/api/auth/send-otp/",
        {
          mobile: mobile,
        }
      );

      setOtpSent(true);

      // Development testing only
      // Backend currently returns OTP in response.
      if (response.data.otp) {
        setGeneratedOtp(response.data.otp);
      }

      setMessage("OTP sent successfully.");
    } catch (error) {
      console.error("Send OTP Error:", error);

      setMessage(
        error.response?.data?.message ||
          "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const verifyOTP = async () => {
    setMessage("");

    if (!otp || otp.length !== 6) {
      setMessage("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/api/auth/verify-otp/",
        {
          mobile: mobile,
          otp: otp,
        }
      );

      // =========================
      // SAVE LOGIN INFORMATION
      // =========================

      localStorage.setItem(
        "user_id",
        response.data.user_id
      );

      localStorage.setItem(
        "mobile",
        response.data.mobile
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      // JWT Access Token
      if (response.data.access) {
        localStorage.setItem(
          "access_token",
          response.data.access
        );
      }

      // JWT Refresh Token
      if (response.data.refresh) {
        localStorage.setItem(
          "refresh_token",
          response.data.refresh
        );
      }

      setMessage(
        "Mobile number verified successfully."
      );

      // Go to Sell Laptop page
      setTimeout(() => {
        navigate("/sell-laptop");
      }, 800);

    } catch (error) {
      console.error("Verify OTP Error:", error);

      setMessage(
        error.response?.data?.message ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESET OTP
  // =========================
  const changeNumber = () => {
    setOtpSent(false);
    setOtp("");
    setGeneratedOtp("");
    setMessage("");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* BADGE */}
        <div className="login-badge">
          LAPTOPIFY
        </div>

        {/* TITLE */}
        <h1>
          Welcome back
        </h1>

        <p className="login-subtitle">
          Enter your mobile number and we’ll send you a one-time login code.
        </p>

        {/* =========================
            MOBILE NUMBER
        ========================= */}

        <div className="login-field">

          <label>
            Mobile Number
          </label>

          <div className="mobile-input">

            <span>
              +91
            </span>

            <input
              type="tel"
              maxLength="10"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) =>
                setMobile(
                  e.target.value.replace(/\D/g, "")
                )
              }
              disabled={otpSent}
            />

          </div>

        </div>

        {/* =========================
            SEND OTP
        ========================= */}

        {!otpSent && (
          <button
            className="login-button"
            type="button"
            onClick={sendOTP}
            disabled={loading}
          >
            {loading
              ? "Sending OTP..."
              : "Login"}

            <span>
              →
            </span>
          </button>
        )}

        {/* =========================
            OTP SECTION
        ========================= */}

        {otpSent && (
          <>

            <div className="login-field">

              <label>
                Enter OTP
              </label>

              <input
                className="otp-input"
                type="text"
                inputMode="numeric"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "")
                  )
                }
              />

            </div>

            {/* DEVELOPMENT OTP */}

            {generatedOtp && (
              <div className="dev-otp">
                Development OTP:{" "}
                <strong>
                  {generatedOtp}
                </strong>
              </div>
            )}

            {/* VERIFY BUTTON */}

            <button
              className="login-button"
              type="button"
              onClick={verifyOTP}
              disabled={loading}
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}

              <span>
                ✓
              </span>
            </button>

            {/* CHANGE NUMBER */}

            <button
              type="button"
              className="change-number-button"
              onClick={changeNumber}
            >
              ← Change mobile number
            </button>

          </>
        )}

        {/* =========================
            MESSAGE
        ========================= */}

        {message && (
          <div className="login-message">
            {message}
          </div>
        )}

      </div>

    </div>
  );
}

export default Login;

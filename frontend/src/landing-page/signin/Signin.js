import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Signin() {
  const location = useLocation();
  const registeredEmail = location.state?.email || "";
  const wasRegistered = location.state?.registered || false;

  const [formData, setFormData] = useState({
    email: registeredEmail,
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signinSuccess, setSigninSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errs.password = "Password is required";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await fetch("http://localhost:3002/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        login(data.token, data.user);
        setSigninSuccess(true);
        // Automatically redirect to the Trading Dashboard (port 3001) with clean URL
        setTimeout(() => {
          window.location.href = "http://localhost:3001/";
        }, 800);
      } else {
        setServerError(data.message || "Invalid credentials. Please verify your email and password.");
      }
    } catch (err) {
      console.error("Sign in network error:", err);
      setServerError("Unable to connect to authentication server. Please check your network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signin-page-wrapper py-5">
      <div className="container">
        <div className="signin-card-container mx-auto">
          {/* Header block */}
          <div className="text-center mb-4">
            <span className="home-section-tag mb-2">Console Access</span>
            <h1 className="signin-title fw-bold mb-2">Sign in to Zero-One</h1>
            <p className="signin-subtitle text-secondary mb-0">
              Enter your credentials to access your trading console and portfolio.
            </p>
          </div>

          {/* Form Card */}
          <div className="signin-card">
            {wasRegistered && !signinSuccess && (
              <div className="signin-alert signin-alert-info mb-4" role="alert">
                <i className="fa fa-info-circle me-2 fs-5 flex-shrink-0"></i>
                <div>Your account has been registered. Please enter your password to sign in.</div>
              </div>
            )}

            {serverError && (
              <div className="signin-alert signin-alert-danger mb-4" role="alert">
                <i className="fa fa-exclamation-circle me-2 fs-5 flex-shrink-0"></i>
                <div>{serverError}</div>
              </div>
            )}

            {signinSuccess && (
              <div className="signin-alert signin-alert-success mb-4" role="alert">
                <i className="fa fa-check-circle me-2 fs-5 flex-shrink-0"></i>
                <div>Authentication successful! Opening Trading Dashboard...</div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Email Address */}
              <div className="mb-3">
                <label className="signin-label" htmlFor="signin-email">
                  Email Address
                </label>
                <div className="signin-input-wrap">
                  <input
                    type="email"
                    id="signin-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`signin-input ${errors.email ? "is-invalid" : ""}`}
                    placeholder="name@domain.com"
                    disabled={isSubmitting || signinSuccess}
                    autoComplete="email"
                    autoFocus={!registeredEmail}
                  />
                </div>
                {errors.email && (
                  <div className="signin-field-error">
                    <i className="fa fa-info-circle me-1"></i>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="signin-label" htmlFor="signin-password">
                  Password
                </label>
                <div className="signin-input-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="signin-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`signin-input pe-5 ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter your password"
                    disabled={isSubmitting || signinSuccess}
                    autoComplete="current-password"
                    autoFocus={!!registeredEmail}
                  />
                  <button
                    type="button"
                    className="signin-pw-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex="-1"
                  >
                    <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                {errors.password && (
                  <div className="signin-field-error">
                    <i className="fa fa-info-circle me-1"></i>
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn btn-primary w-100 signin-submit-btn"
                disabled={isSubmitting || signinSuccess}
              >
                {isSubmitting ? (
                  <span className="d-flex align-items-center justify-content-center">
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing In...
                  </span>
                ) : (
                  "Sign In to Console"
                )}
              </button>

              {/* Sign Up link */}
              <div className="text-center mt-3 pt-2 text-secondary small">
                Don't have an account yet?{" "}
                <Link to="/signup" className="signin-signup-link fw-medium">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>

          {/* Institutional Trust Footnote */}
          <div className="signin-trust-footnote text-center text-secondary small mt-4">
            <span className="d-inline-flex align-items-center gap-2">
              <i className="fa fa-shield text-primary"></i>
              <span>Paper trading simulation • Virtual market environment</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;

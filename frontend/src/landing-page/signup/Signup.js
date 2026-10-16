import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 6) {
      errs.password = "Password must be at least 6 characters long";
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
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
      const response = await fetch("http://localhost:3002/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        login(data.token, data.user);
        setSignupSuccess(true);
        setTimeout(() => {
          navigate("/signin", { state: { registered: true, email: formData.email } });
        }, 1200);
      } else {
        setServerError(data.message || "Failed to create account. Please try again.");
      }
    } catch (err) {
      console.error("Signup network error:", err);
      setServerError("Unable to connect to authentication server. Please check your backend connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page-wrapper py-5">
      <div className="container">
        <div className="signup-card-container mx-auto">
          {/* Header block */}
          <div className="text-center mb-4">
            <span className="home-section-tag mb-2">Account Creation</span>
            <h1 className="signup-title fw-bold mb-2">Create your Zero-One account</h1>
            <p className="signup-subtitle text-secondary mb-0">
              Start paper trading with ₹1,00,000 in virtual capital and zero brokerage fees.
            </p>
          </div>

          {/* Form Card */}
          <div className="signup-card">
            {serverError && (
              <div className="signup-alert signup-alert-danger mb-4" role="alert">
                <i className="fa fa-exclamation-circle me-2 fs-5 flex-shrink-0"></i>
                <div>{serverError}</div>
              </div>
            )}

            {signupSuccess && (
              <div className="signup-alert signup-alert-success mb-4" role="alert">
                <i className="fa fa-check-circle me-2 fs-5 flex-shrink-0"></i>
                <div>Account created successfully! Redirecting to sign in...</div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div className="mb-3">
                <label className="signup-label" htmlFor="signup-name">
                  Full Name
                </label>
                <div className="signup-input-wrap">
                  <input
                    type="text"
                    id="signup-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`signup-input ${errors.name ? "is-invalid" : ""}`}
                    placeholder="e.g. Ankit Swami"
                    disabled={isSubmitting || signupSuccess}
                    autoComplete="name"
                  />
                </div>
                {errors.name && (
                  <div className="signup-field-error">
                    <i className="fa fa-info-circle me-1"></i>
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div className="mb-3">
                <label className="signup-label" htmlFor="signup-email">
                  Email Address
                </label>
                <div className="signup-input-wrap">
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`signup-input ${errors.email ? "is-invalid" : ""}`}
                    placeholder="name@domain.com"
                    disabled={isSubmitting || signupSuccess}
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <div className="signup-field-error">
                    <i className="fa fa-info-circle me-1"></i>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="signup-label" htmlFor="signup-password">
                  Password
                </label>
                <div className="signup-input-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`signup-input pe-5 ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Minimum 6 characters"
                    disabled={isSubmitting || signupSuccess}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="signup-pw-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex="-1"
                  >
                    <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                {errors.password && (
                  <div className="signup-field-error">
                    <i className="fa fa-info-circle me-1"></i>
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="signup-label" htmlFor="signup-confirmPassword">
                  Confirm Password
                </label>
                <div className="signup-input-wrap">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="signup-confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`signup-input pe-5 ${errors.confirmPassword ? "is-invalid" : ""}`}
                    placeholder="Re-enter your password"
                    disabled={isSubmitting || signupSuccess}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="signup-pw-toggle"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    tabIndex="-1"
                  >
                    <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="signup-field-error">
                    <i className="fa fa-info-circle me-1"></i>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn btn-primary w-100 signup-submit-btn"
                disabled={isSubmitting || signupSuccess}
              >
                {isSubmitting ? (
                  <span className="d-flex align-items-center justify-content-center">
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating Account...
                  </span>
                ) : (
                  "Create Free Account"
                )}
              </button>

              {/* Sign In link */}
              <div className="text-center mt-3 pt-2 text-secondary small">
                Already registered with Zero-One?{" "}
                <Link to="/signin" className="signup-signin-link fw-medium">
                  Sign In
                </Link>
              </div>
            </form>
          </div>

          {/* Institutional Trust Footnote */}
          <div className="signup-trust-footnote text-center text-secondary small mt-4">
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

export default Signup;
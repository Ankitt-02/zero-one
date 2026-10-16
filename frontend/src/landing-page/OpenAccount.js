import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <section className="home-section py-5 text-center">
      <div className="container">
        <div
          className="mx-auto p-4 p-md-5 rounded-4"
          style={{
            maxWidth: "840px",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
          }}
        >
          <span className="home-section-tag mb-3">Get Started Today</span>
          <h2
            className="fw-bold mb-3"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            Ready to Experience Modern Trading?
          </h2>
          <p
            className="text-secondary fs-5 mb-4 mx-auto"
            style={{ maxWidth: "600px", lineHeight: 1.6 }}
          >
            Join active traders and long-term investors on Zero-One. Open your
            paperless demat account in under 5 minutes with zero onboarding fees.
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-4">
            <Link
              to="/signup"
              className="btn btn-primary px-4 py-2 fs-5 fw-medium shadow-sm w-100 w-sm-auto"
              style={{ maxWidth: "280px" }}
            >
              Open Account for Free
            </Link>
            <Link
              to="/pricing"
              className="btn btn-outline-secondary px-4 py-2 fs-5 fw-medium w-100 w-sm-auto"
              style={{
                maxWidth: "280px",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            >
              Explore Pricing
            </Link>
          </div>

          <div className="d-flex flex-column flex-sm-row flex-wrap justify-content-center align-items-center gap-2 gap-sm-4 text-secondary small pt-2">
            <div>
              <i className="fa fa-check text-success me-1"></i> 100% Digital KYC
            </div>
            <div>
              <i className="fa fa-check text-success me-1"></i> Zero Maintenance Fee in Year 1
            </div>
            <div>
              <i className="fa fa-check text-success me-1"></i> No Credit Card Required
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OpenAccount;

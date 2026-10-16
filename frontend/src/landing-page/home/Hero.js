import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="home-section py-5 text-center">
      <div className="container">
        <div className="mx-auto mb-4" style={{ maxWidth: "800px" }}>
          <span className="home-section-tag">
            Next-Gen Trading & Investment Ecosystem
          </span>

          <h1
            className="fw-bold mb-3"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
            }}
          >
            Invest in Everything. <br className="d-none d-md-inline" />
            Trade with Absolute Confidence.
          </h1>

          <p
            className="text-secondary fs-5 mb-4 mx-auto"
            style={{ maxWidth: "620px", lineHeight: 1.6 }}
          >
            Online platform to invest in stocks, derivatives, mutual funds, ETFs,
            and bonds with low latency execution and zero hidden fees.
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-4">
            <Link
              to="/signup"
              className="btn btn-primary px-4 py-2 fw-medium shadow-sm w-100 w-sm-auto"
              style={{ maxWidth: "260px" }}
            >
              Open Free Account
            </Link>
            <a
              href="http://localhost:3001"
              className="btn btn-outline-secondary px-4 py-2 fw-medium w-100 w-sm-auto"
              style={{
                maxWidth: "260px",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            >
              Launch Terminal <i className="fa fa-arrow-right ms-1 small"></i>
            </a>
          </div>

          <div className="d-flex flex-column flex-sm-row flex-wrap justify-content-center align-items-center gap-2 gap-sm-4 text-secondary small pt-2">
            <div className="d-flex align-items-center">
              <i className="fa fa-check-circle text-primary me-2"></i>
              <span>₹0 Brokerage on Equity Delivery</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="fa fa-bolt text-warning me-2"></i>
              <span>Sub-millisecond Order Routing</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="fa fa-lock text-success me-2"></i>
              <span>SEBI & Exchange Regulated</span>
            </div>
          </div>
        </div>

        <div
          className="mx-auto mt-5 home-hero-img-wrap"
          style={{ maxWidth: "960px" }}
        >
          <img
            src="media/images/homeHero.png"
            alt="Zero-One Trading Ecosystem"
            className="img-fluid w-100 d-block"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
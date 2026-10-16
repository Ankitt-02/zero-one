import React from "react";
import { Link } from "react-router-dom";

function Education() {
  return (
    <section className="home-section py-5" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 col-12 text-center">
            <div
              className="p-3 p-md-4 rounded-4"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <img
                src="media/images/education.png"
                alt="Open financial literacy and market education"
                className="img-fluid"
                style={{ maxHeight: "360px", width: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="col-lg-6 col-12">
            <span className="home-section-tag">Market Knowledge</span>
            <h2
              className="fw-bold mb-3"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.35rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Free & Open Education for Every Trader
            </h2>
            <p className="text-secondary fs-6 mb-4" style={{ lineHeight: 1.65 }}>
              We believe financial literacy precedes intelligent capital allocation.
              Explore our structured learning modules and active investor forum:
            </p>

            <div className="d-flex flex-column gap-4">
              <div
                className="p-3 rounded-3"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="fa fa-graduation-cap text-primary fs-5"></i>
                  <h3 className="fs-6 fw-semibold mb-0" style={{ color: "var(--text-primary)" }}>
                    Seekho Trading Academy
                  </h3>
                </div>
                <p className="text-secondary small mb-2" style={{ lineHeight: 1.55 }}>
                  The comprehensive stock market curriculum covering equity fundamentals,
                  technical chart patterns, risk management, and advanced derivative strategies.
                </p>
                <Link to="/signup" className="home-link small">
                  <span>Start learning for free</span>
                  <i className="fa fa-arrow-right small"></i>
                </Link>
              </div>

              <div
                className="p-3 rounded-3"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="fa fa-comments-o text-success fs-5"></i>
                  <h3 className="fs-6 fw-semibold mb-0" style={{ color: "var(--text-primary)" }}>
                    TradingQ&amp;A Community
                  </h3>
                </div>
                <p className="text-secondary small mb-2" style={{ lineHeight: 1.55 }}>
                  Active community of retail traders, quant enthusiasts, and market veterans
                  sharing real-time insights, regulatory updates, and answers to trading queries.
                </p>
                <Link to="/support" className="home-link small">
                  <span>Browse community discussions</span>
                  <i className="fa fa-arrow-right small"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
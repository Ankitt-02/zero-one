import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  const valueProps = [
    {
      title: "Customer-first by design",
      description:
        "Zero-One is engineered around investor outcomes, not vanity metrics. Every feature, from real-time charts to fast order routing, prioritizes clarity and execution speed.",
    },
    {
      title: "No spam, noise, or dark patterns",
      description:
        "No unsolicited stock tips, no aggressive gamification, and no artificial urgency. Just clean, reliable market tools designed to support your discipline.",
    },
    {
      title: "An interconnected ecosystem",
      description:
        "More than a basic broker: a unified financial suite connecting day trading, long-term investments, algorithmic APIs, and deep portfolio analytics.",
    },
    {
      title: "Disciplined capital stewardship",
      description:
        "We believe technology should encourage disciplined risk management and informed decisions, not hyperactive churning.",
    },
  ];

  return (
    <section className="home-section py-5" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 col-12">
            <span className="home-section-tag">Core Principles</span>
            <h2
              className="fw-bold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.35rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Trust Built on Absolute Transparency
            </h2>

            <div className="pe-lg-4">
              {valueProps.map((item, idx) => (
                <div key={idx} className="home-value-item">
                  <h3 className="fs-5 fw-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h3>
                  <p className="text-secondary small mb-0" style={{ lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6 col-12 text-center">
            <div
              className="p-3 p-md-4 rounded-4 mb-4"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <img
                src="media/images/ecosystem.png"
                alt="Zero-One Ecosystem Overview"
                className="img-fluid"
                style={{ maxHeight: "360px", width: "100%", objectFit: "contain" }}
              />
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-4">
              <Link to="/product" className="home-link">
                <span>Explore all ecosystem products</span>
                <i className="fa fa-arrow-right small"></i>
              </Link>
              <a href="http://localhost:3001" className="home-link">
                <span>Open Trading Console</span>
                <i className="fa fa-external-link small"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;

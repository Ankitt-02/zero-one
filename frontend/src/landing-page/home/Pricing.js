import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  const pricingPlans = [
    {
      price: "₹0",
      title: "Account Opening",
      desc: "Zero charges for paperless trading and demat account onboarding.",
      highlight: "Free Forever",
    },
    {
      price: "₹0",
      title: "Equity & Mutual Funds",
      desc: "Zero brokerage on equity delivery investments and direct mutual funds.",
      highlight: "Zero Commission",
    },
    {
      price: "₹20",
      title: "Intraday & F&O",
      desc: "Flat ₹20 or 0.03% (whichever is lower) per executed order on equity intraday, currency & commodities.",
      highlight: "Capped at ₹20",
    },
  ];

  return (
    <section className="home-section py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5 col-12">
            <span className="home-section-tag">Unbeatable Pricing</span>
            <h2
              className="fw-bold mb-3"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.35rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Zero Hidden Charges. Flat & Transparent Fees.
            </h2>
            <p className="text-secondary fs-6 mb-4" style={{ lineHeight: 1.65 }}>
              We pioneered discount brokerage and pricing transparency. No unexpected annual
              maintenance fees, no inflated spreads, and no trade minimums.
            </p>
            <Link to="/pricing" className="home-link fs-6">
              <span>View complete brokerage & regulatory calculator</span>
              <i className="fa fa-arrow-right small"></i>
            </Link>
          </div>

          <div className="col-lg-7 col-12">
            <div className="row g-3">
              {pricingPlans.map((plan, idx) => (
                <div key={idx} className="col-md-4 col-12">
                  <div className="home-pricing-card">
                    <div>
                      <span
                        className="badge mb-3"
                        style={{
                          background: "rgba(65, 132, 243, 0.12)",
                          color: "var(--primary-accent)",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          padding: "4px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {plan.highlight}
                      </span>
                      <div
                        className="fw-bold mb-1"
                        style={{
                          fontSize: "2.5rem",
                          lineHeight: 1,
                          color: "var(--text-primary)",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {plan.price}
                      </div>
                      <h3 className="fs-6 fw-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                        {plan.title}
                      </h3>
                      <p className="text-secondary small mb-0" style={{ lineHeight: 1.5 }}>
                        {plan.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;

import React from "react";

function Awards() {
  const assetClasses = [
    { name: "Futures & Options", icon: "fa-line-chart" },
    { name: "Commodity Derivatives", icon: "fa-cubes" },
    { name: "Currency Derivatives", icon: "fa-money" },
    { name: "Stocks & Primary IPOs", icon: "fa-building-o" },
    { name: "Direct Mutual Funds", icon: "fa-pie-chart" },
    { name: "Bonds & Govt. Securities", icon: "fa-shield" },
  ];

  return (
    <section className="home-section py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 col-12 text-center">
            <div
              className="p-3 p-md-4 rounded-4"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
              }}
            >
              <img
                src="media/images/largestBroker.png"
                alt="Institutional & Retail Brokerage Scale"
                className="img-fluid"
                style={{ maxHeight: "380px", objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="col-lg-6 col-12">
            <span className="home-section-tag">Market Leadership</span>
            <h2
              className="fw-bold mb-3"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.35rem)",
                letterSpacing: "-0.02em",
              }}
            >
              India's Pioneer in Technology-First Brokerage
            </h2>
            <p className="text-secondary fs-6 mb-4" style={{ lineHeight: 1.65 }}>
              Traders and investors place their trust in Zero-One every market day,
              executing orders seamlessly across all major exchange segments with
              transparent pricing and reliable order routing:
            </p>

            <div className="row g-2 mb-4">
              {assetClasses.map((item, idx) => (
                <div key={idx} className="col-sm-6 col-12">
                  <div
                    className="p-2 px-3 rounded-3 d-flex align-items-center gap-2"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-subtle)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <i
                      className={`fa ${item.icon} text-primary`}
                      style={{ width: "18px" }}
                    ></i>
                    <span className="fw-medium text-secondary">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-top" style={{ borderColor: "var(--border-color)" }}>
              <p
                className="text-muted small fw-medium text-uppercase mb-2"
                style={{ letterSpacing: "0.05em", fontSize: "0.75rem" }}
              >
                Featured In Leading Publications
              </p>
              <img
                src="media/images/pressLogos.png"
                alt="Press coverage"
                className="img-fluid"
                style={{ maxWidth: "100%", opacity: 0.85 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;

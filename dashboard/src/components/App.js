import React from "react";

const Apps = () => {
  const ecosystemApps = [
    {
      id: "core",
      title: "C⌀re Web & Mobile",
      subtitle: "Flagship Trading Platform",
      description:
        "Lightning-fast market data, advanced multi-timeframe charts, and customizable keyboard shortcuts for active day traders.",
      status: "Active",
      badgeColor: "#4caf50",
      icon: "fa-line-chart",
    },
    {
      id: "terminal",
      title: "Zero-One Terminal",
      subtitle: "Portfolio & Risk Analytics",
      description:
        "Comprehensive trade journal, P&L attribution, tax-loss harvesting calculators, and behavioral insights.",
      status: "Connected",
      badgeColor: "#4184f3",
      icon: "fa-dashboard",
    },
    {
      id: "paisa",
      title: "Paisa Direct",
      subtitle: "Mutual Funds & SIPs",
      description:
        "Invest directly in top-rated mutual funds with zero commission, automated step-up SIPs, and instant redemption.",
      status: "Available",
      badgeColor: "#9c27b0",
      icon: "fa-money",
    },
    {
      id: "seekho",
      title: "Seekh⊚",
      subtitle: "Trader Education Academy",
      description:
        "Bite-sized modules on technical analysis, options Greeks, risk management, and market fundamentals.",
      status: "Free Access",
      badgeColor: "#ff9800",
      icon: "fa-graduation-cap",
    },
    {
      id: "connect",
      title: "Zero-One Connect API",
      subtitle: "Developer & Algo Trading",
      description:
        "High-performance REST & WebSocket APIs for programmatic order execution and automated quant strategies.",
      status: "v2.4 Ready",
      badgeColor: "#607d8b",
      icon: "fa-code",
    },
  ];

  return (
    <div style={{ maxWidth: "1000px" }}>
      <h3 className="title">Zero-One Ecosystem Apps</h3>
      <p style={{ color: "var(--text-secondary, #666)", marginBottom: "2rem", fontSize: "0.95rem" }}>
        Integrated platforms and developer tools powering your investment workflow.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {ecosystemApps.map((app) => (
          <div
            key={app.id}
            style={{
              background: "var(--bg-card, #fff)",
              border: "1px solid var(--border-color, #e0e0e0)",
              borderRadius: "8px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "4px",
                    background: `${app.badgeColor}18`,
                    color: app.badgeColor,
                  }}
                >
                  {app.status}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#999" }}>{app.subtitle}</span>
              </div>

              <h4 style={{ margin: "0 0 8px 0", fontSize: "1.15rem", fontWeight: 600 }}>{app.title}</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary, #666)", lineHeight: "1.5", margin: 0 }}>
                {app.description}
              </p>
            </div>

            <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid var(--border-color, #eee)" }}>
              <button
                type="button"
                onClick={() => alert(`Launching ${app.title}...`)}
                style={{
                  background: "var(--primary-accent, #4184f3)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 14px",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Launch App
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
import React from "react";

function Stats() {
  return (
    <div className="container p-5">
      <div className="row p-5">
        <div className="col-6 p-5">
          <h1 className="fs-2 mb-5">Trust with confidence</h1>

          <h2 className="fs-4">Customer-first always</h2>
          <p className="text-muted">
            Zero One is built with a simple mindset — users come before metrics.
            Everything from the interface to the experience is designed to feel
            smooth, transparent, and genuinely useful for modern investors.
          </p>

          <h2 className="fs-4">No spam or gimmicks</h2>
          <p className="text-muted">
            No random notifications screaming “HOT STOCK ALERT 🚀” at 2AM. No
            fake urgency. No casino-style investing experience. Just clean apps
            that let you trade and invest without frying your attention span.
          </p>

          <h2 className="fs-4">The Zero-One universe</h2>
          <p className="text-muted">
            Zero One is more than a trading platform. It’s an ecosystem built
            around modern investing, technology, and tools that actually solve
            problems instead of adding fifteen more dashboard tabs.
          </p>

          <h2 className="fs-4">Do better with money</h2>
          <p className="text-muted">
            We believe good platforms should help users make smarter decisions,
            not just more transactions. Because watching candlestick charts all
            day does not automatically make any of us Warren Buffett.
          </p>
        </div>
        <div className="col-6 p-5">
          <img
            src="media/images/ecosystem.png"
            alt="stats"
            style={{ width: "165%" }}
          ></img>
          <div className="text-center">
            <a href="demo" className="mx-5" style={{ textDecoration: "none" }}>
              Explore our products{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a href="Demo" style={{ textDecoration: "none" }}>
              Try C⌀re Demo{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;

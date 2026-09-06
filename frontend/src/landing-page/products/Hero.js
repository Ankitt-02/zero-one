import React from "react";

function Hero() {
  return (
    <div className="container border-bottom mb-5">
      <div className="text-center mt-5">
        <h1>Zero-One Products</h1>
        <h3 className="text-muted mt-3 fs-5">
          Built for modern investors who prefer clean charts over financial
          chaos.
        </h3>
        <p className="mt-3 mb-5">
          Check out our{" "}
          <a href="/demo" style={{ textDecoration: "none" }}>
            investment offerings{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;

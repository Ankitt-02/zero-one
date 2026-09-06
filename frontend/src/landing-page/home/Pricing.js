import React from "react";

function Pricing() {
  return (
    <div className="container my-5 mb-5">
      <div className="row align-items-center">
        {/* LEFT */}
        <div className="col-lg-5">
          <h1 className="fs-2">Unbeatable pricing</h1>

          <p className="text-muted">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>

          <a href="demo" className="text-primary text-decoration-none">
            See pricing <i className="fa fa-long-arrow-right"></i>
          </a>
        </div>

        {/* RIGHT */}
        <div className="col-lg-7 mb-5">
          <div className="row g-4">
            <div className="col-md-4 d-flex align-items-start">
              <h1 className="display-5 text-warning me-2 mb-0">₹0</h1>
              <p className="mb-0 text-muted fs-6 lh-sm mt-2">
                Free account opening
              </p>
            </div>

            <div className="col-md-4 d-flex align-items-start">
              <h1 className="display-5 text-warning me-2 mb-0">₹0</h1>
              <p className="mb-0 text-muted fs-6 lh-sm mt-2">
                Free equity delivery and direct mutual funds
              </p>
            </div>

            <div className="col-md-4 d-flex align-items-start">
              <h1 className="display-5 text-warning me-2 mb-0">₹20</h1>
              <p className="mb-0 text-muted fs-6 lh-sm mt-2">
                Intraday and F&amp;O
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;

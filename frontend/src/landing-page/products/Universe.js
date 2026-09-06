import React from "react";

function Universe() {
  return (
    <div className="container">
      <div className="row text-center">
        <h1>The Zero One Ecosystem</h1>
        <p>
          Everything you need for trading, investing, and controlled financial
          chaos.
        </p>
        <div className="col-4 mt-5">
          <img src="/media/images/corelogo.png" alt="some img" style={{ width: "100%" }}></img>
          <p className="text-small text-muted">Built for trend spotters.</p>
        </div>
        <div className="col-4 mt-5">
          <img src="/media/images/freak.png" alt="some img" style={{ width: "100%" }}></img>
          <p className="text-small text-muted">Where logic trades, not emotions.</p>
        </div>
        <div className="col-4 mt-5">
          <img src="/media/images/bigbull.png" alt="some img" style={{ width: "100%" }}></img>
          <p className="text-small text-muted">High risk, higher character development.</p>
        </div>
        <div className="col-4 mt-5">
          <img src="/media/images/wallet.png" alt="some img" style={{ width: "100%" }}></img>
          <p className="text-small text-muted">Professional money management.</p>
        </div>
        <div className="col-4 mt-5">
          <img src="/media/images/terminal_logo.png" alt="some img" style={{ width: "100%" }}></img>
          <p className="text-small text-muted">Analytics for every trade and every regret.</p>
        </div>
        <div className="col-4 mt-3">
          <img src="/media/images/sink.png" alt="some img" style={{ width: "100%" }}></img>
          <p className="text-muted">Insurance, but without the headache.</p>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 mt-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Sign up Now
        </button>
      </div>
    </div>
  );
}

export default Universe;

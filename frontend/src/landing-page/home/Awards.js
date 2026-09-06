import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5">
          <img
            src="media/images/largestBroker.png"
            alt="Awards"
            style={{ width: "90%" }}
          ></img>
        </div>
        <div className="col-6 p-5 mt-3">
          <h1>Largest Broker in India</h1>
          <p className="mb-5">
            Thousands of traders and investors use Zero One daily to buy, sell,
            panic, recover, and occasionally make very smart financial decisions
            across multiple market segments:
          </p>
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <p>Future & options</p>
                </li>
                <li>
                  <p>Comodity Derivatives</p>
                </li>
                <li>
                  <p>Currency Derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  <p>Stocks & IPOs</p>
                </li>
                <li>
                  <p>Direct Mutual Funds</p>
                </li>
                <li>
                  <p>Bonds and Govt. Securities</p>
                </li>
              </ul>
            </div>
          </div>
          <img src="media/images/pressLogos.png" alt="press-images"></img>
        </div>
      </div>
    </div>
  );
}

export default Awards;

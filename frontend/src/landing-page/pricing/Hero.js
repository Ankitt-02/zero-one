import React, { useState } from "react";

function Hero() {
  const [activeTab, setActiveTab] = useState("equity");

  return (
    <div className="container">
      {/* Heading */}
      <div className="row p-5 mt-5 border-bottom text-center">
        <h1>Pricing</h1>

        <h4 className="text-muted">
          Simple pricing, because math is already stressful.
        </h4>
      </div>

      {/* Cards */}
      <div className="row p-5 mt-5">
        <div className="col-4 p-5">
          <img src="/media/images/pricingEquity.svg" alt="₹0" />

          <h1 className="fs-4 mt-4">Free equity delivery</h1>

          <p className="text-muted">
            All equity delivery investments are completely free. Because paying
            brokerage for long term investing in 2026 feels a little
            prehistoric.
          </p>
        </div>

        <div className="col-4 p-5">
          <img src="/media/images/intradayTrades.svg" alt="₹20" />

          <h1 className="fs-4 mt-4">Intraday and F&O trades</h1>

          <p className="text-muted">
            Flat pricing on intraday and F&O trades with zero complicated
            calculations. Losing money to market volatility is already enough
            confusion.
          </p>
        </div>

        <div className="col-4 p-5">
          <img src="/media/images/pricing0.svg" alt="₹0" />

          <h1 className="fs-4 mt-4">Free direct MF</h1>

          <p className="text-muted">
            Invest in direct mutual funds with zero commission and no hidden
            drama. Your SIP deserves peace, consistency, and fewer surprise
            charges.
          </p>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="row mt-5 mb-5">
        <div className="col-12">
          {/* Tabs */}
          <div className="d-flex gap-5 border-bottom mb-4 fs-2 fw-medium">
            <div
              onClick={() => setActiveTab("equity")}
              className={`pb-3 ${
                activeTab === "equity"
                  ? "text-primary border-primary"
                  : "text-muted"
              }`}
              style={{
                borderBottom:
                  activeTab === "equity" ? "3px solid #0d6efd" : "none",
                cursor: "pointer",
              }}
            >
              Equity
            </div>

            <div
              onClick={() => setActiveTab("currency")}
              className={`pb-3 ${
                activeTab === "currency"
                  ? "text-primary border-primary"
                  : "text-muted"
              }`}
              style={{
                borderBottom:
                  activeTab === "currency" ? "3px solid #0d6efd" : "none",
                cursor: "pointer",
              }}
            >
              Currency
            </div>

            <div
              onClick={() => setActiveTab("commodity")}
              className={`pb-3 ${
                activeTab === "commodity"
                  ? "text-primary border-primary"
                  : "text-muted"
              }`}
              style={{
                borderBottom:
                  activeTab === "commodity" ? "3px solid #0d6efd" : "none",
                cursor: "pointer",
              }}
            >
              Commodity
            </div>
          </div>

          {/*= EQUITY TABLE =*/}
          {activeTab === "equity" && (
            <div
              className="table-responsive border rounded mx-auto"
              style={{ width: "92%" }}
            >
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th></th>
                    <th className="p-4">Equity delivery</th>
                    <th className="p-4">Equity intraday</th>
                    <th className="p-4">F&O - Futures</th>
                    <th className="p-4">F&O - Options</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="p-4 text-muted fw-medium">Brokerage</td>

                    <td className="p-4">Zero Brokerage</td>

                    <td className="p-4">
                      0.03% or Rs. 20/executed order whichever is lower
                    </td>

                    <td className="p-4">
                      0.03% or Rs. 20/executed order whichever is lower
                    </td>

                    <td className="p-4">Flat Rs. 20 per executed order</td>
                  </tr>

                  <tr className="table-light">
                    <td className="p-4 text-muted fw-medium">STT/CTT</td>

                    <td className="p-4">0.1% on buy & sell</td>

                    <td className="p-4">0.025% on the sell side</td>

                    <td className="p-4">0.05% on the sell side</td>

                    <td className="p-4">
                      <ul className="mb-0 ps-3">
                        <li>
                          0.15% of the intrinsic value on options that are
                          bought and exercised
                        </li>

                        <li>0.15% on sell side (on premium)</li>
                      </ul>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 text-muted fw-medium">
                      Transaction charges
                    </td>

                    <td className="p-4">
                      NSE: 0.00307%
                      <br />
                      BSE: 0.00375%
                    </td>

                    <td className="p-4">
                      NSE: 0.00307%
                      <br />
                      BSE: 0.00375%
                    </td>

                    <td className="p-4">
                      NSE: 0.00183%
                      <br />
                      BSE: 0
                    </td>

                    <td className="p-4">
                      NSE: 0.03553% (on premium)
                      <br />
                      BSE: 0.0325% (on premium)
                    </td>
                  </tr>

                  <tr className="table-light">
                    <td className="p-4 text-muted fw-medium">GST</td>

                    <td className="p-4">
                      18% on (brokerage + SEBI charges + transaction charges)
                    </td>

                    <td className="p-4">
                      18% on (brokerage + SEBI charges + transaction charges)
                    </td>

                    <td className="p-4">
                      18% on (brokerage + SEBI charges + transaction charges)
                    </td>

                    <td className="p-4">
                      18% on (brokerage + SEBI charges + transaction charges)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 text-muted fw-medium">SEBI charges</td>

                    <td className="p-4">₹10 / crore</td>
                    <td className="p-4">₹10 / crore</td>
                    <td className="p-4">₹10 / crore</td>
                    <td className="p-4">₹10 / crore</td>
                  </tr>

                  <tr className="table-light">
                    <td className="p-4 text-muted fw-medium">Stamp charges</td>

                    <td className="p-4">0.015% or ₹1500 / crore on buy side</td>

                    <td className="p-4">0.003% or ₹300 / crore on buy side</td>

                    <td className="p-4">0.002% or ₹200 / crore on buy side</td>

                    <td className="p-4">0.003% or ₹300 / crore on buy side</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* ===================== CURRENCY TABLE ===================== */}
          {activeTab === "currency" && (
            <div className="table-responsive border rounded">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th></th>
                    <th className="p-4">Currency futures</th>
                    <th className="p-4">Currency options</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="p-4 text-muted fw-medium">Brokerage</td>

                    <td className="p-4">
                      0.03% or ₹20/executed order whichever is lower
                    </td>

                    <td className="p-4">₹20/executed order</td>
                  </tr>

                  <tr className="table-light">
                    <td className="p-4 text-muted fw-medium">STT/CTT</td>

                    <td className="p-4">No STT</td>
                    <td className="p-4">No STT</td>
                  </tr>

                  <tr>
                    <td className="p-4 text-muted fw-medium">
                      Transaction charges
                    </td>

                    <td className="p-4">
                      NSE: 0.00035%
                      <br />
                      BSE: 0.00045%
                    </td>

                    <td className="p-4">
                      NSE: 0.0311%
                      <br />
                      BSE: 0.001%
                    </td>
                  </tr>

                  <tr className="table-light">
                    <td className="p-4 text-muted fw-medium">GST</td>

                    <td className="p-4">
                      18% on (brokerage + SEBI charges + transaction charges)
                    </td>

                    <td className="p-4">
                      18% on (brokerage + SEBI charges + transaction charges)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 text-muted fw-medium">SEBI charges</td>

                    <td className="p-4">₹10 / crore</td>
                    <td className="p-4">₹10 / crore</td>
                  </tr>

                  <tr className="table-light">
                    <td className="p-4 text-muted fw-medium">Stamp charges</td>

                    <td className="p-4">0.0001% or ₹10 / crore on buy side</td>

                    <td className="p-4">0.0001% or ₹10 / crore on buy side</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* ===================== COMMODITY TABLE ===================== */}
          {activeTab === "commodity" && (
            <div className="table-responsive border rounded">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th></th>
                    <th className="p-4">Commodity futures</th>
                    <th className="p-4">Commodity options</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="p-4 text-muted fw-medium">Brokerage</td>

                    <td className="p-4">
                      0.03% or Rs. 20/executed order whichever is lower
                    </td>

                    <td className="p-4">₹20/executed order</td>
                  </tr>

                  <tr className="table-light">
                    <td className="p-4 text-muted fw-medium">STT/CTT</td>

                    <td className="p-4">0.01% on sell side (Non-Agri)</td>

                    <td className="p-4">0.05% on sell side</td>
                  </tr>

                  <tr>
                    <td className="p-4 text-muted fw-medium">
                      Transaction charges
                    </td>

                    <td className="p-4">
                      MCX: 0.0021%
                      <br />
                      NSE: 0.0001%
                    </td>

                    <td className="p-4">
                      MCX: 0.0418%
                      <br />
                      NSE: 0.001%
                    </td>
                  </tr>

                  <tr className="table-light">
                    <td className="p-4 text-muted fw-medium">GST</td>

                    <td className="p-4">
                      18% on (brokerage + SEBI charges + transaction charges)
                    </td>

                    <td className="p-4">
                      18% on (brokerage + SEBI charges + transaction charges)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 text-muted fw-medium">SEBI charges</td>

                    <td className="p-4">
                      Agri: ₹1 / crore
                      <br />
                      Non-agri: ₹10 / crore
                    </td>

                    <td className="p-4">₹10 / crore</td>
                  </tr>

                  <tr className="table-light">
                    <td className="p-4 text-muted fw-medium">Stamp charges</td>

                    <td className="p-4">0.002% or ₹200 / crore on buy side</td>

                    <td className="p-4">0.003% or ₹300 / crore on buy side</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Hero;

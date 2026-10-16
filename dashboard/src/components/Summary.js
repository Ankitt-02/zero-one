import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  AccountBalanceWalletOutlined,
  ShowChartOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";

const Summary = () => {
  const { user, getAuthHeaders, logout } = useAuth();
  const [userName, setUserName] = useState(() => (user && user.name ? user.name : "Trader"));
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.name) {
      setUserName(user.name);
    }

    // Fetch user-isolated holdings for dynamic statistics
    axios
      .get("http://localhost:3002/allHoldings", {
        headers: getAuthHeaders(),
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setHoldings(res.data);
        }
      })
      .catch((err) => {
        console.warn("Summary holdings fetch notice:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          logout();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const totalInvestment = holdings.reduce(
    (acc, stock) => acc + (Number(stock.avg) || 0) * (Number(stock.qty) || 0),
    0
  );

  const totalCurrentValue = holdings.reduce(
    (acc, stock) => acc + (Number(stock.price) || 0) * (Number(stock.qty) || 0),
    0
  );

  const totalPnL = totalCurrentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  const isProfit = totalPnL >= 0;

  const formatCurrency = (val) =>
    "₹" + Number(val || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="summary-container">
      {/* Header section with greeting and account status badge */}
      <div className="summary-header">
        <div>
          <h2 className="summary-greeting">Hi, {userName}!</h2>
          <p className="summary-subtitle">
            Here is a summary of your trading account and portfolio today.
          </p>
        </div>
        <div className="summary-account-badge">
          <span className="summary-status-dot"></span>
          <span>Paper Trading Account · Active</span>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="summary-metrics-grid">
        {/* Equity & Margin Card */}
        <div className="summary-card">
          <div className="summary-card-header">
            <div className="summary-card-title-group">
              <AccountBalanceWalletOutlined className="summary-card-icon" />
              <h3 className="summary-card-title">Equity Balance & Margin</h3>
            </div>
            <Link to="/funds" className="summary-card-link">
              View Funds &rarr;
            </Link>
          </div>

          <div className="summary-card-body">
            <div className="summary-primary-metric">
              <span className="summary-metric-label">Margin Available</span>
              <div className="summary-metric-value">₹4,043.10</div>
            </div>

            <div className="summary-metric-divider"></div>

            <div className="summary-sub-metrics">
              <div className="summary-sub-metric-item">
                <span className="summary-sub-label">Margins Used</span>
                <span className="summary-sub-value">₹0.00</span>
              </div>
              <div className="summary-sub-metric-item">
                <span className="summary-sub-label">Opening Balance</span>
                <span className="summary-sub-value">₹4,043.10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Holdings Summary Card */}
        <div className="summary-card">
          <div className="summary-card-header">
            <div className="summary-card-title-group">
              <ShowChartOutlined className="summary-card-icon" />
              <h3 className="summary-card-title">Holdings ({holdings.length})</h3>
            </div>
            <Link to="/holdings" className="summary-card-link">
              View Holdings &rarr;
            </Link>
          </div>

          <div className="summary-card-body">
            {loading ? (
              <div className="summary-loading-state">
                <div className="summary-spinner"></div>
                <span>Loading portfolio summary...</span>
              </div>
            ) : (
              <>
                <div className="summary-primary-metric">
                  <span className="summary-metric-label">Total P&L</span>
                  <div className="summary-metric-value">
                    <span className={isProfit ? "profit" : "loss"}>
                      {isProfit ? "+" : ""}
                      {formatCurrency(totalPnL)}
                    </span>
                    <span className={`summary-pnl-pill ${isProfit ? "profit" : "loss"}`}>
                      {isProfit ? "+" : ""}
                      {pnlPercent.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="summary-metric-divider"></div>

                <div className="summary-sub-metrics">
                  <div className="summary-sub-metric-item">
                    <span className="summary-sub-label">Current Value</span>
                    <span className="summary-sub-value">{formatCurrency(totalCurrentValue)}</span>
                  </div>
                  <div className="summary-sub-metric-item">
                    <span className="summary-sub-label">Total Investment</span>
                    <span className="summary-sub-value">{formatCurrency(totalInvestment)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Holdings Section: either clean empty state or mini-table */}
      {!loading && (
        <>
          {holdings.length === 0 ? (
            <div className="summary-empty-card">
              <div className="summary-empty-content">
                <div className="summary-empty-icon-wrap">
                  <TrendingUpOutlined className="summary-empty-icon" />
                </div>
                <h4 className="summary-empty-title">No holdings in your portfolio</h4>
                <p className="summary-empty-desc">
                  You haven't bought any stocks yet. Search for symbols on the left watchlist to start trading with your paper account.
                </p>
              </div>
            </div>
          ) : (
            <div className="summary-holdings-preview-card">
              <div className="summary-card-header">
                <div className="summary-card-title-group">
                  <h4 className="summary-card-title">Portfolio Positions</h4>
                </div>
                <Link to="/holdings" className="summary-card-link">
                  Detailed Holdings &rarr;
                </Link>
              </div>
              <div className="summary-table-wrapper">
                <table className="summary-mini-table">
                  <thead>
                    <tr>
                      <th>Instrument</th>
                      <th style={{ textAlign: "right" }}>Qty</th>
                      <th style={{ textAlign: "right" }}>Avg Price</th>
                      <th style={{ textAlign: "right" }}>LTP</th>
                      <th style={{ textAlign: "right" }}>Cur. Value</th>
                      <th style={{ textAlign: "right" }}>P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.slice(0, 5).map((stock, idx) => {
                      const curVal = (stock.price || 0) * (stock.qty || 0);
                      const inv = (stock.avg || 0) * (stock.qty || 0);
                      const pnl = curVal - inv;
                      const stockProfit = pnl >= 0;
                      return (
                        <tr key={idx}>
                          <td className="summary-stock-name">{stock.name}</td>
                          <td style={{ textAlign: "right" }}>{stock.qty}</td>
                          <td style={{ textAlign: "right" }}>{formatCurrency(stock.avg)}</td>
                          <td style={{ textAlign: "right" }}>{formatCurrency(stock.price)}</td>
                          <td style={{ textAlign: "right" }}>{formatCurrency(curVal)}</td>
                          <td style={{ textAlign: "right" }} className={stockProfit ? "profit" : "loss"}>
                            {stockProfit ? "+" : ""}
                            {formatCurrency(pnl)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Summary;

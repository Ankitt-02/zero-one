import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import { useAuth } from "../context/AuthContext";
import { Close } from "@mui/icons-material";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, defaultMode = "BUY" }) => {
  const { closeBuyWindow } = useContext(GeneralContext);
  const { getAuthHeaders, logout } = useAuth();

  const stockInfo = watchlist.find((item) => item.name === uid);
  const initialPrice = stockInfo ? Number(stockInfo.price) || 100.0 : 100.0;

  const [mode, setMode] = useState(defaultMode);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(initialPrice);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState("error");

  // Sync mode if defaultMode changes
  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  // Sync price if stock symbol changes
  useEffect(() => {
    if (stockInfo) {
      setStockPrice(Number(stockInfo.price) || 100.0);
    }
  }, [uid, stockInfo]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeBuyWindow();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeBuyWindow]);

  const estimatedTotal = Number(stockQuantity || 0) * Number(stockPrice || 0);
  const formattedTotal =
    "₹" +
    estimatedTotal.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formattedLtp =
    "₹" +
    Number(initialPrice).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleSubmitOrder = async () => {
    const qtyNum = parseInt(stockQuantity, 10);
    const priceNum = parseFloat(stockPrice);

    if (isNaN(qtyNum) || qtyNum <= 0) {
      setStatusMsg("Please enter a valid positive quantity.");
      setStatusType("error");
      return;
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      setStatusMsg("Please enter a valid positive price.");
      setStatusType("error");
      return;
    }

    setIsSubmitting(true);
    setStatusMsg("");

    try {
      await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: qtyNum,
          price: priceNum,
          mode: mode,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      setStatusMsg("Order placed successfully!");
      setStatusType("success");
      setTimeout(() => {
        closeBuyWindow();
        window.dispatchEvent(new Event("orderPlaced"));
      }, 500);
    } catch (err) {
      console.error("Order error:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        logout();
        return;
      }
      setStatusMsg(err.response?.data?.error || "Failed to place order. Check connection.");
      setStatusType("error");
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    closeBuyWindow();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeBuyWindow();
    }
  };

  const isBuy = mode === "BUY";

  return ReactDOM.createPortal(
    <div
      className="order-modal-backdrop"
      onClick={handleBackdropClick}
      data-testid="order-modal-backdrop"
    >
      <div
        className={`order-ticket-dialog ${isBuy ? "mode-buy" : "mode-sell"}`}
        id="buy-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-ticket-title"
      >
        {/* Mode Indicator Bar */}
        <div className="order-ticket-accent-bar" />

        {/* Header */}
        <div className="order-ticket-header">
          <div className="order-ticket-title-area">
            <div className="order-ticket-heading-row">
              <span className={`order-badge ${isBuy ? "badge-buy" : "badge-sell"}`}>
                {mode}
              </span>
              <h3 id="order-ticket-title" className="order-ticket-symbol">
                {uid}
              </h3>
            </div>
            <p className="order-ticket-subtext">
              NSE &bull; Market LTP <span className="order-ticket-ltp">{formattedLtp}</span>
            </p>
          </div>

          <button
            type="button"
            className="order-ticket-close-btn"
            onClick={closeBuyWindow}
            aria-label="Close trading window"
          >
            <Close style={{ fontSize: "1.25rem" }} />
          </button>
        </div>

        {/* Segmented Mode Selector */}
        <div className="order-mode-selector">
          <button
            type="button"
            className={`order-mode-btn ${isBuy ? "active buy" : ""}`}
            onClick={() => setMode("BUY")}
          >
            Buy Order
          </button>
          <button
            type="button"
            className={`order-mode-btn ${!isBuy ? "active sell" : ""}`}
            onClick={() => setMode("SELL")}
          >
            Sell Order
          </button>
        </div>

        {/* Order Input Controls */}
        <div className="order-ticket-form">
          <div className="order-form-grid">
            <div className="order-field-group">
              <label htmlFor="order-qty" className="order-field-label">
                Quantity
              </label>
              <div className="order-input-wrapper">
                <input
                  id="order-qty"
                  name="qty"
                  type="number"
                  min="1"
                  step="1"
                  className="order-field-input"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <span className="order-field-hint">Lots: 1 &bull; Max: 10,000</span>
            </div>

            <div className="order-field-group">
              <label htmlFor="order-price" className="order-field-label">
                Order Price (₹)
              </label>
              <div className="order-input-wrapper">
                <span className="order-input-currency">₹</span>
                <input
                  id="order-price"
                  name="price"
                  type="number"
                  step="0.05"
                  min="0.05"
                  className="order-field-input order-field-with-currency"
                  value={stockPrice}
                  onChange={(e) => setStockPrice(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <span className="order-field-hint">Tick: ₹0.05</span>
            </div>
          </div>

          {/* Dynamic Summary Card */}
          <div className="order-summary-card">
            <div className="order-summary-row">
              <span className="order-summary-label">Estimated Order Value</span>
              <span className="order-summary-value">{formattedTotal}</span>
            </div>
            <div className="order-summary-row sub">
              <span className="order-summary-sublabel">Margin Required (1x)</span>
              <span className="order-summary-subval">{formattedTotal}</span>
            </div>
          </div>

          {/* Status Alert */}
          {statusMsg && (
            <div className={`order-status-alert ${statusType}`}>
              {statusMsg}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="order-ticket-footer">
          <button
            type="button"
            className="order-btn-cancel"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`order-btn-submit ${isBuy ? "btn-buy" : "btn-sell"}`}
            onClick={handleSubmitOrder}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing Order..." : `${mode} ${uid}`}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BuyActionWindow;
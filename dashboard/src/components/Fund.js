import React, { useState } from "react";

const Funds = () => {
  const [availableMargin, setAvailableMargin] = useState(4043.10);
  const [usedMargin] = useState(0.00);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const handleAddFunds = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;

    setAvailableMargin((prev) => prev + val);
    setActionSuccess(`Successfully added ₹${val.toFixed(2)} via UPI`);
    setAmount("");
    setShowAddModal(false);
    setTimeout(() => setActionSuccess(""), 4000);
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    if (val > availableMargin) {
      alert("Withdrawal amount cannot exceed available cash.");
      return;
    }

    setAvailableMargin((prev) => prev - val);
    setActionSuccess(`Withdrawal request of ₹${val.toFixed(2)} processed to primary bank account`);
    setAmount("");
    setShowWithdrawModal(false);
    setTimeout(() => setActionSuccess(""), 4000);
  };

  return (
    <>
      <div className="funds" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "10px" }}>
        <p style={{ margin: 0 }}>Instant, zero-cost fund transfers with UPI</p>
        <button
          className="btn btn-green"
          style={{ border: "none", cursor: "pointer", fontWeight: 500 }}
          onClick={() => {
            setShowAddModal(true);
            setShowWithdrawModal(false);
            setAmount("");
          }}
        >
          Add funds
        </button>
        <button
          className="btn btn-blue"
          style={{ border: "none", cursor: "pointer", fontWeight: 500 }}
          onClick={() => {
            setShowWithdrawModal(true);
            setShowAddModal(false);
            setAmount("");
          }}
        >
          Withdraw
        </button>
      </div>

      {actionSuccess && (
        <div
          style={{
            margin: "16px 0",
            padding: "10px 16px",
            background: "rgba(76, 175, 80, 0.15)",
            color: "#4caf50",
            borderRadius: "4px",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          ✓ {actionSuccess}
        </div>
      )}

      {/* Add Funds Modal */}
      {showAddModal && (
        <div
          style={{
            margin: "16px 0",
            padding: "20px",
            background: "var(--bg-card, #fff)",
            border: "1px solid var(--border-color, #ddd)",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h5 style={{ marginTop: 0 }}>Add Funds via UPI</h5>
          <form onSubmit={handleAddFunds} style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="number"
              placeholder="Enter amount (₹)"
              min="100"
              step="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "200px" }}
              required
              autoFocus
            />
            <button type="submit" className="btn btn-green" style={{ border: "none", cursor: "pointer" }}>
              Confirm Deposit
            </button>
            <button
              type="button"
              className="btn btn-grey"
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div
          style={{
            margin: "16px 0",
            padding: "20px",
            background: "var(--bg-card, #fff)",
            border: "1px solid var(--border-color, #ddd)",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h5 style={{ marginTop: 0 }}>Withdraw Funds to Primary Bank</h5>
          <form onSubmit={handleWithdraw} style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="number"
              placeholder="Enter amount (₹)"
              min="100"
              max={availableMargin}
              step="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "200px" }}
              required
              autoFocus
            />
            <button type="submit" className="btn btn-blue" style={{ border: "none", cursor: "pointer" }}>
              Confirm Payout
            </button>
            <button
              type="button"
              className="btn btn-grey"
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => setShowWithdrawModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">₹{availableMargin.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">₹{usedMargin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">₹{availableMargin.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>₹4,043.10</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>₹0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>₹0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <button
              className="btn btn-blue"
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => alert("Commodity segment activation request received.")}
            >
              Activate Commodity
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;

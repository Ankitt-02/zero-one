import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAuthHeaders, logout } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:3002/allPositions", {
        headers: getAuthHeaders(),
      })
      .then((res) => {
        setAllPositions(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Positions fetch error:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          logout();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalPositionsPnL = allPositions.reduce((acc, stock) => {
    const curValue = (Number(stock.price) || 0) * (Number(stock.qty) || 0);
    const costValue = (Number(stock.avg) || 0) * (Number(stock.qty) || 0);
    return acc + (curValue - costValue);
  }, 0);

  const isOverallProfit = totalPositionsPnL >= 0;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3 className="title" style={{ margin: 0 }}>
          Positions ({allPositions.length})
        </h3>
        <span style={{ fontSize: "0.9rem", color: isOverallProfit ? "#4caf50" : "#df4949", fontWeight: 600 }}>
          Total P&L: {isOverallProfit ? "+" : ""}₹{totalPositionsPnL.toFixed(2)}
        </span>
      </div>

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#888" }}>
          Loading positions...
        </div>
      ) : allPositions.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#888" }}>
          No open positions today.
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {allPositions.map((stock, index) => {
                const curValue = (Number(stock.price) || 0) * (Number(stock.qty) || 0);
                const cost = (Number(stock.avg) || 0) * (Number(stock.qty) || 0);
                const pnl = curValue - cost;
                const isProfit = pnl >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={stock._id || index}>
                    <td>
                      <p>{stock.product || "CNC"}</p>
                    </td>
                    <td>
                      <strong>{stock.name}</strong>
                    </td>
                    <td>{stock.qty}</td>
                    <td>₹{Number(stock.avg).toFixed(2)}</td>
                    <td>₹{Number(stock.price).toFixed(2)}</td>
                    <td className={profClass}>
                      {isProfit ? "+" : ""}
                      {pnl.toFixed(2)}
                    </td>
                    <td className={dayClass}>{stock.day || "0.00%"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Positions;

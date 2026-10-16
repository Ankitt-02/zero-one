import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { useAuth } from "../context/AuthContext";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAuthHeaders, logout } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:3002/allHoldings", {
        headers: getAuthHeaders(),
      })
      .then((res) => {
        setAllHoldings(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Holdings fetch error:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          logout();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + (Number(stock.avg) || 0) * (Number(stock.qty) || 0),
    0
  );

  const totalCurrentValue = allHoldings.reduce(
    (acc, stock) => acc + (Number(stock.price) || 0) * (Number(stock.qty) || 0),
    0
  );

  const totalPnL = totalCurrentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  const isOverallProfit = totalPnL >= 0;

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Current Value (₹)",
        data: allHoldings.map((stock) => (stock.price * stock.qty).toFixed(2)),
        backgroundColor: "rgba(65, 132, 243, 0.7)",
        borderColor: "rgba(65, 132, 243, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#888" }}>
          Loading your holdings from database...
        </div>
      ) : allHoldings.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#888" }}>
          No holdings found. Start trading from the Watchlist.
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                <th>P&L</th>
                <th>Net chg.</th>
                <th>Day chg.</th>
              </tr>
            </thead>
            <tbody>
              {allHoldings.map((stock, index) => {
                const curValue = (Number(stock.price) || 0) * (Number(stock.qty) || 0);
                const investValue = (Number(stock.avg) || 0) * (Number(stock.qty) || 0);
                const pnl = curValue - investValue;
                const isProfit = pnl >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={stock._id || index}>
                    <td>
                      <strong>{stock.name}</strong>
                    </td>
                    <td>{stock.qty}</td>
                    <td>₹{Number(stock.avg).toFixed(2)}</td>
                    <td>₹{Number(stock.price).toFixed(2)}</td>
                    <td>₹{curValue.toFixed(2)}</td>
                    <td className={profClass}>
                      {isProfit ? "+" : ""}
                      {pnl.toFixed(2)}
                    </td>
                    <td className={profClass}>{stock.net || `${((pnl / investValue) * 100).toFixed(2)}%`}</td>
                    <td className={dayClass}>{stock.day || "0.00%"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="row stats-row">
        <div className="col">
          <h5>
            ₹{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            ₹{totalCurrentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Current portfolio value</p>
        </div>
        <div className="col">
          <h5 style={{ color: isOverallProfit ? "#4caf50" : "#df4949" }}>
            {isOverallProfit ? "+" : ""}
            ₹{totalPnL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (
            {isOverallProfit ? "+" : ""}
            {pnlPercent.toFixed(2)}%)
          </h5>
          <p>Total P&L</p>
        </div>
      </div>

      {allHoldings.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <VerticalGraph data={data} />
        </div>
      )}
    </>
  );
};

export default Holdings;

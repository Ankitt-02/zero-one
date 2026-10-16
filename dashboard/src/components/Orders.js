import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAuthHeaders, logout } = useAuth();

  const fetchOrders = () => {
    axios
      .get("http://localhost:3002/allOrders", {
        headers: getAuthHeaders(),
      })
      .then((res) => {
        setAllOrders(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Orders fetch error:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          logout();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();

    const handleOrderPlaced = () => {
      fetchOrders();
    };

    window.addEventListener("orderPlaced", handleOrderPlaced);
    return () => {
      window.removeEventListener("orderPlaced", handleOrderPlaced);
    };
  }, []);

  return (
    <div className="orders-wrapper">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
        <h3 className="title" style={{ margin: 0 }}>
          Orders ({allOrders.length})
        </h3>
        <button
          onClick={fetchOrders}
          style={{
            background: "transparent",
            border: "1px solid var(--border-color, #ddd)",
            borderRadius: "4px",
            padding: "4px 12px",
            fontSize: "0.8rem",
            cursor: "pointer",
            color: "var(--text-secondary, #555)",
          }}
          title="Refresh orders list"
        >
          ↻ Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#888" }}>
          Loading your orders...
        </div>
      ) : allOrders.length === 0 ? (
        <div className="orders">
          <div className="no-orders">
            <p>You haven't placed any orders today</p>
            <Link to={"/"} className="btn btn-blue">
              Get started from Watchlist
            </Link>
          </div>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Total Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => {
                const isBuy = order.mode === "BUY";
                const total = (Number(order.qty) || 0) * (Number(order.price) || 0);
                const orderDate = order.createdAt
                  ? new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : "Just now";

                return (
                  <tr key={order._id || index}>
                    <td style={{ fontSize: "0.8rem", color: "#888" }}>{orderDate}</td>
                    <td>
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: "3px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          background: isBuy ? "rgba(65, 132, 243, 0.15)" : "rgba(255, 87, 34, 0.15)",
                          color: isBuy ? "#4184f3" : "#ff5722",
                        }}
                      >
                        {order.mode || "BUY"}
                      </span>
                    </td>
                    <td>
                      <strong>{order.name}</strong>
                    </td>
                    <td>{order.qty}</td>
                    <td>₹{Number(order.price).toFixed(2)}</td>
                    <td>₹{total.toFixed(2)}</td>
                    <td>
                      {(() => {
                        const status = order.status || "OPEN";
                        let badgeColor = "#ff9800";
                        let badgeBg = "rgba(255, 152, 0, 0.12)";
                        if (status === "COMPLETE" || status === "EXECUTED") {
                          badgeColor = "#4caf50";
                          badgeBg = "rgba(76, 175, 80, 0.1)";
                        } else if (status === "REJECTED" || status === "CANCELLED") {
                          badgeColor = "#f44336";
                          badgeBg = "rgba(244, 67, 54, 0.1)";
                        }
                        return (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              color: badgeColor,
                              fontWeight: 600,
                              background: badgeBg,
                              padding: "2px 8px",
                              borderRadius: "3px",
                            }}
                          >
                            {status}
                          </span>
                        );
                      })()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
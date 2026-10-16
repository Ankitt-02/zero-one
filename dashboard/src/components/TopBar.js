import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points" style={{ color: "#4caf50" }}>24,842.15</p>
          <p className="percent" style={{ color: "#4caf50" }}>+0.42%</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points" style={{ color: "#4caf50" }}>81,385.70</p>
          <p className="percent" style={{ color: "#4caf50" }}>+0.38%</p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;

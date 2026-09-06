import React, { useContext } from "react";
import { GeneralContext } from "./GeneralContext";

const BuyActionWindow = () => {
  const { isBuyWindowOpen, selectedStockUID, closeBuyWindow } = useContext(GeneralContext);

  if (!isBuyWindowOpen) return null;

  return (
    <div className="buy-action-window">
      <div className="window-header">
        <h3>Buy {selectedStockUID}</h3>
        <button onClick={closeBuyWindow}>X</button>
      </div>
      <div className="window-content">
        <p>Quantity: <input type="number" defaultValue="1" /></p>
        <p>Price: <input type="number" defaultValue="0" /></p>
        <button className="btn-buy">Buy</button>
        <button className="btn-cancel" onClick={closeBuyWindow}>Cancel</button>
      </div>
    </div>
  );
};

export default BuyActionWindow;
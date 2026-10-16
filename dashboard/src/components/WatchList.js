import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  Search,
  Clear,
  PieChartOutline,
} from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";
import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const chartPalette = [
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#f97316", // Orange
  "#6366f1", // Indigo
  "#14b8a6", // Teal
];

const WatchList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showChart, setShowChart] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const { isDark } = useTheme();

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const data = {
    labels: watchlist.map((stock) => stock.name),
    datasets: [
      {
        label: "Price (₹)",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: chartPalette,
        borderColor: isDark ? "#161b22" : "#ffffff",
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "68%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          borderRadius: 2,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 10,
          font: {
            size: 11,
            family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            weight: 500,
          },
          color: isDark ? "#8b949e" : "#555555",
        },
      },
      tooltip: {
        backgroundColor: isDark ? "#1c2128" : "#ffffff",
        titleColor: isDark ? "#f0f6fc" : "#111827",
        bodyColor: isDark ? "#c9d1d9" : "#374151",
        borderColor: isDark ? "#30363d" : "#e5e7eb",
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: (context) => ` ₹${Number(context.raw).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
        },
      },
    },
  };

  return (
    <div className="watchlist-container">
      {/* Search Bar Header */}
      <div className="watchlist-search-wrap">
        <div className="search-input-box">
          <Search className="search-icon" />
          <input
            type="text"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search eg: infy, bse, tcs, reliance"
            className="watchlist-search-input"
            autoComplete="off"
            aria-label="Search watchlist symbols"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <Clear fontSize="small" />
            </button>
          )}
        </div>
        <div className="watchlist-count-badge" title="Matching symbols / Total symbols">
          {filteredWatchlist.length} <span className="count-total">/ {watchlist.length}</span>
        </div>
      </div>

      {/* Watchlist Rows */}
      <ul className="watchlist-list">
        {filteredWatchlist.map((stock) => {
          return (
            <WatchListItem
              stock={stock}
              key={stock.name}
              isSelected={selectedSymbol === stock.name}
              onSelect={setSelectedSymbol}
            />
          );
        })}
        {filteredWatchlist.length === 0 && (
          <li className="watchlist-empty-state">
            <div className="empty-icon-wrap">
              <Search />
            </div>
            <p className="empty-title">No instruments found</p>
            <p className="empty-desc">No stocks match "{searchTerm}"</p>
            <button
              type="button"
              className="empty-clear-btn"
              onClick={() => setSearchTerm("")}
            >
              Clear search
            </button>
          </li>
        )}
      </ul>

      {/* Allocation Chart Section */}
      <div className="watchlist-chart-section">
        <div
          className="watchlist-chart-header"
          onClick={() => setShowChart(!showChart)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setShowChart(!showChart);
            }
          }}
          aria-expanded={showChart}
        >
          <div className="chart-header-title">
            <PieChartOutline className="chart-header-icon" />
            <span>Watchlist Allocation</span>
          </div>
          <span className="chart-toggle-hint">{showChart ? "Hide" : "Show"}</span>
        </div>
        {showChart && (
          <div className="watchlist-chart-body">
            <DoughnutChart data={data} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, isSelected, onSelect }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);
  const generalContext = useContext(GeneralContext);

  const handleMouseEnter = () => setShowWatchlistActions(true);
  const handleMouseLeave = () => setShowWatchlistActions(false);

  const formatPrice = (val) => {
    return Number(val).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <li
      className={`watchlist-item ${showWatchlistActions ? "is-hovered" : ""} ${isSelected ? "is-selected" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(stock.name)}
      tabIndex={0}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-label={`${stock.name} stock row`}
    >
      <div className="item-row">
        {/* Left Column: Symbol and Exchange Tag */}
        <div className="item-symbol-col">
          <span className="stock-symbol">{stock.name}</span>
          <span className="stock-exchange">NSE</span>
        </div>

        {/* Right Column: Price and Directional Indicator */}
        <div className="item-metrics-col">
          <span className="stock-price">₹{formatPrice(stock.price)}</span>
          <div className={`stock-delta ${stock.isDown ? "is-down" : "is-up"}`}>
            {stock.isDown ? (
              <KeyboardArrowDown className="delta-icon" />
            ) : (
              <KeyboardArrowUp className="delta-icon" />
            )}
            <span className="delta-percent">{stock.percent}</span>
          </div>
        </div>
      </div>

      {/* Floating Action Controls */}
      <div className={`watchlist-actions ${showWatchlistActions ? "visible" : ""}`}>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button
            type="button"
            className="action-btn action-buy"
            onClick={(e) => {
              e.stopPropagation();
              generalContext.openBuyWindow(stock.name, "BUY");
            }}
          >
            BUY
          </button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button
            type="button"
            className="action-btn action-sell"
            onClick={(e) => {
              e.stopPropagation();
              generalContext.openBuyWindow(stock.name, "SELL");
            }}
          >
            SELL
          </button>
        </Tooltip>
        <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
          <button
            type="button"
            className="action-btn action-icon"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View ${stock.name} analytics`}
          >
            <BarChartOutlined fontSize="small" />
          </button>
        </Tooltip>
        <Tooltip title="More options" placement="top" arrow TransitionComponent={Grow}>
          <button
            type="button"
            className="action-btn action-icon"
            onClick={(e) => e.stopPropagation()}
            aria-label={`More options for ${stock.name}`}
          >
            <MoreHoriz fontSize="small" />
          </button>
        </Tooltip>
      </div>
    </li>
  );
};

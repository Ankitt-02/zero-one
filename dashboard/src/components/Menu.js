import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Menu = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const currentUser = user || {
    name: "Trader",
    email: "",
  };

  const getInitials = (name) => {
    if (!name) return "ZU";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    logout();
  };

  const currentPath = location.pathname;

  return (
    <div className="menu-container">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="/logo.png"
          alt="Zero-One Logo"
          style={{ width: "36px", height: "auto" }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary, #333)", letterSpacing: "-0.5px" }}>
          ZERO<span style={{ color: "#4184f3" }}>•</span>ONE
        </span>
      </div>

      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/">
              <p className={currentPath === "/" ? "menu selected" : "menu"}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders">
              <p className={currentPath === "/orders" ? "menu selected" : "menu"}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings">
              <p className={currentPath === "/holdings" ? "menu selected" : "menu"}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions">
              <p className={currentPath === "/positions" ? "menu selected" : "menu"}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds">
              <p className={currentPath === "/funds" ? "menu selected" : "menu"}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps">
              <p className={currentPath === "/apps" ? "menu selected" : "menu"}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: "var(--bg-secondary, #f0f0f0)",
            border: "1px solid var(--border-color, #ddd)",
            borderRadius: "6px",
            width: "32px",
            height: "32px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            marginLeft: "10px",
            marginRight: "10px",
            color: isDark ? "#ffb74d" : "#555",
            fontSize: "14px",
          }}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle theme"
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        <hr />

        <div style={{ position: "relative" }}>
          <div
            className="profile"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            <div className="avatar">{getInitials(currentUser.name)}</div>
            <p className="username">{currentUser.name || "Account"}</p>
          </div>

          {/* Profile Dropdown */}
          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "44px",
                right: "0",
                width: "220px",
                background: "var(--bg-card, #fff)",
                border: "1px solid var(--border-color, #e0e0e0)",
                borderRadius: "8px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                zIndex: 1000,
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{ paddingBottom: "8px", borderBottom: "1px solid var(--border-color, #eee)" }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary, #333)" }}>
                  {currentUser.name}
                </p>
                {currentUser.email && (
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted, #888)" }}>
                    {currentUser.email}
                  </p>
                )}
              </div>

              <a
                href="http://localhost:3000"
                style={{
                  fontSize: "0.85rem",
                  color: "var(--primary-accent, #4184f3)",
                  textDecoration: "none",
                  padding: "6px 4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                ⌂ Back to Zero-One Home
              </a>

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  background: "rgba(223, 73, 73, 0.1)",
                  color: "#df4949",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 10px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  textAlign: "left",
                  marginTop: "4px",
                }}
              >
                ⎋ Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
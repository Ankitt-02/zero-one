import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav
      className={`navbar navbar-expand-lg border-bottom sticky-top py-2 app-navbar ${
        isDark ? "app-navbar-dark" : "app-navbar-light"
      }`}
    >
      <div className="container py-1">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="media/images/O-1Logo.png"
            style={{ width: "130px", height: "auto" }}
            alt="Zero One Logo"
          />
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support">
                Support
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <a
                    href="http://localhost:3001"
                    className="btn btn-sm btn-outline-primary px-3 py-1 fw-medium d-inline-flex align-items-center"
                    title="Open Trading Terminal"
                  >
                    <i className="fa fa-line-chart me-2"></i>
                    Trading Console
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link d-flex align-items-center text-secondary small fw-medium">
                    <span className="user-badge me-2">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                    {user?.name || "Account"}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-sm btn-outline-secondary px-2 py-1 text-muted"
                    title="Log out of session"
                  >
                    <i className="fa fa-sign-out"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-medium" to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-sm btn-primary px-3 py-1 fw-medium shadow-sm" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}

            {/* Dark / Light Mode Toggle */}
            <li className="nav-item ms-lg-2">
              <button
                onClick={toggleTheme}
                className="btn btn-sm theme-toggle-btn"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? (
                  <i className="fa fa-sun-o text-warning fs-6"></i>
                ) : (
                  <i className="fa fa-moon-o text-secondary fs-6"></i>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

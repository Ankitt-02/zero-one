import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect unauthenticated visitors to sign in
      window.location.href = "http://localhost:3000/signin";
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "var(--bg-primary, #fbfbfb)",
          color: "var(--text-primary, #333)",
          fontFamily: "inherit",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            border: "3px solid rgba(65, 132, 243, 0.2)",
            borderTop: "3px solid #4184f3",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            marginBottom: "16px",
          }}
        />
        <style>
          {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
        </style>
        <p style={{ fontSize: "0.95rem", fontWeight: 500, margin: 0, color: "var(--text-secondary, #666)" }}>
          Verifying Zero-One trading session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "20px",
          textAlign: "center",
          background: "var(--bg-primary, #fbfbfb)",
          color: "var(--text-primary, #333)",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>Authentication Required</h3>
        <p style={{ color: "var(--text-secondary, #666)", marginBottom: "20px" }}>
          You must be signed in to access the Zero-One Trading Console.
        </p>
        <a
          href="http://localhost:3000/signin"
          style={{
            padding: "8px 20px",
            backgroundColor: "#4184f3",
            color: "#fff",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Sign In Now
        </a>
      </div>
    );
  }

  return children;
};

export default AuthGuard;

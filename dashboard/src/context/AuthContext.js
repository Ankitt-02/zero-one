import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("zero_one_token") || getCookie("zero_one_token") || null
  );
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("zero_one_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("zero_one_token");
    localStorage.removeItem("zero_one_user");
    deleteCookie("zero_one_token");
    window.location.href = "http://localhost:3000/signin";
  };

  useEffect(() => {
    const verifySession = async () => {
      const activeToken = localStorage.getItem("zero_one_token") || getCookie("zero_one_token");

      if (!activeToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3002/auth/me", {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        });

        if (response.data && response.data.success && response.data.user) {
          setUser(response.data.user);
          setToken(activeToken);
          localStorage.setItem("zero_one_token", activeToken);
          localStorage.setItem("zero_one_user", JSON.stringify(response.data.user));
        } else {
          logout();
        }
      } catch (err) {
        // If unauthorized or token expired, trigger logout
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          logout();
        } else {
          console.warn("Session verification warning:", err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const getAuthHeaders = () => {
    const activeToken = token || localStorage.getItem("zero_one_token") || getCookie("zero_one_token");
    return activeToken ? { Authorization: `Bearer ${activeToken}` } : {};
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        logout,
        getAuthHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;

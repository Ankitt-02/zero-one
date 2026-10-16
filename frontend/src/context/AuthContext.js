import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax`;
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

  useEffect(() => {
    const verifySession = async () => {
      const activeToken = localStorage.getItem("zero_one_token") || getCookie("zero_one_token");
      if (!activeToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3002/auth/me", {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            setUser(data.user);
            setToken(activeToken);
            localStorage.setItem("zero_one_token", activeToken);
            localStorage.setItem("zero_one_user", JSON.stringify(data.user));
            setCookie("zero_one_token", activeToken, 7);
          } else {
            logout();
          }
        } else {
          // Token expired or invalid
          logout();
        }
      } catch (err) {
        console.warn("Could not verify session with backend:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("zero_one_token", newToken);
    localStorage.setItem("zero_one_user", JSON.stringify(newUser));
    setCookie("zero_one_token", newToken, 7);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("zero_one_token");
    localStorage.removeItem("zero_one_user");
    deleteCookie("zero_one_token");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;

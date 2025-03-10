import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    navigate("/login");
  };

  // Check for stored token on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("expiry");

    if (token && expiry && Date.now() < expiry) {
      setUser({ data: "User is logged in", token }); // Example user data
    } else {
      logout();
    }

    // Auto logout when token expires
    const interval = setInterval(() => {
      const expiry = localStorage.getItem("expiry");
      if (!expiry || Date.now() > expiry) {
        logout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

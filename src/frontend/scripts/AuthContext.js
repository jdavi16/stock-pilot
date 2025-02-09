import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

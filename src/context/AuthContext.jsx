import React, { createContext, useContext, useState, useEffect } from "react";

const ADMIN_USERNAME = "Admin1208";
const ADMIN_PASSWORD = "12081208qf";

const StoreAuthContext = createContext(null);

export function StoreAuthProvider({ children }) {
  const [storeUser, setStoreUser] = useState(() => {
    try {
      const stored = localStorage.getItem("storeUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const user = { role: "admin", username: "Admin1208", name: "Administrator" };
      setStoreUser(user);
      localStorage.setItem("storeUser", JSON.stringify(user));
      return { success: true, role: "admin" };
    }
    // Regular users can "sign in" with any non-admin credentials
    const user = { role: "user", username, name: username };
    setStoreUser(user);
    localStorage.setItem("storeUser", JSON.stringify(user));
    return { success: true, role: "user" };
  };

  const logout = () => {
    setStoreUser(null);
    localStorage.removeItem("storeUser");
  };

  const isAdmin = storeUser?.role === "admin";
  const isLoggedIn = !!storeUser;

  return (
    <StoreAuthContext.Provider value={{ storeUser, login, logout, isAdmin, isLoggedIn }}>
      {children}
    </StoreAuthContext.Provider>
  );
}

export function useStoreAuth() {
  return useContext(StoreAuthContext);
}
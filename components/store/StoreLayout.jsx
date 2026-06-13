import React from "react";
import { Outlet } from "react-router-dom";
import StoreNavbar from "./StoreNavbar";
import StoreFooter from "./StoreFooter";
import { StoreAuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export default function StoreLayout() {
  return (
    <StoreAuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
          <StoreNavbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <StoreFooter />
        </div>
      </CartProvider>
    </StoreAuthProvider>
  );
}
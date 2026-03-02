import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ Import Cart Provider
import { CartProvider } from "./context/CartContext";

// ✅ Create root
const root = ReactDOM.createRoot(document.getElementById("root"));

// ✅ Wrap App with CartProvider
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
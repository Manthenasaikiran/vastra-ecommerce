import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* Components */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCart from "./components/FloatingCart";

/* Pages */
import Login from "./pages/Login";
import OTP from "./pages/Otp";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import OrderSuccess from "./pages/OrderSuccess";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Admin from "./pages/Admin";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("vastraUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  return (

    <Router>

      {/* Navbar */}
      {user && <Navbar />}

      <Routes>

        {/* Login Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />

        {/* Home */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={user ? <Products /> : <Navigate to="/login" />}
        />
          

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={user ? <ProductDetails /> : <Navigate to="/login" />}
        />
       
        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={user ? <Wishlist /> : <Navigate to="/login" />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />
        {/* Admin Panel */}
        <Route
          path="/admin"
          element={user ? <Admin /> : <Navigate to="/login" />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={user ? <Checkout /> : <Navigate to="/login" />}
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={user ? <Orders /> : <Navigate to="/login" />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />

        {/* Order Success */}
        <Route
          path="/order-success"
          element={user ? <OrderSuccess /> : <Navigate to="/login" />}
        />

        {/* Policy Pages */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

      </Routes>
      {/* Floating Cart Button */}
      {user && <FloatingCart />}

      {/* Footer */}
      {user && <Footer />}

    </Router>

  );
}

export default App;
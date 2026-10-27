import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ListingsPage from "./pages/ListingsPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import BookingPage from "./pages/BookingPage";

// Helper component: scrolls viewport to top automatically upon route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return null;
}

export default function App() {
  // Global favorites dictionary: { [listingId]: true }
  const [favorites, setFavorites] = useState({});

  const handleToggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
  };

  return (
    <div className="app-root">
      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Primary Route Configuration */}
      <Routes>
        {/* 1. Main Listings / Browse Route */}
        <Route
          path="/"
          element={
            <ListingsPage
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />

        {/* 2. Property Details Route */}
        <Route
          path="/listing/:id"
          element={
            <PropertyDetailsPage
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />

        {/* 3. Booking / Checkout Route */}
        <Route
          path="/booking/:id"
          element={<BookingPage />}
        />

        {/* 4. Catch-all fallback: redirect unknown paths back to homepage */}
        <Route
          path="*"
          element={
            <ListingsPage
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}
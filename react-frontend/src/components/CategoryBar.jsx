import React, { useRef } from "react";
import { CATEGORIES } from "../data/listings";
import "../styles/ListingsPage.css";

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="category-bar-wrapper">
      <div className="container category-container">
        {/* Left Scroll Button */}
        <button
          type="button"
          className="category-scroll-btn scroll-left"
          onClick={() => handleScroll("left")}
          aria-label="Scroll categories left"
        >
          <svg viewBox="0 0 32 32" width="12" height="12" fill="currentColor">
            <path d="M20 28 8 16 20 4l2.1 2.1L12.2 16l9.9 9.9z" />
          </svg>
        </button>

        {/* Scrollable Categories List */}
        <div className="category-scroll-track" ref={scrollContainerRef} role="tablist">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`category-item-btn ${isSelected ? "active" : ""}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span className="category-icon" aria-hidden="true">
                  {cat.icon}
                </span>
                <span className="category-label">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        <button
          type="button"
          className="category-scroll-btn scroll-right"
          onClick={() => handleScroll("right")}
          aria-label="Scroll categories right"
        >
          <svg viewBox="0 0 32 32" width="12" height="12" fill="currentColor">
            <path d="M12 4l12 12-12 12-2.1-2.1 9.9-9.9-9.9-9.9z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
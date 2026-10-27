import React, { useState } from "react";
import "../styles/SearchBar.css";

export default function SearchBar({
  filters,
  onFilterChange,
  onSearchSubmit,
  onResetFilters,
  activeTab = "homes",
  isCompact = false,
  onExpand
}) {
  const [activeSegment, setActiveSegment] = useState(null);

  // Dynamic placeholders and labels based on the active tab from the video reference
  const getFieldLabels = () => {
    switch (activeTab) {
      case "experiences":
        return {
          whereLabel: "Where",
          wherePlaceholder: "Search city or landmark",
          whenLabel: "When",
          whenPlaceholder: "Add dates",
          whoLabel: "Who",
          whoPlaceholder: "Add guests"
        };
      case "services":
        return {
          whereLabel: "Where",
          wherePlaceholder: "Search destinations",
          whenLabel: "When",
          whenPlaceholder: "Add dates",
          whoLabel: "Type of service",
          whoPlaceholder: "Add service"
        };
      case "all":
      case "homes":
      default:
        return {
          whereLabel: "Where",
          wherePlaceholder: "Search destinations",
          whenLabel: "When",
          whenPlaceholder: "Add dates",
          whoLabel: "Who",
          whoPlaceholder: "Add guests"
        };
    }
  };

  const labels = getFieldLabels();

  // Handle Compact Pill View (Rendered when scrolled or explicitly compressed)
  if (isCompact) {
    const destinationText = filters.location || "Anywhere";
    const dateText = filters.checkIn && filters.checkOut
      ? `${filters.checkIn.slice(5)} - ${filters.checkOut.slice(5)}`
      : "Any week";
    const guestsText = filters.guests && parseInt(filters.guests, 10) > 1
      ? `${filters.guests} guests`
      : "Add guests";

    return (
      <div
        className="search-pill-compact"
        onClick={onExpand}
        role="button"
        tabIndex={0}
        aria-label="Expand search options"
        onKeyDown={(e) => e.key === "Enter" && onExpand && onExpand()}
      >
        <button type="button" className="pill-segment-btn font-weight-bold">
          {destinationText}
        </button>
        <span className="pill-divider" aria-hidden="true" />
        <button type="button" className="pill-segment-btn">
          {dateText}
        </button>
        <span className="pill-divider" aria-hidden="true" />
        <button type="button" className="pill-segment-btn text-muted">
          {guestsText}
        </button>
        <div className="pill-search-icon-circle" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="12" height="12" fill="#FFFFFF">
            <path d="M13 2a11 11 0 0 1 8.6 17.9l8.2 8.2-1.4 1.4-8.2-8.2A11 11 0 1 1 13 2zm0 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
          </svg>
        </div>
      </div>
    );
  }

  // Handle Full Expanded Multi-Segment Search Bar (Hero mode at page top)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <form
      className={`search-bar-expanded ${activeSegment ? "has-active-segment" : ""}`}
      onSubmit={handleSubmit}
      role="search"
    >
      {/* Segment 1: Where */}
      <div
        className={`search-segment ${activeSegment === "where" ? "segment-active" : ""}`}
        onClick={() => setActiveSegment("where")}
      >
        <label htmlFor="search-where-input" className="segment-label">
          {labels.whereLabel}
        </label>
        <input
          id="search-where-input"
          type="text"
          className="segment-input"
          placeholder={labels.wherePlaceholder}
          value={filters.location}
          onChange={(e) => onFilterChange("location", e.target.value)}
          onFocus={() => setActiveSegment("where")}
          autoComplete="off"
        />
        {filters.location && (
          <button
            type="button"
            className="clear-segment-btn"
            onClick={(e) => {
              e.stopPropagation();
              onFilterChange("location", "");
            }}
            aria-label="Clear location"
          >
            ✕
          </button>
        )}
      </div>

      <div className="search-segment-divider" aria-hidden="true" />

      {/* Segment 2: When (Dates) */}
      <div
        className={`search-segment segment-dates ${activeSegment === "when" ? "segment-active" : ""}`}
        onClick={() => setActiveSegment("when")}
      >
        <label htmlFor="search-checkin-input" className="segment-label">
          {labels.whenLabel}
        </label>
        <div className="dates-input-row">
          <input
            id="search-checkin-input"
            type="date"
            className="segment-date-input"
            value={filters.checkIn}
            onChange={(e) => onFilterChange("checkIn", e.target.value)}
            onFocus={() => setActiveSegment("when")}
          />
          <span className="date-arrow" aria-hidden="true">→</span>
          <input
            id="search-checkout-input"
            type="date"
            className="segment-date-input"
            value={filters.checkOut}
            min={filters.checkIn || undefined}
            onChange={(e) => onFilterChange("checkOut", e.target.value)}
            onFocus={() => setActiveSegment("when")}
          />
        </div>
      </div>

      <div className="search-segment-divider" aria-hidden="true" />

      {/* Segment 3: Who / Type of service */}
      <div
        className={`search-segment ${activeSegment === "who" ? "segment-active" : ""}`}
        onClick={() => setActiveSegment("who")}
      >
        <label htmlFor="search-guests-select" className="segment-label">
          {labels.whoLabel}
        </label>
        {activeTab === "services" ? (
          <input
            id="search-guests-select"
            type="text"
            className="segment-input"
            placeholder={labels.whoPlaceholder}
            value={filters.serviceType || ""}
            onChange={(e) => onFilterChange("serviceType", e.target.value)}
            onFocus={() => setActiveSegment("who")}
          />
        ) : (
          <select
            id="search-guests-select"
            className="segment-select"
            value={filters.guests}
            onChange={(e) => onFilterChange("guests", e.target.value)}
            onFocus={() => setActiveSegment("who")}
          >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
            <option value="5">5+ guests</option>
          </select>
        )}
      </div>

      {/* Submit Button with Gradient & Search Icon */}
      <div className="search-submit-slot">
        <button
          type="submit"
          className="search-submit-btn"
          aria-label="Search listings"
        >
          <svg
            viewBox="0 0 32 32"
            width="16"
            height="16"
            fill="#FFFFFF"
            className="search-svg"
            aria-hidden="true"
          >
            <path d="M13 2a11 11 0 0 1 8.6 17.9l8.2 8.2-1.4 1.4-8.2-8.2A11 11 0 1 1 13 2zm0 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
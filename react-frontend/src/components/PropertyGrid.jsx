import React from "react";
import PropertyCard from "./PropertyCard";
import "../styles/ListingsPage.css";

export default function PropertyGrid({
  listings,
  favorites,
  onToggleFavorite,
  onResetFilters
}) {
  if (!listings || listings.length === 0) {
    return (
      <div className="empty-results-wrapper">
        <div className="empty-results-icon" aria-hidden="true">
          🔎
        </div>
        <h2 className="empty-results-title">No exact matches found</h2>
        <p className="empty-results-subtitle">
          Try changing or clearing some of your search filters to find available vacation stays.
        </p>
        {onResetFilters && (
          <button
            type="button"
            className="empty-results-reset-btn"
            onClick={onResetFilters}
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="property-grid-section" aria-label="Vacation rentals">
      <div className="property-grid">
        {listings.map((listing) => (
          <PropertyCard
            key={listing.id}
            listing={listing}
            isFavorite={Boolean(favorites[listing.id])}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
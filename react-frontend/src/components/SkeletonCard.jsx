import React from "react";
import "../styles/SkeletonCard.css";

export default function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      {/* Photo frame shimmer */}
      <div className="skeleton-img-box shimmer" />

      {/* Text lines shimmer */}
      <div className="skeleton-content">
        <div className="skeleton-line-row">
          <div className="skeleton-bar bar-title shimmer" />
          <div className="skeleton-bar bar-rating shimmer" />
        </div>
        <div className="skeleton-bar bar-subtitle shimmer" />
        <div className="skeleton-bar bar-specs shimmer" />
        <div className="skeleton-bar bar-price shimmer" />
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PropertyCard.css";

export default function PropertyCard({ listing, isFavorite, onToggleFavorite }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prevIndex) =>
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(listing.id);
    }
  };

  return (
    <article className="property-card" aria-label={listing.title}>
      <Link to={`/listing/${listing.id}`} className="property-card-link">
        {/* Media Container with Thumbnail Carousel */}
        <div className="property-media-wrapper">
          <img
            src={listing.images[activeImageIndex]}
            alt={`${listing.title} view ${activeImageIndex + 1}`}
            className="property-image"
            loading="lazy"
          />

          {/* Guest Favorite Badge */}
          {listing.guestFavorite && (
            <span className="guest-favorite-badge">Guest favorite</span>
          )}

          {/* Favorite Heart Button */}
          <button
            type="button"
            className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
            onClick={handleHeartClick}
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              viewBox="0 0 32 32"
              width="20"
              height="20"
              className="favorite-heart-icon"
              aria-hidden="true"
            >
              <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-4.58.31-7 4.02C13.58 4.31 10.8 4 9 4a6.98 6.98 0 0 0-7 7c0 7 7 12.27 14 17z" />
            </svg>
          </button>

          {/* Mini carousel navigation arrows (visible on card hover) */}
          {listing.images.length > 1 && (
            <>
              <button
                type="button"
                className="card-carousel-arrow arrow-prev"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 32 32" width="10" height="10" fill="currentColor">
                  <path d="M20 28 8 16 20 4l2.1 2.1L12.2 16l9.9 9.9z" />
                </svg>
              </button>
              <button
                type="button"
                className="card-carousel-arrow arrow-next"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <svg viewBox="0 0 32 32" width="10" height="10" fill="currentColor">
                  <path d="M12 4l12 12-12 12-2.1-2.1 9.9-9.9-9.9-9.9z" />
                </svg>
              </button>

              {/* Carousel Dot Indicators */}
              <div className="card-dots" aria-hidden="true">
                {listing.images.map((_, index) => (
                  <span
                    key={index}
                    className={`card-dot ${index === activeImageIndex ? "active" : ""}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content Info */}
        <div className="property-info">
          <div className="property-header-row">
            <h3 className="property-location">{listing.location}</h3>
            <div className="property-rating" aria-label={`Rated ${listing.rating} out of 5 stars`}>
              <span className="star-icon" aria-hidden="true">★</span>
              <span className="rating-value">{listing.rating.toFixed(2)}</span>
            </div>
          </div>

          <p className="property-title-sub">{listing.title}</p>
          <p className="property-specs">
            {listing.bedrooms} {listing.bedrooms === 1 ? "bed" : "beds"} · {listing.baths} {listing.baths === 1 ? "bath" : "baths"}
          </p>

          <div className="property-price-row">
            <span className="price-amount">${listing.pricePerNight}</span>
            <span className="price-unit"> night</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
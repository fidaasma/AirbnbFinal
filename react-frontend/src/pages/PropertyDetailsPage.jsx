import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MapMock from "../components/MapMock";
import Footer from "../components/Footer";
import { getListingById, LISTINGS } from "../data/listings";
import "../styles/PropertyDetailsPage.css";

export default function PropertyDetailsPage({ favorites = {}, onToggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = getListingById(id) || LISTINGS[0];

  const [checkIn, setCheckIn] = useState("2026-10-28");
  const [checkOut, setCheckOut] = useState("2026-10-29");
  const [guests, setGuests] = useState("1");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0);

  if (!listing) {
    return (
      <div className="not-found-container">
        <h2>Property not found</h2>
        <Link to="/" className="back-home-btn">Return to home</Link>
      </div>
    );
  }

  const isFav = Boolean(favorites[listing.id]);

  // Price calculations
  const price = listing.pricePerNight;
  const taxes = listing.taxes || 176;
  const total = price + taxes;

  const handleReserveClick = () => {
    navigate(`/booking/${listing.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <div className="property-details-layout">
      {/* Header in minimal sticky mode with compact search pill */}
      <Header showSearch={true} />

      <main className="container property-details-main">
        {/* Title & Top Action Bar */}
        <div className="details-header-section">
          <h1 className="details-property-title">{listing.title}</h1>
          <div className="details-top-actions">
            <button type="button" className="action-pill-btn">
              <svg viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v18M8 11l8-8 8 8" />
              </svg>
              <span>Share</span>
            </button>
            <button
              type="button"
              className={`action-pill-btn ${isFav ? "active-favorite" : ""}`}
              onClick={() => onToggleFavorite && onToggleFavorite(listing.id)}
            >
              <svg viewBox="0 0 32 32" width="16" height="16" className="action-heart-icon">
                <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05C12.58 4.68 10.8 4 9 4a6.98 6.98 0 0 0-7 7c0 7 7 12.27 14 17z" />
              </svg>
              <span>{isFav ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        {/* 5-Photo Mosaic Grid */}
        <section className="property-gallery-section" aria-label="Photo gallery">
          <div className="gallery-mosaic-grid">
            <div
              className="gallery-primary-slot"
              onClick={() => { setModalPhotoIndex(0); setShowAllPhotos(true); }}
            >
              <img src={listing.images[0]} alt={`${listing.title} 1`} className="gallery-img" />
            </div>
            <div className="gallery-side-grid">
              {listing.images.slice(1, 5).map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="gallery-side-slot"
                  onClick={() => { setModalPhotoIndex(idx + 1); setShowAllPhotos(true); }}
                >
                  <img src={imgUrl} alt={`${listing.title} ${idx + 2}`} className="gallery-img" />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="gallery-show-all-btn"
              onClick={() => { setModalPhotoIndex(0); setShowAllPhotos(true); }}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                <path d="M1 1h4v4H1zm6 0h4v4H7zm6 0h4v4h-4zM1 7h4v4H1zm6 0h4v4H7zm6 0h4v4h-4zM1 13h4v4H1zm6 0h4v4H7zm6 0h4v4h-4z" />
              </svg>
              <span>Show all photos</span>
            </button>
          </div>
        </section>

        {/* Two-Column Layout */}
        <div className="details-content-grid">
          {/* Left Column: Info & Map */}
          <div className="details-left-column">
            <div className="property-specs-block">
              <h2 className="property-type-heading">{listing.propertyType}, {listing.country}</h2>
              <p className="property-capacity-specs">
                {listing.maxGuests} guests · {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.baths} bathrooms
              </p>
            </div>

            {listing.guestFavorite && (
              <div className="guest-favourite-trophy-card">
                <div className="trophy-laurel-icon">🏆</div>
                <div className="trophy-meta-text">
                  <h3 className="trophy-title">Guest favourite</h3>
                  <p className="trophy-desc">One of the most loved homes on Airbnb, according to guests</p>
                </div>
                <div className="trophy-rating-box">
                  <span className="trophy-score">{listing.rating}</span>
                  <div className="trophy-stars">★★★★★</div>
                  <span className="trophy-reviews-count">{listing.reviewsCount} Reviews</span>
                </div>
              </div>
            )}

            <div className="details-divider" />

            {/* Host Section */}
            <div className="host-profile-banner">
              <img
                src={listing.host?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt={listing.host?.name || "Host"}
                className="host-avatar-img"
              />
              <div className="host-meta-details">
                <h3 className="host-heading">Hosted by {listing.host?.name || "Host"}</h3>
                <p className="host-subtitle">{listing.host?.badgeText || "Superhost"}</p>
              </div>
            </div>

            <div className="details-divider" />

            {/* Description */}
            <div className="description-section">
              <h3 className="section-subheading">About this space</h3>
              <p className="description-paragraph">{listing.description}</p>
            </div>

            <div className="details-divider" />

            {/* Amenities */}
            <div className="amenities-section">
              <h3 className="section-subheading">What this place offers</h3>
              <div className="amenities-grid">
                {listing.amenities?.map((amenity, i) => (
                  <div key={i} className="amenity-item">
                    <span className="amenity-icon">{amenity.icon}</span>
                    <span className="amenity-name">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="details-divider" />

            {/* Location Map */}
            <section className="property-map-section" aria-label="Location map">
              <h3 className="section-subheading">Where you'll be</h3>
              <p className="map-location-subheading">{listing.location}</p>
              <div className="details-map-frame">
                <MapMock
                  listings={[listing]}
                  hoveredListingId={listing.id}
                  onSelectListing={() => {}}
                />
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Reservation Widget */}
          <aside className="details-right-column">
            <div className="booking-card-widget">
              <div className="booking-card-header">
                <div className="booking-card-pricing-row">
                  {listing.originalPrice && (
                    <span className="card-original-strike">
                      ₹{listing.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="price-amount-large">
                    ₹{price.toLocaleString()}
                  </span>
                  <span className="price-unit-text">for 1 night</span>
                </div>
                <div className="booking-card-rating">
                  <span>★ {listing.rating}</span>
                  <span className="reviews-dot">·</span>
                  <span className="reviews-count-text">{listing.reviewsCount} reviews</span>
                </div>
              </div>

              {/* Date & Guest Input Box */}
              <div className="booking-inputs-box">
                <div className="booking-dates-row">
                  <div className="booking-date-field border-right">
                    <span className="booking-input-label">CHECK-IN</span>
                    <input
                      type="date"
                      className="booking-date-picker"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div className="booking-date-field">
                    <span className="booking-input-label">CHECKOUT</span>
                    <input
                      type="date"
                      className="booking-date-picker"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>

                <div className="booking-guests-field">
                  <span className="booking-input-label">GUESTS</span>
                  <select
                    className="booking-guest-select"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                  </select>
                </div>
              </div>

              {/* Reserve Button */}
              <button
                type="button"
                className="booking-reserve-submit-btn"
                onClick={handleReserveClick}
              >
                Reserve
              </button>

              <p className="booking-disclaimer">You won't be charged yet</p>

              {/* Breakdown */}
              <div className="booking-cost-breakdown">
                <div className="cost-breakdown-row">
                  <span className="breakdown-label">₹{price.toLocaleString()} x 1 night</span>
                  <span>₹{price.toLocaleString()}</span>
                </div>
                <div className="cost-breakdown-row">
                  <span className="breakdown-label">Taxes & fees</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>
                <div className="cost-breakdown-divider" />
                <div className="cost-breakdown-row total-row">
                  <span>Total (incl. all taxes & fees)</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Lightbox Modal */}
      {showAllPhotos && (
        <div className="gallery-modal-overlay" role="dialog" aria-modal="true">
          <div className="gallery-modal-content">
            <div className="gallery-modal-header">
              <span>{modalPhotoIndex + 1} / {listing.images.length}</span>
              <button
                type="button"
                className="gallery-modal-close-btn"
                onClick={() => setShowAllPhotos(false)}
              >
                ✕ Close
              </button>
            </div>
            <div className="gallery-modal-body">
              <button
                type="button"
                className="modal-nav-arrow arrow-left"
                onClick={() => setModalPhotoIndex((prev) => (prev > 0 ? prev - 1 : listing.images.length - 1))}
              >
                ‹
              </button>
              <img
                src={listing.images[modalPhotoIndex]}
                alt={`Photo ${modalPhotoIndex + 1}`}
                className="gallery-modal-photo"
              />
              <button
                type="button"
                className="modal-nav-arrow arrow-right"
                onClick={() => setModalPhotoIndex((prev) => (prev < listing.images.length - 1 ? prev + 1 : 0))}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
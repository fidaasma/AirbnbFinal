import React, { useState } from "react";
import "../styles/PropertyDetailsPage.css";

export default function ImageGallery({ images, title }) {
  const [modalIndex, setModalIndex] = useState(null);

  // If no images provided, fall back gracefully
  if (!images || images.length === 0) {
    return <div className="gallery-empty">No photos available</div>;
  }

  // Ensure up to 5 images for the standard Airbnb 5-image mosaic layout
  const primaryImage = images[0];
  const sideImages = images.slice(1, 5);

  const openModal = (index) => {
    setModalIndex(index);
  };

  const closeModal = () => {
    setModalIndex(null);
  };

  const showNextPhoto = (e) => {
    e.stopPropagation();
    setModalIndex((prev) => (prev + 1) % images.length);
  };

  const showPrevPhoto = (e) => {
    e.stopPropagation();
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="property-gallery-section" aria-label="Photo gallery">
      {/* 5-Photo Airbnb-Style Mosaic Grid */}
      <div className="gallery-mosaic-grid">
        <div
          className="gallery-primary-slot"
          onClick={() => openModal(0)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && openModal(0)}
          aria-label={`View photo 1 of ${title}`}
        >
          <img
            src={primaryImage}
            alt={`${title} - Main photo`}
            className="gallery-img gallery-main-img"
          />
        </div>

        <div className="gallery-side-grid">
          {sideImages.map((imgSrc, idx) => {
            const actualIndex = idx + 1;
            return (
              <div
                key={actualIndex}
                className={`gallery-side-slot slot-${actualIndex}`}
                onClick={() => openModal(actualIndex)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openModal(actualIndex)}
                aria-label={`View photo ${actualIndex + 1} of ${title}`}
              >
                <img
                  src={imgSrc}
                  alt={`${title} - Photo ${actualIndex + 1}`}
                  className="gallery-img"
                />
              </div>
            );
          })}
        </div>

        {/* View all photos floating button */}
        <button
          type="button"
          className="gallery-show-all-btn"
          onClick={() => openModal(0)}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
          </svg>
          <span>Show all {images.length} photos</span>
        </button>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {modalIndex !== null && (
        <div
          className="gallery-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Full size photo viewer"
        >
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-modal-header">
              <span className="gallery-modal-counter">
                {modalIndex + 1} / {images.length}
              </span>
              <button
                type="button"
                className="gallery-modal-close-btn"
                onClick={closeModal}
                aria-label="Close photo viewer"
              >
                ✕ Close
              </button>
            </div>

            <div className="gallery-modal-body">
              <button
                type="button"
                className="modal-nav-arrow arrow-left"
                onClick={showPrevPhoto}
                aria-label="Previous photo"
              >
                ‹
              </button>

              <img
                src={images[modalIndex]}
                alt={`${title} - Enlarged photo ${modalIndex + 1}`}
                className="gallery-modal-photo"
              />

              <button
                type="button"
                className="modal-nav-arrow arrow-right"
                onClick={showNextPhoto}
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
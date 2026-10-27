import React, { useRef } from "react";
import { DESTINATIONS } from "../data/listings";
import "../styles/DestinationsCarousel.css";

export default function DestinationsCarousel({ onSelectCity }) {
  const trackRef = useRef(null);

  const handleScroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="destinations-carousel-section" aria-label="Destinations for you">
      <div className="destinations-header-row">
        <h2 className="destinations-title">Destinations for you</h2>
        <div className="carousel-nav-arrows">
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={() => handleScroll("left")}
            aria-label="Scroll destinations left"
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={() => handleScroll("right")}
            aria-label="Scroll destinations right"
          >
            ›
          </button>
        </div>
      </div>

      <div className="destinations-track" ref={trackRef}>
        {DESTINATIONS.map((item) => (
          <div
            key={item.id}
            className="destination-card"
            onClick={() => onSelectCity && onSelectCity(item.city)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelectCity && onSelectCity(item.city)}
          >
            <div className="destination-img-frame">
              <img
                src={item.image}
                alt={item.city}
                className="destination-img"
                loading="lazy"
              />
            </div>
            <div className="destination-meta">
              <h3 className="destination-city-name">{item.city}</h3>
              <p className="destination-subtitle">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
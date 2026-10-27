import React from "react";
import "../styles/MapMock.css";

export default function MapMock({
  listings = [],
  hoveredListingId = null,
  onSelectListing
}) {
  return (
    <div className="map-mock-container" aria-label="Interactive map area">
      {/* Visual Map Canvas Background simulating Google Maps / Mapbox in Kochi / Ernakulam */}
      <div className="map-canvas-background">
        <svg className="map-roads-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {/* Waterway / Coastal coastline simulation */}
          <path
            d="M 0,0 L 220,0 Q 250,220 180,450 T 260,780 L 290,1000 L 0,1000 Z"
            fill="#C5E8F8"
          />
          <path
            d="M 180,320 Q 280,300 420,380 T 700,340 T 950,420"
            fill="none"
            stroke="#C5E8F8"
            strokeWidth="24"
          />
          {/* Highway network routes */}
          <path d="M 220,0 L 380,500 L 410,1000" fill="none" stroke="#FCE8B2" strokeWidth="8" />
          <path d="M 0,420 L 1000,410" fill="none" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M 380,500 L 900,680" fill="none" stroke="#FCE8B2" strokeWidth="6" />
          <path d="M 120,650 L 800,200" fill="none" stroke="#FFFFFF" strokeWidth="5" />
          <path d="M 300,250 L 750,750" fill="none" stroke="#FFFFFF" strokeWidth="4" />
        </svg>

        {/* Geographic location labels */}
        <span className="map-label-city map-label-kochi">Kochi</span>
        <span className="map-label-suburb map-label-ernakulam">Ernakulam</span>
        <span className="map-label-suburb map-label-edappally">Edappally</span>
        <span className="map-label-suburb map-label-kakkanad">Kakkanad</span>
      </div>

      {/* Floating Map Zoom / Center Controls */}
      <div className="map-floating-controls">
        <button type="button" className="map-control-btn" aria-label="Zoom in">+</button>
        <button type="button" className="map-control-btn" aria-label="Zoom out">−</button>
      </div>

      {/* Interactive Price Bubble Pins */}
      {listings.map((item) => {
        const isHovered = hoveredListingId === item.id;
        const coords = item.mapCoords || { top: "50%", left: "50%" };

        return (
          <button
            key={item.id}
            type="button"
            className={`map-price-bubble ${isHovered ? "bubble-active" : ""}`}
            style={{ top: coords.top, left: coords.left }}
            onClick={() => onSelectListing && onSelectListing(item.id)}
            aria-label={`${item.title} - ₹${item.pricePerNight.toLocaleString()} per night`}
          >
            ₹{item.pricePerNight.toLocaleString()}
          </button>
        );
      })}
    </div>
  );
}
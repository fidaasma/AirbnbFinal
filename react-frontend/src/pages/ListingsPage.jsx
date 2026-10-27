import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import DestinationsCarousel from "../components/DestinationsCarousel";
import SkeletonCard from "../components/SkeletonCard";
import Footer from "../components/Footer";
import { LISTINGS } from "../data/listings";
import "../styles/ListingsPage.css";

// Horizontal Carousel Component for Home Feed sections
function ListingsCarouselSection({ title, subtitle, listings, onListingClick, favorites, onToggleFavorite }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -460 : 460;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="feed-carousel-section">
      <div className="feed-carousel-header">
        <div>
          <h2 className="feed-section-title">{title}</h2>
          {subtitle && <p className="feed-section-subtitle">{subtitle}</p>}
        </div>
        <div className="feed-carousel-arrows">
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={() => scroll("left")}
            aria-label={`Scroll ${title} left`}
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={() => scroll("right")}
            aria-label={`Scroll ${title} right`}
          >
            ›
          </button>
        </div>
      </div>

      <div className="feed-carousel-track" ref={scrollRef}>
        {listings.map((item) => {
          const isFav = Boolean(favorites[item.id]);
          return (
            <div
              key={item.id}
              className="feed-listing-card"
              onClick={() => onListingClick(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onListingClick(item.id)}
            >
              <div className="feed-card-media">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="feed-card-img"
                  loading="lazy"
                />
                {item.guestFavorite && (
                  <span className="guest-favorite-badge">Guest favourite</span>
                )}
                <button
                  type="button"
                  className={`heart-action-btn ${isFav ? "is-favorite" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item.id);
                  }}
                  aria-label="Add to wishlist"
                >
                  <svg viewBox="0 0 32 32" className="heart-svg">
                    <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05C12.58 4.68 10.8 4 9 4a6.98 6.98 0 0 0-7 7c0 7 7 12.27 14 17z" />
                  </svg>
                </button>
              </div>

              <div className="feed-card-info">
                <div className="feed-card-row">
                  <h3 className="feed-card-title">{item.propertyType || item.title}</h3>
                  <div className="feed-card-rating">
                    <span>★</span>
                    <span>{item.rating}</span>
                  </div>
                </div>
                <p className="feed-card-location">{item.location}</p>
                <div className="feed-card-pricing">
                  {item.originalPrice && (
                    <span className="feed-original-price">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="feed-active-price">
                    ₹{item.pricePerNight.toLocaleString()}
                  </span>
                  <span className="feed-price-unit">for 1 night</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function ListingsPage({ favorites = {}, onToggleFavorite }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Active Search state
  const [filters, setFilters] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    serviceType: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsSearchExpanded(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Group listings into carousel categories matching the official recording
  const ernakulamListings = LISTINGS.filter((i) => i.category === "ernakulam" || i.category === "kochi");
  const trendingListings = [...LISTINGS].reverse();
  const popularListings = LISTINGS.slice(0, 5);

  const handleListingClick = (id) => {
    // Navigate straight to the Property Details Page where the interactive map is located
    navigate(`/listing/${id}`);
  };

  return (
    <div className="listings-home-layout">
      {/* Top Header with 3D Wiggle Tabs & Scroll-Reactive Search Pill */}
      <Header
        showSearch={true}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isSearchExpanded={isSearchExpanded}
        onOpenSearch={() => setIsSearchExpanded(true)}
      >
        <SearchBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchSubmit={() => {}}
          onResetFilters={() => setFilters({ location: "", checkIn: "", checkOut: "", guests: "1", serviceType: "" })}
          activeTab={activeTab}
          isCompact={isScrolled && !isSearchExpanded}
          onExpand={() => setIsSearchExpanded(true)}
        />
      </Header>

      <main className="container home-feed-main">
        {/* Banner: "Destinations for you" or Active Category Highlights */}
        <DestinationsCarousel
          onSelectCity={(city) => {
            setFilters((prev) => ({ ...prev, location: city }));
          }}
        />

        {/* Shimmer skeleton state during tab switches */}
        {isLoading ? (
          <div className="feed-skeleton-grid">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : (
          <>
            {/* Feed Section 1: Places to stay in Ernakulam */}
            <ListingsCarouselSection
              title="Places to stay in Ernakulam"
              listings={ernakulamListings}
              onListingClick={handleListingClick}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />

            {/* Feed Section 2: Popular homes in Bengaluru / Trending */}
            <ListingsCarouselSection
              title="Popular homes in Bengaluru & Kochi"
              listings={popularListings}
              onListingClick={handleListingClick}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />

            {/* Feed Section 3: Stay in Kazhakootam & Kerala coast */}
            <ListingsCarouselSection
              title="Stay in Kazhakootam & coastal stays"
              listings={trendingListings}
              onListingClick={handleListingClick}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
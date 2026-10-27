import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_TABS } from "../data/listings";
import "../styles/Header.css";

export default function Header({
  children,
  showSearch = true,
  activeTab = "all",
  onTabChange,
  isSearchExpanded = false,
  onOpenSearch
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [animatedTab, setAnimatedTab] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const showCompactHeader = isScrolled || !isHome;

  const handleTabClick = (tabId) => {
    setAnimatedTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
    // Reset animation state after the wiggle/pop completes
    setTimeout(() => {
      setAnimatedTab(null);
    }, 450);
  };

  return (
    <header
      className={`site-header ${showCompactHeader ? "header-scrolled" : "header-expanded"} ${
        !isHome ? "header-minimal" : ""
      }`}
    >
      <div className="container header-top-bar">
        {/* Exact Airbnb Bélo Logo & lower-case wordmark */}
        <Link to="/" className="brand-logo" aria-label="Airbnb Homepage">
          <svg
            className="brand-icon"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.373c0 4.148-3.087 7.748-7.5 7.748-2.615 0-5.062-1.267-6.5-3.328l-1-1.428-1 1.428c-1.438 2.061-3.885 3.328-6.5 3.328-4.413 0-7.5-3.6-7.5-7.748 0-1.127.279-2.186.837-3.473l.279-.649c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C8.537 1.963 9.992 1 12 1h4zm0 2h-4c-1.22 0-2.182.57-3.153 2.302l-.52 1.001C6.398 10.1 2.26 18.766 1.303 21.01l-.229.532C.617 22.617.4 23.447.4 24.252.4 27.26 2.658 30 6 30c2.19 0 4.257-1.144 5.485-3.042l1.515-2.342 1.515 2.342C15.743 28.856 17.81 30 20 30c3.342 0 5.6-2.74 5.6-5.748 0-.805-.217-1.635-.674-2.71l-.229-.532c-.957-2.244-5.095-10.91-7.024-14.707l-.52-1.001C16.182 3.57 15.22 3 14 3h2zm0 13c2.209 0 4 1.791 4 4 0 2.213-1.787 3.996-3.994 4L16 24c-2.209 0-4-1.791-4-4 0-2.213 1.787-3.996 3.994-4L16 16zm0 2c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" />
          </svg>
          <span className="brand-name">airbnb</span>
        </Link>

        {/* Center Zone: Tabs at top, or compact floating search pill when scrolled */}
        <div className="header-center-zone">
          {isHome && !showCompactHeader && (
            <nav className="nav-tabs-wrapper" aria-label="Service categories">
              {NAV_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const isWiggling = animatedTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`nav-tab-btn ${isActive ? "active" : ""} ${
                      isWiggling ? "tab-wiggle" : ""
                    }`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    <span className="nav-tab-icon" aria-hidden="true">
                      {tab.icon}
                    </span>
                    <span className="nav-tab-label">{tab.label}</span>
                    {isActive && <span className="nav-tab-active-pill" />}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Compact search pill when scrolled or on detail pages */}
          {showSearch && (showCompactHeader || isSearchExpanded) && (
            <div className="header-scrolled-search-slot">
              {children}
            </div>
          )}
        </div>

        {/* Right Action Controls */}
        <div className="header-actions">
          <Link to="/" className="host-link">
            Become a host
          </Link>

          <button className="globe-button" aria-label="Language & Currency">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm6.9 7.2H12.7c-.1-1.7-.6-3.2-1.4-4.5 2.1 1 3.2 2.7 3.6 4.5zM8 1.6c.9 1.4 1.5 3.3 1.6 5.6H6.4C6.5 4.9 7.1 3 8 1.6zM1.1 7.2c.4-1.8 1.5-3.5 3.6-4.5-.8 1.3-1.3 2.8-1.4 4.5H1.1zm0 1.6h2.2c.1 1.7.6 3.2 1.4 4.5-2.1-1-3.2-2.7-3.6-4.5zm6.9 5.6c-.9-1.4-1.5-3.3-1.6-5.6h3.2c-.1 2.3-.7 4.2-1.6 5.6zm1.7-1.1c.8-1.3 1.3-2.8 1.4-4.5h2.2c-.4 1.8-1.5 3.5-3.6 4.5z"/>
            </svg>
          </button>

          <div className="user-menu-pill">
            <button className="user-menu-btn" aria-label="User Profile Menu">
              <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor" className="menu-icon">
                <path d="M4 8h24v2.667H4V8zm0 7.333h24v2.667H4v-2.667zm0 7.334h24v2.666H4V22.667z" />
              </svg>
              <div className="user-avatar-placeholder">
                <svg viewBox="0 0 32 32" width="28" height="28" fill="#717171">
                  <path d="M16 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0 18c-6.627 0-12 3.582-12 8v2h24v-2c0-4.418-5.373-8-12-8z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Hero Search Bar (Visible at page top) */}
      {isHome && !showCompactHeader && showSearch && (
        <div className="header-expanded-search-zone">
          <div className="container expanded-search-container">
            {children}
          </div>
        </div>
      )}
    </header>
  );
}
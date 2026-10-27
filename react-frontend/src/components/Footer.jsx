import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* 3 Columns matching real Airbnb */}
        <div className="footer-columns-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">Support</h4>
            <ul className="footer-nav-list">
              <li><button type="button" className="footer-link-btn">Help Centre</button></li>
              <li><button type="button" className="footer-link-btn">AirCover guarantee</button></li>
              <li><button type="button" className="footer-link-btn">Anti-discrimination</button></li>
              <li><button type="button" className="footer-link-btn">Disability support</button></li>
              <li><button type="button" className="footer-link-btn">Cancellation options</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Hosting</h4>
            <ul className="footer-nav-list">
              <li><button type="button" className="footer-link-btn">Airbnb your home</button></li>
              <li><button type="button" className="footer-link-btn">AirCover for Hosts</button></li>
              <li><button type="button" className="footer-link-btn">Hosting resources</button></li>
              <li><button type="button" className="footer-link-btn">Community forum</button></li>
              <li><button type="button" className="footer-link-btn">Hosting responsibly</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Airbnb</h4>
            <ul className="footer-nav-list">
              <li><button type="button" className="footer-link-btn">Newsroom</button></li>
              <li><button type="button" className="footer-link-btn">New features</button></li>
              <li><button type="button" className="footer-link-btn">Careers</button></li>
              <li><button type="button" className="footer-link-btn">Investors</button></li>
              <li><button type="button" className="footer-link-btn">Gift cards</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <span>© 2026 Airbnb, Inc.</span>
            <span className="footer-dot">·</span>
            <button type="button" className="footer-legal-btn">Privacy</button>
            <span className="footer-dot">·</span>
            <button type="button" className="footer-legal-btn">Terms</button>
            <span className="footer-dot">·</span>
            <button type="button" className="footer-legal-btn">Sitemap</button>
            <span className="footer-dot">·</span>
            <button type="button" className="footer-legal-btn">Company details</button>
          </div>

          <div className="footer-bottom-right">
            <span className="footer-locale-btn">🌐 English (IN)</span>
            <span className="footer-currency-btn">₹ INR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
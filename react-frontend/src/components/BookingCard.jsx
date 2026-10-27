import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PropertyDetailsPage.css";

export default function BookingCard({ listing }) {
  const navigate = useNavigate();

  // Sensible default dates: tomorrow and 4 days after
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);

  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 5);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(formatDate(defaultCheckIn));
  const [checkOut, setCheckOut] = useState(formatDate(defaultCheckOut));
  const [guestCount, setGuestCount] = useState("2");
  const [dateError, setDateError] = useState("");

  // Calculate duration in nights
  const calculateNights = (start, end) => {
    if (!start || !end) return 0;
    const diffTime = new Date(end) - new Date(start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights(checkIn, checkOut);

  // Price calculations
  const baseSubtotal = nights * listing.pricePerNight;
  const cleaningFee = listing.cleaningFee || 0;
  const serviceFee = listing.serviceFee || 0;
  const totalCost = baseSubtotal + cleaningFee + serviceFee;

  const handleCheckInChange = (e) => {
    const val = e.target.value;
    setCheckIn(val);
    if (checkOut && new Date(val) >= new Date(checkOut)) {
      setDateError("Check-out date must be after check-in date");
    } else {
      setDateError("");
    }
  };

  const handleCheckOutChange = (e) => {
    const val = e.target.value;
    setCheckOut(val);
    if (checkIn && new Date(checkIn) >= new Date(val)) {
      setDateError("Check-out date must be after check-in date");
    } else {
      setDateError("");
    }
  };

  const handleReserve = (e) => {
    e.preventDefault();
    if (nights <= 0) {
      setDateError("Please select a valid date range of at least 1 night");
      return;
    }

    // Preserve booking parameters into route state for /booking/:id
    navigate(`/booking/${listing.id}`, {
      state: {
        checkIn,
        checkOut,
        nights,
        guests: parseInt(guestCount, 10),
        baseSubtotal,
        cleaningFee,
        serviceFee,
        totalCost
      }
    });
  };

  return (
    <aside className="booking-card-widget" aria-label="Reservation widget">
      {/* Top Header: Price & Reviews */}
      <div className="booking-card-header">
        <div className="booking-card-price">
          <span className="price-amount-large">${listing.pricePerNight}</span>
          <span className="price-unit-text"> night</span>
        </div>
        <div className="booking-card-rating">
          <span className="star-icon" aria-hidden="true">★</span>
          <span className="rating-num">{listing.rating.toFixed(2)}</span>
          <span className="rating-dot" aria-hidden="true">·</span>
          <span className="reviews-count-text">{listing.reviewsCount} reviews</span>
        </div>
      </div>

      {/* Input Matrix Box */}
      <form onSubmit={handleReserve} className="booking-inputs-box">
        <div className="booking-dates-row">
          <div className="booking-date-field border-right">
            <label htmlFor="booking-checkin" className="booking-input-label">
              CHECK-IN
            </label>
            <input
              id="booking-checkin"
              type="date"
              className="booking-date-picker"
              value={checkIn}
              min={formatDate(today)}
              onChange={handleCheckInChange}
              required
            />
          </div>

          <div className="booking-date-field">
            <label htmlFor="booking-checkout" className="booking-input-label">
              CHECKOUT
            </label>
            <input
              id="booking-checkout"
              type="date"
              className="booking-date-picker"
              value={checkOut}
              min={checkIn || formatDate(today)}
              onChange={handleCheckOutChange}
              required
            />
          </div>
        </div>

        <div className="booking-guests-field">
          <label htmlFor="booking-guests" className="booking-input-label">
            GUESTS
          </label>
          <select
            id="booking-guests"
            className="booking-guest-select"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
          >
            {Array.from({ length: listing.maxGuests }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        {dateError && <p className="booking-date-error-msg">{dateError}</p>}

        {/* Reserve Button */}
        <button
          type="submit"
          className="booking-reserve-submit-btn"
          disabled={nights <= 0 || Boolean(dateError)}
        >
          Reserve
        </button>
      </form>

      <p className="booking-disclaimer">You won't be charged yet</p>

      {/* Dynamic Cost Breakdown */}
      {nights > 0 && !dateError && (
        <div className="booking-cost-breakdown">
          <div className="cost-breakdown-row">
            <span className="breakdown-label">
              ${listing.pricePerNight} × {nights} {nights === 1 ? "night" : "nights"}
            </span>
            <span className="breakdown-value">${baseSubtotal.toLocaleString()}</span>
          </div>

          <div className="cost-breakdown-row">
            <span className="breakdown-label">Cleaning fee</span>
            <span className="breakdown-value">${cleaningFee}</span>
          </div>

          <div className="cost-breakdown-row">
            <span className="breakdown-label">Haven service fee</span>
            <span className="breakdown-value">${serviceFee}</span>
          </div>

          <div className="cost-breakdown-divider" />

          <div className="cost-breakdown-row total-row">
            <span className="total-label">Total before taxes</span>
            <span className="total-value">${totalCost.toLocaleString()}</span>
          </div>
        </div>
      )}
    </aside>
  );
}
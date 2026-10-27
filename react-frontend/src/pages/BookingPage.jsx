import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { getListingById, LISTINGS } from "../data/listings";
import "../styles/BookingPage.css";

export default function BookingPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const listing = getListingById(id) || LISTINGS[0];

  const checkIn = searchParams.get("checkIn") || "2026-10-27";
  const checkOut = searchParams.get("checkOut") || "2026-10-28";
  const guests = searchParams.get("guests") || "1";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paymentMethod: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: ""
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const price = listing.pricePerNight;
  const taxes = listing.taxes || 176.64;
  const total = price + taxes;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error once user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "Enter a valid email address";
    }

    // Indian 10-digit phone number validation
    const cleanedPhone = formData.phone.replace(/\D/g, "");
    if (!cleanedPhone) {
      errs.phone = "Phone number is required";
    } else if (cleanedPhone.length < 10) {
      errs.phone = "Enter a valid 10-digit phone number";
    }

    // Payment validation
    if (formData.paymentMethod === "card") {
      const cleanCard = formData.cardNumber.replace(/\s+/g, "");
      if (!cleanCard) {
        errs.cardNumber = "Card number is required";
      } else if (cleanCard.length < 15 || cleanCard.length > 19) {
        errs.cardNumber = "Enter a valid card number (15-19 digits)";
      }

      if (!formData.expiry.trim()) {
        errs.expiry = "Required (MM/YY)";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry.trim())) {
        errs.expiry = "Use MM/YY format";
      }

      if (!formData.cvv.trim()) {
        errs.cvv = "Required";
      } else if (formData.cvv.trim().length < 3) {
        errs.cvv = "3 or 4 digits";
      }
    } else {
      if (!formData.upiId.trim()) {
        errs.upiId = "UPI ID is required";
      } else if (!formData.upiId.includes("@")) {
        errs.upiId = "Enter a valid UPI ID (e.g. name@bank)";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="booking-page-shell">
      <header className="checkout-minimal-header">
        <div className="container checkout-header-inner">
          <Link to="/" className="checkout-brand" aria-label="Airbnb Home">
            <svg
              className="checkout-brand-icon"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.373c0 4.148-3.087 7.748-7.5 7.748-2.615 0-5.062-1.267-6.5-3.328l-1-1.428-1 1.428c-1.438 2.061-3.885 3.328-6.5 3.328-4.413 0-7.5-3.6-7.5-7.748 0-1.127.279-2.186.837-3.473l.279-.649c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C8.537 1.963 9.992 1 12 1h4zm0 2h-4c-1.22 0-2.182.57-3.153 2.302l-.52 1.001C6.398 10.1 2.26 18.766 1.303 21.01l-.229.532C.617 22.617.4 23.447.4 24.252.4 27.26 2.658 30 6 30c2.19 0 4.257-1.144 5.485-3.042l1.515-2.342 1.515 2.342C15.743 28.856 17.81 30 20 30c3.342 0 5.6-2.74 5.6-5.748 0-.805-.217-1.635-.674-2.71l-.229-.532c-.957-2.244-5.095-10.91-7.024-14.707l-.52-1.001C16.182 3.57 15.22 3 14 3h2zm0 13c2.209 0 4 1.791 4 4 0 2.213-1.787 3.996-3.994 4L16 24c-2.209 0-4-1.791-4-4 0-2.213 1.787-3.996 3.994-4L16 16zm0 2c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" />
            </svg>
            <span className="checkout-brand-text">airbnb</span>
          </Link>
        </div>
      </header>

      <main className="container checkout-main">
        <div className="checkout-title-bar">
          <button
            type="button"
            className="checkout-back-btn"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="checkout-page-heading">Confirm and pay</h1>
        </div>

        {isSuccess ? (
          <div className="booking-confirmed-card">
            <div className="confirmed-check-icon">✓</div>
            <h2 className="confirmed-title">Reservation confirmed!</h2>
            <p className="confirmed-subtitle">
              You are all set for {listing.title}. A confirmation has been sent to {formData.email}.
            </p>
            <Link to="/" className="confirmed-home-btn">
              Explore more stays
            </Link>
          </div>
        ) : (
          <div className="checkout-layout-grid">
            <form className="checkout-form-container" onSubmit={handleFormSubmit} noValidate>
              {/* Guest Details */}
              <section className="form-section-card">
                <h2 className="form-section-title">Guest details</h2>
                <div className="form-row-2col">
                  <div className="form-group">
                    <label className="form-field-label">First name</label>
                    <input
                      type="text"
                      className={`form-text-input ${errors.firstName ? "input-has-error" : ""}`}
                      placeholder="e.g. Rahul"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                    {errors.firstName && <span className="field-error-msg">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-field-label">Last name</label>
                    <input
                      type="text"
                      className={`form-text-input ${errors.lastName ? "input-has-error" : ""}`}
                      placeholder="e.g. Sharma"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                    {errors.lastName && <span className="field-error-msg">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label className="form-field-label">Email address</label>
                    <input
                      type="email"
                      className={`form-text-input ${errors.email ? "input-has-error" : ""}`}
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                    {errors.email && <span className="field-error-msg">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-field-label">Phone number</label>
                    <input
                      type="tel"
                      className={`form-text-input ${errors.phone ? "input-has-error" : ""}`}
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                    {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="form-section-card">
                <h2 className="form-section-title">Pay with</h2>
                <div className="payment-radio-group">
                  <label className="payment-choice-pill">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === "card"}
                      onChange={() => handleInputChange("paymentMethod", "card")}
                    />
                    <span>Credit or Debit Card</span>
                  </label>
                  <label className="payment-choice-pill">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === "upi"}
                      onChange={() => handleInputChange("paymentMethod", "upi")}
                    />
                    <span>UPI / Netbanking</span>
                  </label>
                </div>

                {formData.paymentMethod === "card" ? (
                  <div className="card-fields-box">
                    <div className="form-group">
                      <label className="form-field-label">Card number</label>
                      <input
                        type="text"
                        className={`form-text-input ${errors.cardNumber ? "input-has-error" : ""}`}
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      />
                      {errors.cardNumber && <span className="field-error-msg">{errors.cardNumber}</span>}
                    </div>
                    <div className="form-row-2col">
                      <div className="form-group">
                        <label className="form-field-label">Expiration</label>
                        <input
                          type="text"
                          className={`form-text-input ${errors.expiry ? "input-has-error" : ""}`}
                          placeholder="MM / YY"
                          value={formData.expiry}
                          onChange={(e) => handleInputChange("expiry", e.target.value)}
                        />
                        {errors.expiry && <span className="field-error-msg">{errors.expiry}</span>}
                      </div>
                      <div className="form-group">
                        <label className="form-field-label">CVV</label>
                        <input
                          type="password"
                          maxLength="4"
                          className={`form-text-input ${errors.cvv ? "input-has-error" : ""}`}
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                        />
                        {errors.cvv && <span className="field-error-msg">{errors.cvv}</span>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="form-group">
                    <label className="form-field-label">UPI ID</label>
                    <input
                      type="text"
                      className={`form-text-input ${errors.upiId ? "input-has-error" : ""}`}
                      placeholder="username@okhdfcbank"
                      value={formData.upiId}
                      onChange={(e) => handleInputChange("upiId", e.target.value)}
                    />
                    {errors.upiId && <span className="field-error-msg">{errors.upiId}</span>}
                  </div>
                )}
              </section>

              {/* Cancellation & Submit */}
              <section className="form-section-card">
                <h2 className="form-section-title">Cancellation policy</h2>
                <p className="form-disclaimer-text">
                  Free cancellation before check-in. Cancel anytime if your plans change. By clicking the button below, you agree to the host's house rules and terms of service.
                </p>

                <button type="submit" className="complete-booking-btn">
                  Confirm and pay · ₹{total.toLocaleString()}
                </button>
              </section>
            </form>

            {/* Right Column: Sticky Summary Card */}
            <aside className="checkout-summary-column" aria-label="Booking summary">
              <div className="summary-sticky-card">
                <div className="summary-property-header">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="summary-thumbnail"
                  />
                  <div className="summary-property-info">
                    <h2 className="summary-listing-title">{listing.title}</h2>
                    <div className="summary-rating-row">
                      <span>★ {listing.rating}</span>
                      <span className="summary-reviews">({listing.reviewsCount})</span>
                      {listing.guestFavorite && (
                        <span className="summary-guest-fav">· Guest favourite</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="summary-divider" />

                <div className="trip-details-block">
                  <div className="trip-detail-row">
                    <div>
                      <span className="trip-detail-label">Dates</span>
                      <p className="trip-detail-value">{checkIn} – {checkOut}</p>
                    </div>
                    <button type="button" className="trip-change-btn" onClick={() => navigate(-1)}>
                      Change
                    </button>
                  </div>

                  <div className="trip-detail-row">
                    <div>
                      <span className="trip-detail-label">Guests</span>
                      <p className="trip-detail-value">{guests} {parseInt(guests, 10) === 1 ? "guest" : "guests"}</p>
                    </div>
                    <button type="button" className="trip-change-btn" onClick={() => navigate(-1)}>
                      Change
                    </button>
                  </div>
                </div>

                <div className="summary-divider" />

                <div className="summary-pricing-block">
                  <h3 className="pricing-heading">Price details</h3>
                  <div className="pricing-row">
                    <span>1 night x ₹{price.toLocaleString()}</span>
                    <span>₹{price.toLocaleString()}</span>
                  </div>
                  <div className="pricing-row">
                    <span>Taxes & service fees</span>
                    <span>₹{taxes.toLocaleString()}</span>
                  </div>

                  <div className="summary-divider" />

                  <div className="pricing-row total-pricing-row">
                    <span>Total (INR)</span>
                    <span className="total-highlight-val">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
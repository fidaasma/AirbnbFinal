/* ==========================================================
   Service Detail Page Controller
   Backend API:
   - Detail: GET http://localhost:5000/api/services/:id
   - All:    GET http://localhost:5000/api/services
   ========================================================== */

const API_BASE = "http://localhost:5000";
const SERVICE_ENDPOINT = (id) => `${API_BASE}/api/services/${encodeURIComponent(id)}`;
const ALL_SERVICES_ENDPOINT = `${API_BASE}/api/services`;

const $ = (id) => document.getElementById(id);
let service = null;
let lightboxImages = [];
let lightboxIndex = 0;
let mapInstance = null;

/* ---------- Helpers ---------- */
const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));

const formatPrice = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

function show(which) {
  $("loading").hidden = which !== "loading";
  $("error").hidden = which !== "error";
  $("content").hidden = which !== "content";
}

function showError(title, message, canRetry = true) {
  $("error-title").textContent = title;
  $("error-message").textContent = message;
  $("retry-btn").hidden = !canRetry;
  document.title = title;
  show("error");
}

function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => (t.hidden = true), 2400);
}

/* ---------- Data Loading ---------- */
async function loadService() {
  const serviceId = new URLSearchParams(window.location.search).get("id");

  if (!serviceId || !serviceId.trim()) {
    showError("Service not found", "No service was selected. Go back and choose a service.", false);
    return;
  }

  show("loading");
  try {
    const res = await fetch(SERVICE_ENDPOINT(serviceId.trim()));

    if (res.status === 404) {
      showError("Service not found", "This service may have been removed or the link is incorrect.", false);
      return;
    }
    if (res.status === 400) {
      showError("Service not found", "The service link is not valid.", false);
      return;
    }
    if (!res.ok) {
      throw new Error("Server responded with " + res.status);
    }

    service = await res.json();
    if (!service || !service._id) {
      showError("Service not found", "The server returned no service data.", false);
      return;
    }

    render(service);
    initMap(service);
    loadRelatedServices(service);
  } catch (err) {
    console.error("Failed to load service:", err);
    showError("Unable to load service", "Unable to load service. Please check your connection and try again.");
  }
}

/* ---------- Render Page ---------- */
function render(s) {
  document.title = `${s.title || "Service"} · Services`;

  const images = [...new Set([s.image, ...(Array.isArray(s.images) ? s.images : [])].filter(Boolean))];
  const portfolio = Array.isArray(s.portfolio) ? s.portfolio.filter(Boolean) : [];
  const quals = Array.isArray(s.qualifications) ? s.qualifications : [];
  const host = s.host || {};
  const area = s.serviceArea || {};
  const know = s.thingsToKnow || {};
  const cancel = s.cancellationPolicy || {};
  const unit = s.unit ? ` / ${esc(s.unit)}` : "";
  const priceHtml = `${formatPrice(s.price)}<span>${unit}</span>`;
  const hasRating = typeof s.rating === "number" && s.rating > 0;
  const ratingVal = hasRating ? s.rating.toFixed(1) : "New";
  const reviewCountVal = s.reviewCount != null ? Number(s.reviewCount) : 0;

  const galleryItems = images.slice(0, 4).map(
    (src, i) => `<div class="g-item" data-gallery="${i}"><img src="${esc(src)}" alt="${esc(s.title)} photo ${i + 1}" ${i ? 'loading="lazy"' : ""}></div>`
  ).join("");

  $("content").innerHTML = `
    <div class="title-row">
      <h1>${esc(s.title)}</h1>
      <div class="actions">
        <button class="icon-btn" id="share-btn"><i class="fa-solid fa-arrow-up-from-bracket"></i> Share</button>
        <button class="icon-btn" id="fav-btn" aria-pressed="false"><i class="fa-regular fa-heart"></i> Save</button>
      </div>
    </div>

    <div class="meta">
      <span><i class="fa-solid fa-star"></i> <strong>${ratingVal}</strong></span>
      <span class="dot">·</span>
      <span>${reviewCountVal} reviews</span>
      ${s.location ? `<span class="dot">·</span><span><i class="fa-solid fa-location-dot"></i> ${esc(s.location)}</span>` : ""}
      ${s.serviceType ? `<span class="type-chip">${esc(s.serviceType)}</span>` : ""}
      ${s.isPopular ? `<span class="badge">Popular</span>` : ""}
    </div>

    ${images.length ? `
    <div class="gallery count-${Math.min(images.length, 4) >= 3 ? 3 : images.length}" id="gallery">
      ${galleryItems}
      <span class="photo-count" id="photo-count">1 / ${images.length}</span>
    </div>` : ""}

    <div class="layout">
      <div class="main-col">
        <section>
          <h2>${esc(s.serviceType || "Service")} in ${esc(s.location || "your area")}</h2>
          <div class="facts">
            ${s.duration ? `<div class="fact"><i class="fa-regular fa-clock"></i><span>${esc(s.duration)}</span></div>` : ""}
            ${s.unit ? `<div class="fact"><i class="fa-solid fa-user-group"></i><span>Priced per ${esc(s.unit)}</span></div>` : ""}
            ${s.providedAt ? `<div class="fact"><i class="fa-solid fa-house-flag"></i><span>${esc(s.providedAt)}</span></div>` : ""}
          </div>
        </section>

        ${s.description ? `<section><h2>About this service</h2><p class="desc">${esc(s.description)}</p></section>` : ""}

        ${host.name ? `
        <section>
          <h2>Meet your host</h2>
          <div class="host-card">
            ${host.image ? `<img src="${esc(host.image)}" alt="${esc(host.name)}">` : `<div class="avatar-fallback">${esc(host.name.charAt(0))}</div>`}
            <div class="host-info">
              <h3>Hosted by ${esc(host.name)}</h3>${host.role ? `<p class="sub">${esc(host.role)}</p>` : ""}
            </div>
            <button class="btn btn-outline" id="contact-btn"><i class="fa-regular fa-message"></i> Contact host</button>
          </div>
        </section>` : ""}

        ${quals.length ? `
        <section>
          <h2>Qualifications</h2>
          <div class="qual-list">
            ${quals.map((q) => `
              <div class="qual">
                <i class="fa-solid fa-award"></i>
                <h3>${esc(q.title)}</h3>
                <p>${esc(q.description)}</p>
              </div>`).join("")}
          </div>
        </section>` : ""}

        ${portfolio.length ? `
        <section>
          <h2>Portfolio</h2>
          <div class="portfolio-grid">
            ${portfolio.map((src, i) => `<button data-portfolio="${i}" aria-label="Open portfolio image ${i + 1}"><img src="${esc(src)}" alt="Portfolio image ${i + 1}" loading="lazy"></button>`).join("")}
          </div>
        </section>` : ""}

        <!-- Reviews Section -->
        <section class="reviews-section" id="reviews-section">
          <div class="reviews-header">
            <h2><i class="fa-solid fa-star"></i> ${ratingVal} · ${reviewCountVal} reviews</h2>
          </div>
          <div class="reviews-grid">
            ${generateReviewsHTML(s)}
          </div>
        </section>

        <!-- Where you'll be & Map Section -->
        <section>
          <h2>Where you'll be</h2>
          <div class="area-card">
            <div class="area-pin"><i class="fa-solid fa-location-dot"></i></div>
            <div>
              ${area.description ? `<p>${esc(area.description)}</p>` : `<p>Service available in ${esc(s.location || "the area")}</p>`}
              ${area.address ? `<p>${esc(area.address)}</p>` : `<p>${esc(s.location || "")}</p>`}
            </div>
          </div>
          <div class="map-wrapper">
            <div id="service-map"></div>
          </div>
        </section>

        ${(cancel.type || cancel.description) ? `
        <section>
          <h2>Cancellation policy</h2>
          ${cancel.type ? `<span class="policy-type">${esc(cancel.type)}</span>` : ""}
          ${cancel.description ? `<p class="desc">${esc(cancel.description)}</p>` : ""}
        </section>` : ""}

        <section>
          <h2>Things to know</h2>
          <div class="know-grid">
            ${know.guestRequirements ? `<div class="know"><i class="fa-solid fa-clipboard-list"></i><h3>Guest requirements</h3><p>${esc(know.guestRequirements)}</p></div>` : ""}
            ${know.accessibility ? `<div class="know"><i class="fa-solid fa-universal-access"></i><h3>Accessibility</h3><p>${esc(know.accessibility)}</p></div>` : ""}
            ${know.cancellationPolicy ? `<div class="know"><i class="fa-solid fa-calendar-xmark"></i><h3>Cancellation policy</h3><p>${esc(know.cancellationPolicy)}</p></div>` : ""}
          </div>
        </section>
      </div>

      <!-- Sticky Reserve Aside -->
      <aside>
        <div class="book-card">
          <div class="price">${priceHtml}</div>
          <div class="book-meta">
            ${s.duration ? `<div><span>Duration</span><span>${esc(s.duration)}</span></div>` : ""}
            ${s.unit ? `<div><span>Priced per</span><span>${esc(s.unit)}</span></div>` : ""}
            ${s.location ? `<div><span>Location</span><span>${esc(s.location)}</span></div>` : ""}
          </div>
          <button class="btn btn-primary btn-block" data-reserve>Reserve</button>
          <p class="book-note">You won't be charged yet</p>
        </div>
      </aside>
    </div>

    <!-- Related Services Section (Spans Full Width) -->
    <section class="related-services-section" id="related-services-section" hidden>
      <div class="related-header">
        <h2>Related services</h2>
        <p class="sub">Similar experiences and services you might like</p>
      </div>
      <div class="related-grid" id="related-services-grid"></div>
      <div class="related-actions">
        <a href="airbnb-services.html" class="btn btn-outline">
          <i class="fa-solid fa-compass"></i> Explore all services
        </a>
      </div>
    </section>

    <!-- Mobile Sticky Reserve Bar -->
    <div class="mobile-bar">
      <div><div class="price">${priceHtml}</div>${s.duration ? `<small>${esc(s.duration)}</small>` : ""}</div>
      <button class="btn btn-primary" data-reserve>Reserve</button>
    </div>
  `;

  wireInteractions(images, portfolio);
  show("content");
}

/* ---------- Reviews Generator ---------- */
function generateReviewsHTML(s) {
  const hostFirstName = s.host && s.host.name ? s.host.name.split(" ")[0] : "the host";
  const serviceType = s.serviceType || "service";
  
  const sampleReviews = [
    {
      name: "Priya Sharma",
      date: "September 2026",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment: `An incredible experience! ${hostFirstName} was prompt, professional, and delivered top-notch ${serviceType.toLowerCase()} quality. Highly recommended!`
    },
    {
      name: "Rahul Verma",
      date: "August 2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment: `Everything was seamless from booking to the actual session in ${s.location || "town"}. Great attention to detail and communication throughout.`
    }
  ];

  return sampleReviews.map(r => `
    <div class="review-card">
      <div class="reviewer-meta">
        <img src="${r.avatar}" alt="${esc(r.name)}" class="reviewer-avatar">
        <div>
          <div class="reviewer-name">${esc(r.name)}</div>
          <div class="review-date">${esc(r.date)}</div>
        </div>
      </div>
      <div class="review-stars">
        ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating)}
      </div>
      <p class="review-text">${esc(r.comment)}</p>
    </div>
  `).join("");
}

/* ---------- Leaflet Map & Nominatim Geocoding ---------- */
async function initMap(s) {
  const mapContainer = $("service-map");
  if (!mapContainer || typeof L === "undefined") return;

  const address = (s.serviceArea && s.serviceArea.address) ? s.serviceArea.address : (s.location || "Kochi, Kerala, India");

  try {
    // OpenStreetMap Nominatim Geocoding API
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
    const res = await fetch(geocodeUrl, {
      headers: { "Accept-Language": "en" }
    });

    let lat = null;
    let lon = null;

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        lat = parseFloat(data[0].lat);
        lon = parseFloat(data[0].lon);
      }
    }

    // Secondary fallback geocode on location city if exact address fails
    if ((lat === null || lon === null) && s.location) {
      const fallbackUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(s.location)}&limit=1`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        if (Array.isArray(fallbackData) && fallbackData.length > 0) {
          lat = parseFloat(fallbackData[0].lat);
          lon = parseFloat(fallbackData[0].lon);
        }
      }
    }

    // If geocoding completely fails, show fallback note without breaking the UI
    if (lat === null || lon === null || isNaN(lat) || isNaN(lon)) {
      renderMapFallback("Map location could not be loaded for this address.");
      return;
    }

    if (mapInstance) {
      mapInstance.remove();
    }

    // Initialize Leaflet Map
    mapInstance = L.map("service-map", {
      center: [lat, lon],
      zoom: 13,
      scrollWheelZoom: false
    });

    // Clean OpenStreetMap Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance);

    // Airbnb-style Custom Marker Pin
    const customIcon = L.divIcon({
      className: "airbnb-map-icon-container",
      html: '<div class="airbnb-custom-pin"><i class="fa-solid fa-location-dot"></i></div>',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36]
    });

    const marker = L.marker([lat, lon], { icon: customIcon }).addTo(mapInstance);

    const popupHtml = `
      <div>
        <h4>${esc(s.title || "Service")}</h4>
        <p><i class="fa-solid fa-location-dot"></i> ${esc(address)}</p>
      </div>
    `;
    marker.bindPopup(popupHtml).openPopup();
  } catch (err) {
    console.warn("Geocoding or Leaflet error:", err);
    renderMapFallback("Map location could not be loaded.");
  }
}

function renderMapFallback(msg) {
  const mapContainer = $("service-map");
  if (mapContainer) {
    mapContainer.innerHTML = `
      <div class="map-fallback">
        <i class="fa-solid fa-map-location-dot"></i>
        <p>${esc(msg)}</p>
      </div>
    `;
  }
}

/* ---------- Related Services Logic ---------- */
async function loadRelatedServices(currentService) {
  const section = $("related-services-section");
  const grid = $("related-services-grid");
  if (!section || !grid) return;

  try {
    const res = await fetch(ALL_SERVICES_ENDPOINT);
    if (!res.ok) return;

    const allServices = await res.json();
    if (!Array.isArray(allServices) || allServices.length === 0) return;

    // Filter out current service
    const candidates = allServices.filter((item) => String(item._id) !== String(currentService._id));
    if (candidates.length === 0) return;

    const currentType = (currentService.serviceType || "").toLowerCase().trim();
    const currentLocation = (currentService.location || "").toLowerCase().trim();

    // Prioritized Sorting
    // Tier 1: Same type AND same location (score = 3)
    // Tier 2: Same type (score = 2)
    // Tier 3: Same location (score = 1)
    // Tier 4: Other services (score = 0)
    candidates.sort((a, b) => {
      const aType = (a.serviceType || "").toLowerCase().trim();
      const aLoc = (a.location || "").toLowerCase().trim();
      const bType = (b.serviceType || "").toLowerCase().trim();
      const bLoc = (b.location || "").toLowerCase().trim();

      let scoreA = 0;
      let scoreB = 0;

      if (aType === currentType && aLoc === currentLocation) scoreA = 3;
      else if (aType === currentType) scoreA = 2;
      else if (aLoc === currentLocation) scoreA = 1;

      if (bType === currentType && bLoc === currentLocation) scoreB = 3;
      else if (bType === currentType) scoreB = 2;
      else if (bLoc === currentLocation) scoreB = 1;

      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }

      // Tie breaker: Popularity / Rating
      return (b.rating || 0) - (a.rating || 0);
    });

    // Select top 4 matches
    const related = candidates.slice(0, 4);
    if (related.length === 0) return;

    grid.innerHTML = related.map((item) => {
      const rating = typeof item.rating === "number" && item.rating > 0 ? item.rating.toFixed(1) : "New";
      const unit = item.unit ? ` / ${esc(item.unit)}` : "";
      return `
        <a href="service-detail.html?id=${encodeURIComponent(item._id)}" class="related-card">
          <div class="related-img-box">
            <img src="${esc(item.image)}" alt="${esc(item.title)}" loading="lazy">
            ${item.isPopular ? `<span class="related-badge">Popular</span>` : ""}
          </div>
          <div class="related-content">
            <div class="related-meta-row">
              <span class="related-location">${esc(item.location || "Kerala")}</span>
              <span class="related-rating"><i class="fa-solid fa-star"></i> ${rating}</span>
            </div>
            <div class="related-title">${esc(item.title)}</div>
            ${item.serviceType ? `<span class="related-type-pill">${esc(item.serviceType)}</span>` : ""}
            <div class="related-price">${formatPrice(item.price)}<span>${unit}</span></div>
          </div>
        </a>
      `;
    }).join("");

    section.hidden = false;
  } catch (err) {
    console.warn("Unable to load related services:", err);
  }
}

/* ---------- Wire Interactions ---------- */
function wireInteractions(images, portfolio) {
  // Gallery and Portfolio Lightbox
  document.querySelectorAll("[data-gallery]").forEach((el) =>
    el.addEventListener("click", () => openLightbox(images, Number(el.dataset.gallery)))
  );
  document.querySelectorAll("[data-portfolio]").forEach((el) =>
    el.addEventListener("click", () => openLightbox(portfolio, Number(el.dataset.portfolio)))
  );

  // Mobile Gallery Carousel scroll indicator
  const gallery = $("gallery");
  if (gallery) {
    gallery.addEventListener("scroll", () => {
      const i = Math.round(gallery.scrollLeft / gallery.clientWidth);
      $("photo-count").textContent = `${i + 1} / ${gallery.querySelectorAll(".g-item").length}`;
    }, { passive: true });
  }

  // Favorite Button
  const fav = $("fav-btn");
  if (fav) {
    fav.addEventListener("click", () => {
      const on = fav.classList.toggle("liked");
      fav.setAttribute("aria-pressed", on);
      fav.querySelector("i").className = on ? "fa-solid fa-heart" : "fa-regular fa-heart";
      fav.lastChild.textContent = on ? " Saved" : " Save";
      toast(on ? "Saved to your favorites" : "Removed from favorites");
    });
  }

  // Share Link
  const shareBtn = $("share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const data = { title: service.title, text: `Check out ${service.title}`, url: window.location.href };
      try {
        if (navigator.share) { await navigator.share(data); return; }
        await navigator.clipboard.writeText(window.location.href);
        toast("Link copied to clipboard");
      } catch (e) {
        if (e.name !== "AbortError") toast("Couldn't share this link");
      }
    });
  }

  // Contact Host -> Coming Soon Modal
  const contact = $("contact-btn");
  if (contact) {
    contact.addEventListener("click", () => {
      const hostName = (service.host && service.host.name) ? service.host.name : "the host";
      openComingSoon(
        "fa-regular fa-comments",
        "Messaging Coming Soon",
        `Direct messaging with ${hostName} will be available soon. Please check back later!`
      );
    });
  }

  // Reserve Buttons -> Open Booking Modal
document.querySelectorAll("[data-reserve]").forEach((b) =>
  b.addEventListener("click", openBookingModal)
);
}

/* ---------- Service Booking ---------- */

let selectedBookingDate = "";
let selectedBookingTime = "";
let bookingGuests = 1;

function openBookingModal() {
  $("booking-service-title").textContent = service.title || "Service";

  bookingGuests = 1;
  selectedBookingDate = "";
  selectedBookingTime = "";

  $("guest-count").textContent = bookingGuests;
  $("booking-date").value = "";

  document.querySelectorAll(".time-option").forEach((button) => {
    button.classList.remove("selected");
  });

  $("booking-error").hidden = true;

  // Minimum date = today
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  $("booking-date").min = `${year}-${month}-${day}`;

  updateBookingTotal();

  $("booking-modal").hidden = false;
  document.body.style.overflow = "hidden";
}


function closeBookingModal() {
  $("booking-modal").hidden = true;
  document.body.style.overflow = "";
}


// Date selection
$("booking-date").addEventListener("change", (e) => {
  selectedBookingDate = e.target.value;
});


// Time selection
document.querySelectorAll(".time-option").forEach((button) => {
  button.addEventListener("click", () => {

    document.querySelectorAll(".time-option").forEach((btn) => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedBookingTime = button.dataset.time;
  });
});


// Guest minus
$("guest-minus").addEventListener("click", () => {
  if (bookingGuests > 1) {
    bookingGuests--;
    $("guest-count").textContent = bookingGuests;
    updateBookingTotal();
  }
});


// Guest plus
$("guest-plus").addEventListener("click", () => {
  bookingGuests++;
  $("guest-count").textContent = bookingGuests;
  updateBookingTotal();
});


// Update displayed price
function updateBookingTotal() {
  if (!service) return;

  let total;

  if (service.unit === "guest") {
    total = Number(service.price || 0) * bookingGuests;
  } else {
    total = Number(service.price || 0);
  }

  $("booking-total-price").textContent = formatPrice(total);
}


// Confirm booking
$("confirm-booking-btn").addEventListener("click", async () => {

  const errorBox = $("booking-error");

  errorBox.hidden = true;

  if (!selectedBookingDate) {
    errorBox.textContent = "Please select a date.";
    errorBox.hidden = false;
    return;
  }

  if (!selectedBookingTime) {
    errorBox.textContent = "Please select a time.";
    errorBox.hidden = false;
    return;
  }

  const guestName = prompt("Enter your name:");

  if (!guestName || !guestName.trim()) {
    return;
  }

  const guestEmail = prompt("Enter your email:");

  if (!guestEmail || !guestEmail.trim()) {
    return;
  }

  const button = $("confirm-booking-btn");

  button.disabled = true;
  button.textContent = "Booking...";

  try {

    const response = await fetch(`${API_BASE}/api/bookings/service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service: service._id,
        guestName: guestName.trim(),
        guestEmail: guestEmail.trim(),
        date: selectedBookingDate,
        time: selectedBookingTime,
        guests: bookingGuests
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Booking failed");
    }

    closeBookingModal();

    toast("Booking confirmed successfully!");

    console.log("Booking created:", data.booking);

  } catch (error) {

    console.error("Booking error:", error);

    errorBox.textContent =
      error.message || "Unable to complete booking. Please try again.";

    errorBox.hidden = false;

  } finally {

    button.disabled = false;
    button.textContent = "Reserve";

  }
});


// Close booking modal
$("booking-close-btn").addEventListener("click", closeBookingModal);

$("booking-modal").addEventListener("click", (e) => {
  if (e.target.id === "booking-modal") {
    closeBookingModal();
  }
});


/* ---------- Coming Soon Modal Logic ---------- */
function openComingSoon(iconClass, title, message) {
  $("modal-icon").innerHTML = `<i class="${iconClass}"></i>`;
  $("modal-title").textContent = title;
  $("modal-message").textContent = message;
  $("coming-soon-modal").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeComingSoon() {
  $("coming-soon-modal").hidden = true;
  document.body.style.overflow = "";
}

$("modal-close-btn").addEventListener("click", closeComingSoon);
$("modal-ok-btn").addEventListener("click", closeComingSoon);

$("coming-soon-modal").addEventListener("click", (e) => {
  if (e.target.id === "coming-soon-modal") {
    closeComingSoon();
  }
});

/* ---------- Lightbox UI (Full Fit, No Crop) ---------- */
function openLightbox(list, i) {
  if (!list.length) return;
  lightboxImages = list;
  lightboxIndex = i;
  updateLightbox();
  $("lightbox").hidden = false;
  document.body.style.overflow = "hidden";
}

function updateLightbox() {
  $("lb-img").src = lightboxImages[lightboxIndex];
  $("lb-caption").textContent = `Photo ${lightboxIndex + 1} of ${lightboxImages.length}`;
}

function closeLightbox() {
  $("lightbox").hidden = true;
  document.body.style.overflow = "";
}

function stepLightbox(d) {
  lightboxIndex = (lightboxIndex + d + lightboxImages.length) % lightboxImages.length;
  updateLightbox();
}

document.querySelector(".lb-close").addEventListener("click", closeLightbox);
document.querySelector(".lb-prev").addEventListener("click", () => stepLightbox(-1));
document.querySelector(".lb-next").addEventListener("click", () => stepLightbox(1));
$("lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox" || e.target.classList.contains("lightbox-stage")) {
    closeLightbox();
  }
});

/* ---------- Keyboard & Retry Handlers ---------- */
$("retry-btn").addEventListener("click", loadService);

document.addEventListener("keydown", (e) => {
  if (!$("lightbox").hidden) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  } else if (!$("coming-soon-modal").hidden && e.key === "Escape") {
    closeComingSoon();
  }
});

// Run loader
loadService();
/**
 * HOMEPAGE <-> API INTEGRATION SNIPPET (vanilla JS)
 *
 * Replaces the hardcoded `const LISTINGS = [...]` with data from the API.
 * Nothing about your HTML/CSS/cards/carousel/wishlist has to change - only where
 * the data comes from. Adjust the 3 things marked  >>> ADJUST  to match your file.
 */
const API_BASE_URL = 'http://localhost:5000/api';

let LISTINGS = [];               // was: const LISTINGS = [ ...hardcoded... ]
let activeCategory = 'All';      // >>> ADJUST: reuse your existing category variable
let searchTerm = '';             // >>> ADJUST: reuse your existing search variable

/**
 * MongoDB documents use `_id`, `pricePerNight`, `reviewCount`.
 * >>> ADJUST: map them to the property names your card-rendering code already uses.
 */
function normalizeListing(doc) {
  return {
    id: doc._id,                 // wishlist + click navigation should now use this string id
    title: doc.title,
    location: doc.location,
    price: doc.pricePerNight,
    rating: doc.rating,
    reviews: doc.reviewCount,
    category: doc.category,
    images: doc.images,
    guestFavourite: doc.guestFavourite,
  };
}

async function fetchListings() {
  const params = new URLSearchParams();
  if (activeCategory && activeCategory !== 'All') params.set('category', activeCategory);
  if (searchTerm.trim()) params.set('search', searchTerm.trim());

  const response = await fetch(`${API_BASE_URL}/listings?${params.toString()}`);
  if (!response.ok) throw new Error(`API responded with ${response.status}`);
  const json = await response.json();
  return json.data.map(normalizeListing);
}

// >>> ADJUST: point this at the element that holds your listing cards
const grid = document.querySelector('#listings-grid');

function showMessage(html) {
  grid.innerHTML = `<div class="state-message">${html}</div>`;
}

async function loadListings() {
  showMessage('Loading stays...');                              // loading state
  try {
    LISTINGS = await fetchListings();
    if (LISTINGS.length === 0) {                                // empty state
      showMessage('<strong>No stays found</strong><br>Try changing your search or filters.');
      return;
    }
    renderListings(LISTINGS);   // >>> ADJUST: call YOUR existing function that builds the cards
  } catch (error) {
    console.error(error);       // technical detail stays in the console only
    showMessage('Unable to load listings. Please try again.');  // friendly error state
  }
}

// Call loadListings() on page load, whenever a category is clicked, and (debounced) when typing in search.
let searchTimer;
function onSearchInput(value) {
  searchTerm = value;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(loadListings, 300);
}
function onCategoryClick(category) {
  activeCategory = category;
  loadListings();
}
document.addEventListener('DOMContentLoaded', loadListings);

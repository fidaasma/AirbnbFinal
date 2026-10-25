const Listing = require('../models/Listing');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

// Only these fields may be written by a client (blocks mass-assignment of _id, createdAt, ...)
const ALLOWED_FIELDS = [
  'title', 'description', 'location', 'city', 'country', 'pricePerNight', 'category',
  'images', 'rating', 'reviewCount', 'amenities', 'guestFavourite', 'maxGuests',
  'bedrooms', 'beds', 'bathrooms', 'host',
];

const pickListingFields = (source) =>
  ALLOWED_FIELDS.reduce((picked, key) => {
    if (source[key] !== undefined) picked[key] = source[key];
    return picked;
  }, {});

// Makes user text safe inside a RegExp ("a.b" should not match "aXb")
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const containsText = (text) => new RegExp(escapeRegex(text), 'i'); // case-insensitive

/** Turns ?category=&location=&search=&minPrice=&maxPrice= into a MongoDB filter */
const buildListingFilter = ({ category, location, search, minPrice, maxPrice }) => {
  const conditions = [];

  // "All" is the homepage's no-filter tab
  if (category && category.toLowerCase() !== 'all') {
    conditions.push({ category: new RegExp(`^${escapeRegex(category)}$`, 'i') });
  }

  if (location) {
    const rx = containsText(location);
    conditions.push({ $or: [{ location: rx }, { city: rx }, { country: rx }] });
  }

  // Destination search box: matches title, location, city or country
  if (search) {
    const rx = containsText(search);
    conditions.push({ $or: [{ title: rx }, { location: rx }, { city: rx }, { country: rx }] });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceRange = {};
    if (minPrice !== undefined) priceRange.$gte = Number(minPrice);
    if (maxPrice !== undefined) priceRange.$lte = Number(maxPrice);
    conditions.push({ pricePerNight: priceRange });
  }

  return conditions.length ? { $and: conditions } : {};
};

// GET /api/listings
const getListings = asyncHandler(async (req, res) => {
  const filter = buildListingFilter(req.query);
  const listings = await Listing.find(filter).sort({ createdAt: 1, _id: 1 }).lean();
  return sendSuccess(res, 200, { count: listings.length, data: listings });
});

// GET /api/listings/:id
const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).lean();
  if (!listing) return sendError(res, 404, 'Listing not found');
  return sendSuccess(res, 200, { data: listing });
});

// POST /api/listings
const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(pickListingFields(req.body));
  return sendSuccess(res, 201, { message: 'Listing created successfully', data: listing });
});

// PUT /api/listings/:id
const updateListing = asyncHandler(async (req, res) => {
  const updates = pickListingFields(req.body);
  if (Object.keys(updates).length === 0) {
    return sendError(res, 400, 'No valid fields provided to update');
  }

  const listing = await Listing.findByIdAndUpdate(
    req.params.id,
    { $set: updates },
    { new: true, runValidators: true } // return updated doc + re-check schema rules
  );
  if (!listing) return sendError(res, 404, 'Listing not found');
  return sendSuccess(res, 200, { message: 'Listing updated successfully', data: listing });
});

// DELETE /api/listings/:id
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findByIdAndDelete(req.params.id);
  if (!listing) return sendError(res, 404, 'Listing not found');
  return sendSuccess(res, 200, { message: 'Listing deleted successfully' });
});

module.exports = { getListings, getListingById, createListing, updateListing, deleteListing };

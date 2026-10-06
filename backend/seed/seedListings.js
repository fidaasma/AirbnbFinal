/**
 * Seed script - fills MongoDB with sample listings.
 * Run with:  npm run seed
 * WARNING: it deletes all existing listings first, so it is safe to re-run.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Listing = require('../models/Listing');

// Placeholder photos (4 per listing). Swap for your own image URLs/paths any time.
const photos = (seed) => [1, 2, 3, 4].map((n) => `https://picsum.photos/seed/${seed}-${n}/800/600`);
const avatar = (n) => `https://i.pravatar.cc/100?img=${n}`;

const listings = [
  {
    title: 'Oceanfront Villa', description: 'Beautiful villa steps from the beach with a private terrace and sunset views.',
    location: 'Candolim, Goa, India', city: 'Goa', country: 'India', pricePerNight: 8500, category: 'Beachfront',
    images: photos('goa-villa'), rating: 4.8, reviewCount: 120, amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'Beach access'],
    guestFavourite: true, maxGuests: 6, bedrooms: 3, beds: 4, bathrooms: 3, host: { name: 'Anjali', image: avatar(5) },
  },
  {
    title: 'Palolem Beach Hut', description: 'Simple bamboo beach hut right on the sand, perfect for a relaxed coastal escape.',
    location: 'Palolem, Goa, India', city: 'Goa', country: 'India', pricePerNight: 3200, category: 'Beachfront',
    images: photos('palolem-hut'), rating: 4.6, reviewCount: 86, amenities: ['WiFi', 'Breakfast', 'Hammock'],
    guestFavourite: false, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, host: { name: 'Rohan', image: avatar(12) },
  },
  {
    title: 'Cedar Cabin in the Tea Hills', description: 'Warm wooden cabin surrounded by tea plantations and misty morning views.',
    location: 'Munnar, Kerala, India', city: 'Munnar', country: 'India', pricePerNight: 4200, category: 'Cabins',
    images: photos('munnar-cabin'), rating: 4.9, reviewCount: 214, amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Free parking'],
    guestFavourite: true, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 1, host: { name: 'Meera', image: avatar(9) },
  },
  {
    title: 'Forest Log Cabin', description: 'Cosy log cabin tucked into a pine forest, ideal for a quiet mountain getaway.',
    location: 'Manali, Himachal Pradesh, India', city: 'Manali', country: 'India', pricePerNight: 5100, category: 'Cabins',
    images: photos('manali-cabin'), rating: 4.7, reviewCount: 98, amenities: ['Heater', 'Kitchen', 'Bonfire pit'],
    guestFavourite: false, maxGuests: 5, bedrooms: 2, beds: 3, bathrooms: 2, host: { name: 'Karan', image: avatar(15) },
  },
  {
    title: 'Sunset Terrace Studio', description: 'Stylish studio with a rooftop terrace overlooking the old city at golden hour.',
    location: 'Jaipur, Rajasthan, India', city: 'Jaipur', country: 'India', pricePerNight: 3800, category: 'Trending',
    images: photos('jaipur-studio'), rating: 4.85, reviewCount: 310, amenities: ['WiFi', 'Air conditioning', 'Rooftop', 'Workspace'],
    guestFavourite: true, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, host: { name: 'Priya', image: avatar(20) },
  },
  {
    title: 'Coffee Estate Bungalow', description: 'Colonial-style bungalow inside a working coffee estate with guided plantation walks.',
    location: 'Coorg, Karnataka, India', city: 'Coorg', country: 'India', pricePerNight: 6500, category: 'Countryside',
    images: photos('coorg-estate'), rating: 4.8, reviewCount: 142, amenities: ['WiFi', 'Kitchen', 'Garden', 'Free parking'],
    guestFavourite: true, maxGuests: 8, bedrooms: 4, beds: 5, bathrooms: 3, host: { name: 'Suresh', image: avatar(33) },
  },
  {
    title: 'Tuscan Countryside Farmhouse', description: 'Restored stone farmhouse among olive groves and vineyards with a garden pool.',
    location: 'Siena, Tuscany, Italy', city: 'Siena', country: 'Italy', pricePerNight: 14000, category: 'Countryside',
    images: photos('tuscany-farm'), rating: 4.95, reviewCount: 75, amenities: ['WiFi', 'Pool', 'Kitchen', 'Vineyard tours'],
    guestFavourite: true, maxGuests: 8, bedrooms: 4, beds: 6, bathrooms: 3, host: { name: 'Giulia', image: avatar(47) },
  },
  {
    title: 'Vembanad Lake Houseboat', description: 'Traditional Kerala houseboat with an on-board chef, cruising the quiet backwaters.',
    location: 'Alappuzha, Kerala, India', city: 'Alappuzha', country: 'India', pricePerNight: 9000, category: 'Lakefront',
    images: photos('alleppey-boat'), rating: 4.75, reviewCount: 188, amenities: ['Meals included', 'Air conditioning', 'Sun deck'],
    guestFavourite: true, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 2, host: { name: 'Thomas', image: avatar(52) },
  },
  {
    title: 'Lakeside Cottage', description: 'Charming cottage with a private jetty on the edge of a calm city lake.',
    location: 'Udaipur, Rajasthan, India', city: 'Udaipur', country: 'India', pricePerNight: 7800, category: 'Lakefront',
    images: photos('udaipur-lake'), rating: 4.7, reviewCount: 64, amenities: ['WiFi', 'Kayaks', 'Kitchen'],
    guestFavourite: false, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 2, host: { name: 'Divya', image: avatar(25) },
  },
  {
    title: 'Himalayan Snow-View Chalet', description: 'Wooden chalet with floor-to-ceiling windows facing snow-capped Himalayan peaks.',
    location: 'Kasol, Himachal Pradesh, India', city: 'Kasol', country: 'India', pricePerNight: 6800, category: 'Mountains',
    images: photos('kasol-chalet'), rating: 4.9, reviewCount: 156, amenities: ['Heater', 'Kitchen', 'Mountain view', 'Bonfire pit'],
    guestFavourite: true, maxGuests: 6, bedrooms: 3, beds: 4, bathrooms: 2, host: { name: 'Aman', image: avatar(60) },
  },
  {
    title: 'Darjeeling Tea Estate Lodge', description: 'Heritage lodge on a tea estate with sunrise views of Kanchenjunga.',
    location: 'Darjeeling, West Bengal, India', city: 'Darjeeling', country: 'India', pricePerNight: 5600, category: 'Mountains',
    images: photos('darjeeling-lodge'), rating: 4.6, reviewCount: 91, amenities: ['Breakfast', 'Fireplace', 'Garden'],
    guestFavourite: false, maxGuests: 4, bedrooms: 2, beds: 3, bathrooms: 2, host: { name: 'Pema', image: avatar(44) },
  },
  {
    title: 'Cliffside Cottage with Sea Views', description: 'Perched on the red cliffs with a wraparound balcony facing the Arabian Sea.',
    location: 'Varkala, Kerala, India', city: 'Varkala', country: 'India', pricePerNight: 5400, category: 'Amazing Views',
    images: photos('varkala-cliff'), rating: 4.8, reviewCount: 133, amenities: ['WiFi', 'Balcony', 'Air conditioning'],
    guestFavourite: true, maxGuests: 3, bedrooms: 1, beds: 2, bathrooms: 1, host: { name: 'Nisha', image: avatar(28) },
  },
  {
    title: 'Infinity Pool Villa', description: 'Modern villa with a private infinity pool, outdoor lounge and valley views.',
    location: 'Lonavala, Maharashtra, India', city: 'Lonavala', country: 'India', pricePerNight: 18500, category: 'Pools',
    images: photos('lonavala-pool'), rating: 4.85, reviewCount: 52, amenities: ['Private pool', 'WiFi', 'BBQ', 'Air conditioning'],
    guestFavourite: true, maxGuests: 10, bedrooms: 5, beds: 6, bathrooms: 5, host: { name: 'Vikram', image: avatar(68) },
  },
  {
    title: 'Royal Palace Suite', description: 'Heritage palace suite with butler service, courtyard dining and antique interiors.',
    location: 'Jaipur, Rajasthan, India', city: 'Jaipur', country: 'India', pricePerNight: 32000, category: 'Luxe',
    images: photos('jaipur-palace'), rating: 4.95, reviewCount: 41, amenities: ['Butler', 'Spa', 'Pool', 'Airport pickup'],
    guestFavourite: true, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 2, host: { name: 'Maharaj Singh', image: avatar(70) },
  },
  {
    title: 'A-Frame Tiny Home', description: 'Compact A-frame tiny home with a loft bed, surrounded by spice plantations.',
    location: 'Wayanad, Kerala, India', city: 'Wayanad', country: 'India', pricePerNight: 2900, category: 'Tiny Homes',
    images: photos('wayanad-tiny'), rating: 4.7, reviewCount: 77, amenities: ['WiFi', 'Loft bed', 'Outdoor shower'],
    guestFavourite: false, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, host: { name: 'Leena', image: avatar(36) },
  },
];

const seed = async () => {
  await connectDB();
  try {
    await Listing.deleteMany({});
    const created = await Listing.insertMany(listings);
    console.log(`[SEED] Inserted ${created.length} listings`);
  } catch (error) {
    console.error(`[SEED] Failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seed();

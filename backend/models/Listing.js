const mongoose = require('mongoose');

// Homepage category bar (the "All" tab is not a category - it means "no filter")
const CATEGORIES = [
  'Beachfront',
  'Cabins',
  'Trending',
  'Countryside',
  'Amazing Views',
  'Pools',
  'Lakefront',
  'Mountains',
  'Luxe',
  'Tiny Homes',
];

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    city: { type: String, trim: true },
    country: { type: String, trim: true },

    pricePerNight: {
      type: Number,
      required: [true, 'Price per night is required'],
      validate: {
        validator: (value) => value > 0,
        message: 'Price must be greater than 0',
      },
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: { values: CATEGORIES, message: '{VALUE} is not a valid category' },
    },

    images: {
      type: [String],
      validate: {
        validator: (arr) =>
          arr.length > 0 && arr.every((img) => typeof img === 'string' && img.trim() !== ''),
        message: 'At least one valid image is required',
      },
    },

    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be below 0'],
      max: [5, 'Rating cannot be above 5'],
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: [0, 'Review count cannot be negative'],
    },

    amenities: { type: [String], default: [] },
    guestFavourite: { type: Boolean, default: false },

    maxGuests: { type: Number, default: 1, min: [1, 'At least 1 guest is required'] },
    bedrooms: { type: Number, default: 1, min: [0, 'Bedrooms cannot be negative'] },
    beds: { type: Number, default: 1, min: [0, 'Beds cannot be negative'] },
    bathrooms: { type: Number, default: 1, min: [0, 'Bathrooms cannot be negative'] },

    // Kept simple on purpose: a full Host/User model belongs to a teammate's module
    host: {
      name: { type: String, trim: true },
      image: { type: String, trim: true },
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// Indexes: speed up the homepage filters and stop exact duplicate listings
listingSchema.index({ category: 1 });
listingSchema.index({ pricePerNight: 1 });
listingSchema.index({ title: 1, location: 1 }, { unique: true });

const Listing = mongoose.model('Listing', listingSchema);
Listing.CATEGORIES = CATEGORIES;

module.exports = Listing;

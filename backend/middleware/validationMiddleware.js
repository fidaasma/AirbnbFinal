const { body, query, validationResult } = require('express-validator');
const { sendError } = require('../utils/apiResponse');
const Listing = require('../models/Listing');

/** Runs after the rule arrays below. Returns 400 with a list of field errors. */
const validate = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = result
    .array({ onlyFirstError: true })
    .map((err) => ({ field: err.path, message: err.msg }));

  return sendError(res, 400, 'Validation failed', errors);
};

/** Rejects malformed MongoDB ObjectIds before touching the database. */
const validateObjectId = (req, res, next) => {
  if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
    return sendError(res, 400, 'Invalid listing ID');
  }
  return next();
};

// On create a field is required; on update every field is optional
const field = (name, isUpdate) => (isUpdate ? body(name).optional() : body(name));

/** Rules for POST (isUpdate = false) and PUT (isUpdate = true) */
const listingBodyRules = (isUpdate = false) => [
  field('title', isUpdate)
    .trim()
    .notEmpty().withMessage('Title is required').bail()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),

  field('description', isUpdate)
    .trim()
    .notEmpty().withMessage('Description is required').bail()
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),

  field('location', isUpdate)
    .trim()
    .notEmpty().withMessage('Location is required'),

  body('city').optional().isString().withMessage('City must be text').trim(),
  body('country').optional().isString().withMessage('Country must be text').trim(),

  field('pricePerNight', isUpdate)
    .notEmpty().withMessage('Price per night is required').bail()
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
    .toFloat(),

  field('category', isUpdate)
    .trim()
    .notEmpty().withMessage('Category is required').bail()
    .isIn(Listing.CATEGORIES)
    .withMessage(`Category must be one of: ${Listing.CATEGORIES.join(', ')}`),

  field('images', isUpdate)
    .isArray({ min: 1 }).withMessage('Images must be an array with at least one image'),
  body('images.*')
    .isString().withMessage('Each image must be a string')
    .trim()
    .notEmpty().withMessage('Image values cannot be empty'),

  body('rating').optional().isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be a number between 0 and 5').toFloat(),
  body('reviewCount').optional().isInt({ min: 0 })
    .withMessage('Review count must be a whole number of 0 or more').toInt(),

  body('amenities').optional().isArray().withMessage('Amenities must be an array'),
  body('amenities.*').isString().withMessage('Each amenity must be a string'),

  body('guestFavourite').optional().isBoolean()
    .withMessage('guestFavourite must be true or false').toBoolean(),

  body('maxGuests').optional().isInt({ min: 1 })
    .withMessage('maxGuests must be a whole number of 1 or more').toInt(),
  body('bedrooms').optional().isInt({ min: 0 })
    .withMessage('bedrooms must be a whole number of 0 or more').toInt(),
  body('beds').optional().isInt({ min: 0 })
    .withMessage('beds must be a whole number of 0 or more').toInt(),
  body('bathrooms').optional().isFloat({ min: 0 })
    .withMessage('bathrooms must be a number of 0 or more').toFloat(),

  body('host').optional().isObject().withMessage('host must be an object'),
  body('host.name').optional().isString().withMessage('host.name must be text').trim(),
  body('host.image').optional().isString().withMessage('host.image must be text').trim(),

  validate,
];

/** Rules for GET /api/listings query parameters */
const listingQueryRules = [
  query('category').optional().isString().trim().isLength({ max: 50 })
    .withMessage('category must be text (max 50 characters)'),
  query('location').optional().isString().trim().isLength({ max: 100 })
    .withMessage('location must be text (max 100 characters)'),
  query('search').optional().isString().trim().isLength({ max: 100 })
    .withMessage('search must be text (max 100 characters)'),
  query('minPrice').optional().isFloat({ min: 0 })
    .withMessage('minPrice must be a number of 0 or more'),
  query('maxPrice').optional().isFloat({ min: 0 })
    .withMessage('maxPrice must be a number of 0 or more').bail()
    .custom((maxPrice, { req }) => {
      const min = parseFloat(req.query.minPrice);
      if (!Number.isNaN(min) && min > parseFloat(maxPrice)) {
        throw new Error('minPrice cannot be greater than maxPrice');
      }
      return true;
    }),
  validate,
];

module.exports = { validate, validateObjectId, listingBodyRules, listingQueryRules };

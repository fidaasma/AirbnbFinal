const { sendError } = require('../utils/apiResponse');

/** Runs when no route matched -> 404 */
const notFound = (req, res) =>
  sendError(res, 404, `Route not found: ${req.method} ${req.originalUrl}`);

/**
 * Centralized error handler. Every error thrown/forwarded anywhere in the app
 * ends up here, so controllers never repeat error-formatting code.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  // Invalid ObjectId reached Mongoose (e.g. "abc" as an _id)
  if (err.name === 'CastError') {
    const message = err.path === '_id' ? 'Invalid listing ID' : `Invalid value for "${err.path}"`;
    return sendError(res, 400, message);
  }

  // Mongoose schema validation failed (safety net behind express-validator)
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
    return sendError(res, 400, 'Validation failed', errors);
  }

  // Unique index violated (same title + location already exists)
  if (err.code === 11000) {
    return sendError(res, 409, 'A listing with this title and location already exists');
  }

  // Malformed JSON in the request body
  if (err.type === 'entity.parse.failed') {
    return sendError(res, 400, 'Invalid JSON in request body');
  }

  // Database unreachable
  if (['MongoServerSelectionError', 'MongooseServerSelectionError', 'MongoNetworkError'].includes(err.name)) {
    return sendError(res, 503, 'Database is currently unavailable');
  }

  // Anything unexpected: log details on the server, keep the response generic
  console.error('[ERROR]', err);
  const body = { success: false, message: 'Internal server error' };
  if (process.env.NODE_ENV === 'development') body.stack = err.stack; // never in production
  return res.status(500).json(body);
};

module.exports = { notFound, errorHandler };

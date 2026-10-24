/**
 * Wraps an async controller so any thrown error / rejected promise is passed
 * to Express's error middleware. This removes the need for try/catch in
 * every controller function.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;

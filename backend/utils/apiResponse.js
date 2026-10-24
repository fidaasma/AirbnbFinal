/**
 * Reusable helpers so every response has the same shape.
 *   success: { success: true, ...body }
 *   failure: { success: false, message, errors? }
 */
const sendSuccess = (res, statusCode, body = {}) =>
  res.status(statusCode).json({ success: true, ...body });

const sendError = (res, statusCode, message, errors) => {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
};

module.exports = { sendSuccess, sendError };

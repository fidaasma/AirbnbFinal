# File-by-File Guide (for your evaluation)

**Request flow:** `Homepage fetch()` -> `server.js` (CORS, JSON, logger) -> `routes/listingRoutes.js` -> `middleware/validationMiddleware.js` -> `controllers/listingController.js` -> `models/Listing.js` (Mongoose) -> MongoDB -> JSON response via `utils/apiResponse.js`. Any error goes to `middleware/errorMiddleware.js`.

| File | What it does | One-line answer if asked "why?" |
|---|---|---|
| `server.js` | Loads `.env`, creates the Express app, adds CORS/JSON/morgan, registers `/api/health` and `/api/listings`, then 404 + error handlers, connects to MongoDB and starts listening. | Entry point only - no business logic. |
| `config/db.js` | Connects Mongoose using `MONGO_URI`; logs success/failure; exits if it cannot connect. | Keeps database setup in one place, no hardcoded credentials. |
| `models/Listing.js` | Mongoose schema: types, required fields, min/max, enum for categories, custom validators (price > 0, images not empty), timestamps, indexes (incl. unique title+location). | The database-level safety net: invalid data cannot be saved. |
| `controllers/listingController.js` | 5 small functions (get all, get one, create, update, delete) + `buildListingFilter` for search/category/price. Only whitelisted fields can be written. | Controllers hold logic so routes stay readable. |
| `routes/listingRoutes.js` | Maps method + URL to validation + controller. | Routing only. |
| `middleware/validationMiddleware.js` | express-validator rules for body and query, `validateObjectId`, and one `validate` function that formats errors as 400. | Bad input is stopped before it reaches the database. |
| `middleware/errorMiddleware.js` | `notFound` (404) and `errorHandler` (CastError 400, ValidationError 400, duplicate 409, bad JSON 400, DB down 503, everything else 500 without stack in production). | One place formats every error consistently. |
| `utils/apiResponse.js` | `sendSuccess` / `sendError` so all responses share one JSON shape. | Avoids duplicated response code. |
| `utils/asyncHandler.js` | Wraps async controllers and forwards errors to the error middleware. | Removes try/catch repetition (centralized async error handling). |
| `seed/seedListings.js` | Deletes old listings and inserts 15 sample ones (`npm run seed`). | Repeatable demo data without Compass. |
| `docs/frontend-integration.js` | Drop-in `fetch()` code with loading, error and empty states. | Only the data source of the Homepage changes. |
| `.env` / `.env.example` / `.gitignore` | Config values; example for teammates; keeps secrets out of Git. | Security + teamwork. |

## Likely viewer questions
- **Why two layers of validation?** express-validator gives friendly field-level 400 errors early; the Mongoose schema guarantees nothing invalid is stored even if someone bypasses the API.
- **Why validate the ID separately?** A malformed ObjectId would crash the query with a CastError; we return a clean 400 first (400 = bad ID, 404 = valid ID but not found).
- **Why escape the search text?** So characters like `.` or `(` typed by a user are treated as text, not regex.
- **Why `.lean()` on GET?** Returns plain objects - faster for read-only lists.
- **How would a teammate add Bookings?** Add `models/Booking.js`, `controllers/bookingController.js`, `routes/bookingRoutes.js` and one `app.use('/api/bookings', ...)` line in `server.js`.

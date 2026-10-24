# Airbnb Clone Backend

## Overview
REST API that powers the **Homepage** module of our Airbnb-inspired full-stack academic project. It stores property listings in MongoDB and serves them to the Homepage with search, category and price filtering. It is modular so teammates can add other modules (bookings, experiences, auth...) later.

## Features
- Full CRUD for listings
- Case-insensitive destination search (title, location, city, country)
- Category and price-range filtering handled on the server
- Request validation (express-validator) plus schema validation (Mongoose)
- Centralized error handling with consistent JSON and correct HTTP status codes
- Health-check endpoint, request logging, configurable CORS
- One-command seed script with 15 sample listings

## Tech Stack
Node.js, Express 4, MongoDB, Mongoose 8, express-validator, dotenv, cors, morgan, nodemon (dev).

## Project Structure
```
backend/
├── server.js                      # app entry point
├── package.json
├── .env / .env.example / .gitignore
├── config/db.js                   # MongoDB connection
├── models/Listing.js              # Mongoose schema
├── controllers/listingController.js
├── routes/listingRoutes.js
├── middleware/
│   ├── errorMiddleware.js         # 404 + centralized error handler
│   └── validationMiddleware.js    # express-validator rules
├── utils/
│   ├── apiResponse.js             # sendSuccess / sendError
│   └── asyncHandler.js            # async error forwarding
├── seed/seedListings.js           # sample data
└── docs/                          # FILE_GUIDE.md, TESTING.md, frontend-integration.js
```

## Installation
```bash
cd backend
npm install
cp .env.example .env     # then edit MONGO_URI if needed
```

## Environment Variables
| Variable | Required | Example | Purpose |
|---|---|---|---|
| `PORT` | no (default 5000) | `5000` | Port the API listens on |
| `MONGO_URI` | **yes** | `mongodb://127.0.0.1:27017/airbnb_clone` | MongoDB connection string |
| `NODE_ENV` | no | `development` | In `development`, 500 responses include the stack trace; never in production |
| `CORS_ORIGIN` | no (default `*`) | `http://localhost:5500` | Allowed frontend origin(s), comma-separated |

`.env` is listed in `.gitignore` - never commit real credentials.

## MongoDB Setup
**Option A - Local:** install MongoDB Community Server (and optionally Compass), make sure the service is running, and use `MONGO_URI=mongodb://127.0.0.1:27017/airbnb_clone`. The database and collection are created automatically.

**Option B - Atlas (cloud):** create a free cluster, add a database user, allow your IP under *Network Access*, click *Connect -> Drivers*, copy the URI, replace `<password>`, add the DB name (e.g. `.../airbnb_clone?retryWrites=true&w=majority`) and paste it into `.env`.

## Running the Server
```bash
npm run seed   # fill the database with sample listings (safe to re-run; clears old listings)
npm run dev    # development with auto-restart (nodemon)
npm start      # production
```
Expected log: `[DB] MongoDB connected: ...` then `[SERVER] Running on http://localhost:5000`.

## API Endpoints
Base URL: `http://localhost:5000`. All responses are JSON.

### GET /api/health
Purpose: check the API is up. Success **200**: `{ "success": true, "message": "API is running" }`

### GET /api/listings
Purpose: return listings, optionally filtered (used by the Homepage grid, search bar and category bar).

| Query param | Type | Description |
|---|---|---|
| `category` | text | Exact category, case-insensitive. `All` or omitted = no filter |
| `location` | text | Partial, case-insensitive match on location, city or country |
| `search` | text | Partial, case-insensitive match on title, location, city or country |
| `minPrice` | number >= 0 | Minimum price per night |
| `maxPrice` | number >= 0 | Maximum price per night (must be >= `minPrice`) |

Filters can be combined. Success **200**:
```json
{ "success": true, "count": 2, "data": [ { "_id": "...", "title": "Oceanfront Villa", "...": "..." } ] }
```
Errors: **400** `Validation failed` (e.g. negative price, `minPrice > maxPrice`); **503** database unavailable.

### GET /api/listings/:id
Purpose: return one listing (Homepage card click -> detail page). Success **200**: `{ "success": true, "data": { ... } }`
Errors: **400** `Invalid listing ID`; **404** `Listing not found`.

### POST /api/listings
Purpose: create a listing. Body (JSON):
```json
{
  "title": "Oceanfront Villa", "description": "Beautiful villa near the beach",
  "location": "Goa, India", "pricePerNight": 8500, "category": "Beachfront",
  "images": ["image1.jpg", "image2.jpg"], "rating": 4.8, "reviewCount": 120, "guestFavourite": true
}
```
Required: `title`, `description`, `location`, `pricePerNight`, `category`, `images` (at least one). Others optional.
Success **201**: `{ "success": true, "message": "Listing created successfully", "data": { ... } }`
Errors: **400** `Validation failed` with `errors: [{ field, message }]` or `Invalid JSON in request body`; **409** duplicate title + location.

### PUT /api/listings/:id
Purpose: update an existing listing. Send any subset of the fields above (partial update); each sent field is validated.
Success **200**: `{ "success": true, "message": "Listing updated successfully", "data": { ...updated } }`
Errors: **400** invalid ID / invalid input / empty body; **404** `Listing not found`; **409** duplicate.

### DELETE /api/listings/:id
Purpose: delete a listing. Success **200**: `{ "success": true, "message": "Listing deleted successfully" }`
Errors: **400** `Invalid listing ID`; **404** `Listing not found`.

### Any unknown URL
**404** `{ "success": false, "message": "Route not found: GET /api/xyz" }`

## Database Schema
Collection `listings` (Mongoose model `Listing`, timestamps enabled):

| Field | Type | Rules |
|---|---|---|
| `title` | String | required, trimmed, 3-100 chars |
| `description` | String | required, trimmed, min 10 chars |
| `location` | String | required, trimmed |
| `city`, `country` | String | optional |
| `pricePerNight` | Number | required, > 0 |
| `category` | String | required, one of: Beachfront, Cabins, Trending, Countryside, Amazing Views, Pools, Lakefront, Mountains, Luxe, Tiny Homes |
| `images` | [String] | at least one non-empty string |
| `rating` | Number | 0-5, default 0 |
| `reviewCount` | Number | >= 0, default 0 |
| `amenities` | [String] | default `[]` |
| `guestFavourite` | Boolean | default false |
| `maxGuests` | Number | >= 1, default 1 |
| `bedrooms`, `beds`, `bathrooms` | Number | >= 0, default 1 |
| `host` | `{ name, image }` | optional (kept simple; a full User/Host model can come from another module) |
| `createdAt`, `updatedAt` | Date | automatic |

Indexes: `category`, `pricePerNight`, and a **unique** compound index on `title + location` (prevents duplicate listings).

## CRUD Operations
| Operation | Route | Mongoose method |
|---|---|---|
| Create | `POST /api/listings` | `Listing.create()` |
| Read (all) | `GET /api/listings` | `Listing.find(filter)` |
| Read (one) | `GET /api/listings/:id` | `Listing.findById()` |
| Update | `PUT /api/listings/:id` | `Listing.findByIdAndUpdate(..., { new: true, runValidators: true })` |
| Delete | `DELETE /api/listings/:id` | `Listing.findByIdAndDelete()` |

## Validation
1. **express-validator** (`middleware/validationMiddleware.js`) checks body and query parameters and returns **400** with `[{ field, message }]`.
2. **Mongoose schema** re-checks everything before saving, so invalid data cannot reach MongoDB.
3. Only whitelisted fields are accepted from the request body.

```json
{ "success": false, "message": "Validation failed", "errors": [ { "field": "pricePerNight", "message": "Price must be greater than 0" } ] }
```

## Error Handling
All errors flow to `middleware/errorMiddleware.js`:

| Situation | Status |
|---|---|
| Invalid ObjectId / malformed JSON / validation failure | 400 |
| Unknown route or listing not found | 404 |
| Duplicate title + location | 409 |
| Database unreachable | 503 |
| Anything unexpected | 500 `Internal server error` (stack trace only when `NODE_ENV=development`) |

## Connecting Frontend
The Homepage keeps its HTML, CSS, cards, carousel, wishlist and category/search UI. Only the data source changes:
```
MongoDB -> Mongoose -> controller -> route -> REST API -> fetch() -> Homepage -> listing cards
```
See `docs/frontend-integration.js`: it replaces `const LISTINGS = [...]` with `fetch("http://localhost:5000/api/listings")`, and adds the loading state (`Loading stays...`), error state (`Unable to load listings. Please try again.`) and empty state (`No stays found`). Note: listings now have a string `_id` instead of a numeric id, so wishlist and click navigation should use it (e.g. `listing.html?id=<_id>`).

## Seed Data
`npm run seed` clears the `listings` collection and inserts 15 realistic listings across all homepage categories, each with 4 images (placeholder photos - replace with your own URLs any time).

## Team Contributions
| Member | Module | Contribution |
|---|---|---|
| *(your name)* | Homepage | Listing model, CRUD API, search/category/price filters, validation, error handling, seed data, API documentation, Homepage integration |
| *(teammate)* | *(module)* | *(fill in)* |

## Future Improvements
- Server-side wishlist tied to user accounts (currently client-side)
- Authentication and host-only create/update/delete
- Pagination and sorting (price, rating)
- Separate Host, Review and Booking models
- Automated tests (Jest + Supertest)
- Image upload instead of URL strings

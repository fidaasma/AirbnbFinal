# Testing with Postman / Thunder Client

Base URL: `http://localhost:5000`. For POST/PUT set header `Content-Type: application/json` and Body -> raw -> JSON.
Run `npm run seed` first, then copy any listing `_id` from "Get all listings" to use as `:id` below.

| # | Test | Request | Expected status | Expected result |
|---|---|---|---|---|
| 1 | Server health | `GET /api/health` | **200** | `{"success":true,"message":"API is running"}` |
| 2 | Get all listings | `GET /api/listings` | **200** | `success:true`, `count:15`, `data:[...]` |
| 3 | Get one listing | `GET /api/listings/<valid id>` | **200** | Single listing in `data` |
| 4 | Create listing | `POST /api/listings` body below | **201** | `Listing created successfully` + new document |
| 5 | Update listing | `PUT /api/listings/<id>` body `{"pricePerNight": 9000, "rating": 4.9}` | **200** | Updated document (only sent fields change) |
| 6 | Delete listing | `DELETE /api/listings/<id>` | **200** | `Listing deleted successfully` |
| 7 | Search (case-insensitive) | `GET /api/listings?search=goa` (also `GOA`, `Goa`) | **200** | Only Goa listings |
| 8 | Category filter | `GET /api/listings?category=Beachfront` | **200** | Only Beachfront listings |
| 9 | Category "All" | `GET /api/listings?category=All` | **200** | All listings |
| 10 | Price filter | `GET /api/listings?minPrice=2000&maxPrice=6000` | **200** | Only listings priced 2000-6000 |
| 11 | Combined filters | `GET /api/listings?category=Cabins&maxPrice=5000&search=munnar` | **200** | Cedar Cabin in the Tea Hills |
| 12 | No matches | `GET /api/listings?search=zzzz` | **200** | `count:0`, `data:[]` (frontend shows "No stays found") |
| 13 | Invalid price range | `GET /api/listings?minPrice=5000&maxPrice=1000` | **400** | `Validation failed` + `minPrice cannot be greater than maxPrice` |
| 14 | Negative price | `GET /api/listings?minPrice=-5` | **400** | `Validation failed` |
| 15 | Invalid ID | `GET /api/listings/abc` (also PUT/DELETE) | **400** | `Invalid listing ID` |
| 16 | Listing not found | `GET /api/listings/64b7f0f2a1b2c3d4e5f60718` (valid format, not in DB) | **404** | `Listing not found` |
| 17 | Update not found | `PUT /api/listings/64b7f0f2a1b2c3d4e5f60718` body `{"rating":4}` | **404** | `Listing not found` |
| 18 | Delete not found | `DELETE /api/listings/64b7f0f2a1b2c3d4e5f60718` | **404** | `Listing not found` |
| 19 | Missing required fields | `POST /api/listings` body `{}` | **400** | `Validation failed` + one error per missing field |
| 20 | Invalid values | `POST` with `"pricePerNight": -5, "rating": 9, "category": "Spaceship"` | **400** | Field errors for price, rating, category |
| 21 | Empty update body | `PUT /api/listings/<id>` body `{}` | **400** | `No valid fields provided to update` |
| 22 | Duplicate listing | `POST` the same title + location twice | **409** | `A listing with this title and location already exists` |
| 23 | Malformed JSON | `POST` body `{bad` | **400** | `Invalid JSON in request body` |
| 24 | Unknown route | `GET /api/xyz` | **404** | `Route not found: GET /api/xyz` |

## Body for test 4 (Create)
```json
{
  "title": "Oceanfront Villa Deluxe",
  "description": "Beautiful villa near the beach",
  "location": "Goa, India",
  "city": "Goa",
  "country": "India",
  "pricePerNight": 8500,
  "category": "Beachfront",
  "images": ["image1.jpg", "image2.jpg"],
  "rating": 4.8,
  "reviewCount": 120,
  "guestFavourite": true
}
```
(Use a title that is not already seeded; `Oceanfront Villa` + `Candolim, Goa, India` exists, but a different title/location pair is fine.)

const express = require("express");
console.log("=== THIS BOOKING ROUTES FILE IS LOADED ===");
const router = express.Router();
console.log("BOOKING ROUTES LOADED");

const {
    createServiceBooking,
    getServiceBooking,
    cancelServiceBooking
} = require("../controllers/BookingController");

router.get("/test", (req, res) => {
    console.log("=== TEST ROUTE HIT ===");
    res.json({ message: "Booking routes are working" });
});

// Service bookings
router.post("/service", createServiceBooking);
router.get("/service/:id", getServiceBooking);
router.put("/service/:id/cancel", cancelServiceBooking);


// Experience bookings - later
// router.post("/experience", createExperienceBooking);
// router.get("/experience/:id", getExperienceBooking);
// router.put("/experience/:id/cancel", cancelExperienceBooking);


// Hotel bookings - later
// router.post("/hotel", createHotelBooking);
// router.get("/hotel/:id", getHotelBooking);
// router.put("/hotel/:id/cancel", cancelHotelBooking);


module.exports = router;
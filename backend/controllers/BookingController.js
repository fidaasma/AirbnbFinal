const mongoose = require("mongoose");
const Service = require("../models/Service");
const ServiceBooking = require("../models/ServiceBooking");


// ==========================================================
// SERVICE BOOKINGS
// ==========================================================

// Create a service booking
const createServiceBooking = async (req, res) => {
    try {
        const {
            service,
            guestName,
            guestEmail,
            date,
            time,
            guests
        } = req.body;

        // Validate service ID
        if (!mongoose.Types.ObjectId.isValid(service)) {
            return res.status(400).json({
                message: "Invalid service ID"
            });
        }

        // Check service exists
        const serviceData = await Service.findById(service);

        if (!serviceData) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        // Validate guests
        if (!guests || guests < 1) {
            return res.status(400).json({
                message: "Number of guests must be at least 1"
            });
        }

        // Calculate price
        let totalPrice;

        if (serviceData.unit === "guest") {
            totalPrice = serviceData.price * guests;
        } else {
            totalPrice = serviceData.price;
        }

        // Create booking
        const booking = await ServiceBooking.create({
            service,
            guestName,
            guestEmail,
            date,
            time,
            guests,
            totalPrice
        });

        res.status(201).json({
            message: "Service booked successfully",
            booking
        });

    } catch (error) {
        console.error("Failed to create service booking:", error);

        res.status(500).json({
            message: "Failed to create service booking",
            error: error.message
        });
    }
};


// Get service booking by ID
const getServiceBooking = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid booking ID"
            });
        }

        const booking = await ServiceBooking
            .findById(id)
            .populate("service");

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json(booking);

    } catch (error) {
        console.error("Failed to fetch service booking:", error);

        res.status(500).json({
            message: "Failed to fetch service booking",
            error: error.message
        });
    }
};


// Cancel service booking
const cancelServiceBooking = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid booking ID"
            });
        }

        const booking = await ServiceBooking.findById(id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Booking is already cancelled"
            });
        }

        booking.status = "cancelled";

        await booking.save();

        res.status(200).json({
            message: "Service booking cancelled successfully",
            booking
        });

    } catch (error) {
        console.error("Failed to cancel service booking:", error);

        res.status(500).json({
            message: "Failed to cancel service booking",
            error: error.message
        });
    }
};


// ==========================================================
// EXPERIENCE BOOKINGS - ADD LATER
// ==========================================================

// createExperienceBooking()
// getExperienceBooking()
// cancelExperienceBooking()


// ==========================================================
// HOTEL BOOKINGS - ADD LATER
// ==========================================================

// createHotelBooking()
// getHotelBooking()
// cancelHotelBooking()


module.exports = {
    createServiceBooking,
    getServiceBooking,
    cancelServiceBooking
};
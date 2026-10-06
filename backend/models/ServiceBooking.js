const mongoose = require("mongoose");

const serviceBookingSchema = new mongoose.Schema(
    {
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true
        },

        guestName: {
            type: String,
            required: true,
            trim: true
        },

        guestEmail: {
            type: String,
            required: true,
            trim: true
        },

        date: {
            type: Date,
            required: true
        },

        time: {
            type: String,
            required: true
        },

        guests: {
            type: Number,
            required: true,
            min: 1
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: ["confirmed", "cancelled"],
            default: "confirmed"
        }
    },
    {
        timestamps: true
    }
);

const ServiceBooking = mongoose.model(
    "ServiceBooking",
    serviceBookingSchema
);

module.exports = ServiceBooking;
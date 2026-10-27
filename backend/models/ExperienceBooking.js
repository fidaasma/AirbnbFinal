
const mongoose = require("mongoose");

const experienceBookingSchema = new mongoose.Schema(
    {
        experience: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experience",
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
            type: String,
            required: true
        },
        guests: {
            type: Number,
            required: true,
            min: 1,
            max: 10
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
    { timestamps: true }
);

module.exports = mongoose.model(
    "ExperienceBooking",
    experienceBookingSchema
);

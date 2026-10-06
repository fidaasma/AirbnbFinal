const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        experience: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experience",
            required: true,
            index: true
        },
        name: { type: String, required: true, trim: true, maxlength: 60 },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true, trim: true, maxlength: 800 }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        listings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Listing"
            }
        ],

        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service"
            }
        ],

        experiences: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Experience"
            }
        ]
    },
    {
        timestamps: true
    }
);

// Each user has one wishlist.
wishlistSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);


const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
    {
        // Basic information
        title: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            default: "",
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        rating: {
            type: Number,
            default: null,
            min: 0,
            max: 5
        },

        photo: {
            type: String,
            required: true
        },

        category: {
            type: String,
            default: ""
        },

        badge: {
            type: String,
            default: ""
        },

        // Rail information
        isOriginal: {
            type: Boolean,
            default: false
        },

        railKey: {
            type: String,
            required: true
        },

        railTitle: {
            type: String,
            required: true
        },

        railSubtitle: {
            type: String,
            default: ""
        },

        // Details page information
        description: {
            type: String,
            default: ""
        },

        duration: {
            type: String,
            default: ""
        },

        language: {
            type: String,
            default: "English"
        },

        // Host information
        host: {
            name: {
                type: String,
                default: ""
            },

            description: {
                type: String,
                default: ""
            },

            photo: {
                type: String,
                default: ""
            }
        },

        // Things included in the experience
        activities: {
            type: [String],
            default: []
        },

        // Additional images
        gallery: {
            type: [String],
            default: []
        },

        // Location information
        address: {
            type: String,
            default: ""
        },

        latitude: {
    type: Number,
    default: null
},

longitude: {
    type: Number,
    default: null
},

        // Future availability
        availableDates: {
            type: [String],
            default: []
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Experience", experienceSchema);
const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    { _id: false }
);

const hostSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    },
    { _id: false }
);

const cancellationPolicySchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    { _id: false }
);

const serviceAreaSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    { _id: false }
);

const thingsToKnowSchema = new mongoose.Schema(
    {
        guestRequirements: {
            type: String
        },
        accessibility: {
            type: String
        },
        cancellationPolicy: {
            type: String
        }
    },
    { _id: false }
);

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        serviceType: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        unit: {
            type: String,
            required: true,
            enum: ["guest", "group"]
        },

        duration: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        images: {
            type: [String],
            required: true
        },

        rating: {
            type: Number,
            default: 0
        },

        reviewCount: {
            type: Number,
            default: 0
        },

        description: {
            type: String,
            required: true
        },

        providedAt: {
            type: String,
            required: true
        },

        host: {
            type: hostSchema,
            required: true
        },

        cancellationPolicy: {
            type: cancellationPolicySchema,
            required: true
        },

        guestRequirements: {
            type: String,
            required: true
        },

        accessibility: {
            type: String,
            required: true
        },

        qualifications: {
            type: [qualificationSchema],
            required: true
        },

        portfolio: {
            type: [String],
            required: true
        },

        serviceArea: {
            type: serviceAreaSchema,
            required: true
        },

        thingsToKnow: {
            type: thingsToKnowSchema,
            required: true
        },

        highlight: {
            type: Boolean,
            default: false
        },

        isPopular: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
const mongoose = require("mongoose");

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

    rating: {
      type: Number,
      default: 0
    },

    minimum: {
      type: String
    },

    highlight: {
      type: Boolean,
      default: false
    },

    isPopular: {
      type: Boolean,
      default: false
    },

    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
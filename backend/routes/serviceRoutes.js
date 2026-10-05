const express = require("express");
const router = express.Router();

const {
    getServices,
    getServiceFilters,
    searchServices,
    getServiceById
} = require("../controllers/serviceController");


// Get filter options
router.get("/filters", getServiceFilters);

// Search services
router.get("/search", searchServices);

// Get all services
router.get("/", getServices);

// Get one service by ID
router.get("/:id", getServiceById);

module.exports = router;
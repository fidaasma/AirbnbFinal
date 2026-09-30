const express = require("express");
const router = express.Router();

const {
    getServices,
    getServiceFilters
} = require("../controllers/serviceController");


// Get filter options
router.get("/filters", getServiceFilters);


// Get all services
router.get("/", getServices);


module.exports = router;
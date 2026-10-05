const mongoose = require("mongoose");
const Service = require("../models/Service");


// Get all services
const getServices = async (req, res) => {
    try {
        const services = await Service.find();

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch services",
            error: error.message
        });
    }
};


// Get unique locations and service types
const getServiceFilters = async (req, res) => {
    try {
        const locations = await Service.distinct("location");
        const serviceTypes = await Service.distinct("serviceType");

        locations.sort();
        serviceTypes.sort();

        res.status(200).json({
            locations,
            serviceTypes
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch service filters",
            error: error.message
        });
    }
};


// Search services using selected filters
const searchServices = async (req, res) => {
    try {
        const {
            location,
            serviceType
        } = req.query;

        const filter = {};

        // Location selected
        if (location) {
            filter.location = {
                $regex: `^${location}$`,
                $options: "i"
            };
        }

        // Service type selected
        if (serviceType) {
            filter.serviceType = {
                $regex: `^${serviceType}$`,
                $options: "i"
            };
        }

        const services = await Service.find(filter);

        res.status(200).json(services);

    } catch (error) {
        res.status(500).json({
            message: "Failed to search services",
            error: error.message
        });
    }
};


// Get one service by ID
const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check whether the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid service ID"
            });
        }

        const service = await Service.findById(id);

        // Service doesn't exist
        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        // Send the complete service document
        res.status(200).json(service);

    } catch (error) {
        console.error("Failed to fetch service:", error);

        res.status(500).json({
            message: "Failed to fetch service",
            error: error.message
        });
    }
};


module.exports = {
    getServices,
    getServiceFilters,
    searchServices,
    getServiceById
};
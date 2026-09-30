const Service = require("../models/Service");

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


module.exports = {
    getServices,
    getServiceFilters
};
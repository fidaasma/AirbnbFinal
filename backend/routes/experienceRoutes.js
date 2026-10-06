const express = require("express");
const mongoose = require("mongoose");
const Experience = require("../models/Experience");

const router = express.Router();


// =====================================================
// 1. GET ALL EXPERIENCES
// GET /api/experiences
// =====================================================

router.get("/", async (req, res) => {
    try {
        const experiences = await Experience.find();

        res.status(200).json(experiences);

    } catch (error) {
        console.error("Error fetching experiences:", error);

        res.status(500).json({
            message: "Failed to fetch experiences"
        });
    }
});


// =====================================================
// 2. GET ONE EXPERIENCE
// GET /api/experiences/:id
// =====================================================

router.get("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        // Check whether the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid experience ID"
            });
        }

        const experience = await Experience.findById(id);

        // Experience doesn't exist
        if (!experience) {
            return res.status(404).json({
                message: "Experience not found"
            });
        }

        res.status(200).json(experience);

    } catch (error) {

        console.error("Error fetching experience:", error);

        res.status(500).json({
            message: "Failed to fetch experience"
        });
    }
});


// =====================================================
// 3. CREATE EXPERIENCE
// POST /api/experiences
// =====================================================

router.post("/", async (req, res) => {
    try {

        const experience = new Experience(req.body);

        const savedExperience = await experience.save();

        res.status(201).json({
            message: "Experience created successfully",
            experience: savedExperience
        });

    } catch (error) {

        console.error("Error creating experience:", error);

        res.status(400).json({
            message: "Failed to create experience",
            error: error.message
        });
    }
});


// =====================================================
// 4. UPDATE EXPERIENCE
// PUT /api/experiences/:id
// =====================================================

router.put("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid experience ID"
            });
        }

        const updatedExperience = await Experience.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedExperience) {
            return res.status(404).json({
                message: "Experience not found"
            });
        }

        res.status(200).json({
            message: "Experience updated successfully",
            experience: updatedExperience
        });

    } catch (error) {

        console.error("Error updating experience:", error);

        res.status(400).json({
            message: "Failed to update experience",
            error: error.message
        });
    }
});


// =====================================================
// 5. DELETE EXPERIENCE
// DELETE /api/experiences/:id
// =====================================================

router.delete("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid experience ID"
            });
        }

        const deletedExperience = await Experience.findByIdAndDelete(id);

        if (!deletedExperience) {
            return res.status(404).json({
                message: "Experience not found"
            });
        }

        res.status(200).json({
            message: "Experience deleted successfully",
            experience: deletedExperience
        });

    } catch (error) {

        console.error("Error deleting experience:", error);

        res.status(500).json({
            message: "Failed to delete experience"
        });
    }
});


module.exports = router;
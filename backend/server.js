const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const experienceRoutes = require("./routes/experienceRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/experiences", experienceRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Airbnb Backend is running");
});

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:");
        console.error(error);
    });

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
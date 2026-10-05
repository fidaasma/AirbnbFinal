require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const experienceRoutes = require("./routes/experienceRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.json({
        message: "Airbnb backend is running successfully!"
    });
});

// ==========================================
// AUTH ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

// ==========================================
// EXPERIENCE ROUTES
// ==========================================

app.use("/api/experiences", experienceRoutes);

// ==========================================
// SERVICE ROUTES
// ==========================================

app.use("/api/services", serviceRoutes);

// ==========================================
// MONGODB CONNECTION & SERVER START
// ==========================================

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error(
        "Fatal Error: MONGODB_URI is not defined in the environment variables."
    );
    process.exit(1);
}

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error(
            "MongoDB connection failed:",
            error.message
        );
        process.exit(1);
    });
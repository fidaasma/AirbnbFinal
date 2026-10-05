require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/services", serviceRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(5000, () => {
            console.log("Server running on http://localhost:5000");
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
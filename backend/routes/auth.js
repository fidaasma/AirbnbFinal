const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const User = require("../models/User");
const Otp = require("../models/Otp"); // Import the new OTP model
const router = express.Router();

console.log("🔥 AUTH ROUTES FILE LOADED 🔥");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function generateOTP() {
    return crypto.randomInt(100000, 1000000).toString();
}

function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeContact(value) {
    return value.trim().toLowerCase();
}


router.post("/send-otp", async (req, res) => {
    try {
        console.log("🔥 AUTH ROUTES FILE LOA2DED 🔥");
        const { contact } = req.body;
        if (!contact) return res.status(400).json({ success: false, message: "Email address is required." });

        const normalizedContact = normalizeContact(contact);
        if (!isEmail(normalizedContact)) return res.status(400).json({ success: false, message: "Please enter a valid email." });
        console.log("[OTP] 1. Route reached");
        const otp = generateOTP();
        console.log("[OTP] 2. OTP generated");
        // Delete any existing OTP for this email, then save the new one to MongoDB
        await Otp.findOneAndDelete({ email: normalizedContact });
        console.log("[OTP] 3. Existing OTP deleted");
        await Otp.create({ email: normalizedContact, otp: otp });
        console.log("[OTP] 4. OTP saved to MongoDB");
        await transporter.sendMail({
            from: `"Airbnb Clone" <${process.env.EMAIL_USER}>`,
            to: normalizedContact,
            subject: "Your Airbnb verification code",
            text: `Your code is ${otp}. It expires in 5 minutes.`,
            html: `<div style="padding: 20px; text-align: center; font-size: 24px; font-weight: bold;">${otp}</div>`
        });
        console.log("[OTP] 5. Email sent successfully");

        res.json({ success: true, message: "OTP sent successfully." });
    } catch (error) {
        console.error("🚨 CRITICAL SEND OTP ERROR:", error);
        console.error("Send OTP error:", error);
        res.status(500).json({ success: false, message: "Unable to send OTP." });
    }
});

router.post("/verify-otp", async (req, res) => {
    try {
        const { contact, otp, name } = req.body;
        if (!contact || !otp) return res.status(400).json({ success: false, message: "Email and OTP are required." });

        const normalizedContact = normalizeContact(contact);
        
        // Look up the OTP in MongoDB
        const storedData = await Otp.findOne({ email: normalizedContact });

        if (!storedData) {
            return res.status(400).json({ success: false, message: "OTP not found or expired. Please request a new OTP." });
        }

        if (otp.toString() !== storedData.otp) {
            storedData.attempts += 1;
            await storedData.save();

            if (storedData.attempts >= 5) {
                await Otp.deleteOne({ email: normalizedContact });
                return res.status(400).json({ success: false, message: "Too many incorrect attempts. Please request a new OTP." });
            }
            return res.status(400).json({ success: false, message: "Incorrect OTP. Please try again." });
        }

        // OTP is correct; delete it from database
        await Otp.deleteOne({ email: normalizedContact });

        let user = await User.findOne({ email: normalizedContact });
        if (!user) {
            user = await User.create({ email: normalizedContact, name: name || normalizedContact.split("@")[0] });
        } else if (name && !user.name) {
            user.name = name;
            await user.save();
        }

        return res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name || "",
                email: user.email,
                phone: user.phone || "",
                profileImage: user.profileImage || ""
            }
        });
    } catch (error) {
        console.error("Verify OTP error:", error);
        return res.status(500).json({ success: false, message: "Authentication failed." });
    }
});

module.exports = router;
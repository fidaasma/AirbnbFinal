const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

// Temporary OTP storage
const otpStore = new Map();

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Generate a secure 6-digit OTP
function generateOTP() {
    return crypto.randomInt(100000, 1000000).toString();
}

// Check whether input is an email
function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Normalize contact
function normalizeContact(value) {
    return value.trim().toLowerCase();
}


// ==========================================
// SEND OTP
// ==========================================
router.post("/send-otp", async (req, res) => {
    try {
        const { contact } = req.body;

        if (!contact) {
            return res.status(400).json({
                success: false,
                message: "Email address is required."
            });
        }

        const normalizedContact = normalizeContact(contact);

        if (!isEmail(normalizedContact)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        const otp = generateOTP();
        const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiration

        otpStore.set(normalizedContact, {
            otp: otp,
            expiresAt: expiresAt,
            attempts: 0
        });

        // Send OTP through email
        await transporter.sendMail({
            from: `"Airbnb Clone" <${process.env.EMAIL_USER}>`,
            to: normalizedContact,
            subject: "Your Airbnb verification code",
            text: `Your Airbnb verification code is ${otp}. This code will expire in 5 minutes.`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #FF385C;">Airbnb Verification Code</h2>
                    <p>Use the following code to complete your sign-in:</p>
                    <div style="
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 8px;
                        padding: 20px;
                        background: #f7f7f7;
                        text-align: center;
                        border-radius: 10px;
                        color: #222222;
                    ">
                        ${otp}
                    </div>
                    <p style="margin-top: 20px;">This code will expire in <strong>5 minutes</strong>.</p>
                    <p style="color: #717171; font-size: 12px;">If you did not request this code, you can safely ignore this email.</p>
                </div>
            `
        });

        console.log(`OTP sent successfully to ${normalizedContact}`);

        res.json({
            success: true,
            message: "OTP sent successfully to your email."
        });

    } catch (error) {
        console.error("Send OTP error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to send OTP. Check your email configuration."
        });
    }
});


// ==========================================
// VERIFY OTP & LOGIN / SIGNUP
// ==========================================
router.post("/verify-otp", async (req, res) => {
    try {
        const { contact, otp, name } = req.body;

        if (!contact || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required."
            });
        }

        const normalizedContact = normalizeContact(contact);
        const storedData = otpStore.get(normalizedContact);

        if (!storedData) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired. Please request a new OTP."
            });
        }

        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(normalizedContact);
            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new OTP."
            });
        }

        if (otp.toString() !== storedData.otp) {
            storedData.attempts += 1;

            if (storedData.attempts >= 5) {
                otpStore.delete(normalizedContact);
                return res.status(400).json({
                    success: false,
                    message: "Too many incorrect attempts. Please request a new OTP."
                });
            }

            return res.status(400).json({
                success: false,
                message: "Incorrect OTP. Please try again."
            });
        }

        // Correct OTP -> Clear store entry
        otpStore.delete(normalizedContact);

        // Find or Create User in MongoDB
        let user = await User.findOne({ email: normalizedContact });

        if (!user) {
            user = await User.create({
                email: normalizedContact,
                name: name || normalizedContact.split("@")[0] // Fallback name from email prefix if name is missing
            });
        } else if (name && !user.name) {
            // Update name if it was missing and provided now
            user.name = name;
            await user.save();
        }

        console.log(`User authenticated successfully: ${normalizedContact}`);

        res.json({
            success: true,
            message: "Authentication successful.",
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
        res.status(500).json({
            success: false,
            message: "Authentication failed. Please try again."
        });
    }
});

module.exports = router;
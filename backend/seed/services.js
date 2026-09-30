
 const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Service = require("../models/Service");

dotenv.config();

const services = [
    {
        title: "Goa photo shoot by Samuel",
        location: "South Goa",
        serviceType: "Photography",
        price: 7500,
        unit: "guest",
        rating: 5.0,
        highlight: true,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
    },

    {
        title: "Romantic portraits and films by Sherwyn",
        location: "South Goa",
        serviceType: "Photography",
        price: 5000,
        unit: "guest",
        minimum: "Minimum ₹10,000 to book",
        rating: 5.0,
        isPopular: true,
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
    },

    {
        title: "Creative photography by Albin",
        location: "South Goa",
        serviceType: "Photography",
        price: 7000,
        unit: "group",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    },

    {
        title: "Mobility and movement training by Shane",
        location: "South Goa",
        serviceType: "Fitness",
        price: 1500,
        unit: "guest",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
    },

    {
        title: "Holistic yoga class by Manoj",
        location: "South Goa",
        serviceType: "Yoga",
        price: 1200,
        unit: "guest",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80"
    },

    {
        title: "Paperrose Art Studio Photos for all occasions",
        location: "South Goa",
        serviceType: "Photography",
        price: 9600,
        unit: "guest",
        rating: 4.85,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
    },

    {
        title: "Private Seafood Barbecue Chef Experience",
        location: "South Goa",
        serviceType: "Chefs",
        price: 4500,
        unit: "guest",
        rating: 4.95,
        isPopular: true,
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
    },

    {
        title: "Ayurvedic Rejuvenation Massage & Wellness",
        location: "South Goa",
        serviceType: "Massage",
        price: 2800,
        unit: "guest",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80"
    },

    {
        title: "Sunset Drone & Cinematic Videography",
        location: "South Goa",
        serviceType: "Photography",
        price: 8200,
        unit: "group",
        rating: 4.92,
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80"
    },

    {
        title: "Traditional Goan Culinary Masterclass",
        location: "South Goa",
        serviceType: "Chefs",
        price: 3200,
        unit: "guest",
        rating: 4.98,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80"
    },

    {
        title: "Beachside Sunset Pilates & Sound Bath",
        location: "South Goa",
        serviceType: "Yoga",
        price: 1800,
        unit: "guest",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80"
    },

    {
        title: "Bridal & Event Glam Make-up Styling",
        location: "South Goa",
        serviceType: "Make-up",
        price: 6000,
        unit: "guest",
        rating: 4.88,
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
    }
];

async function seedServices() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected");

        await Service.deleteMany({});

        await Service.insertMany(services);

        console.log("Services inserted successfully");

        await mongoose.connection.close();
    } catch (error) {
        console.error("Seeding failed:", error.message);
    }
}

seedServices();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Experience = require("../models/Experience");

dotenv.config();

// Existing experience data from the frontend
const experiences = [
    // =========================
    // AIRBNB ORIGINALS
    // =========================

    {
        title: "Carve marble with a third-generation sculptor",
        location: "Athens, Greece",
        city: "Athens",
        price: 6534,
        rating: 5.0,
        photo: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=400",
        category: "Art",
        badge: "Original",
        isOriginal: true,
        railKey: "originals",
        railTitle: "Airbnb Originals",
        railSubtitle: "Hosted by the world's most interesting people"
    },

    {
        title: "Art Walking Tour in San Miguel de Allende",
        location: "San Miguel de Allende, Mexico",
        city: "San Miguel de Allende",
        price: 3677,
        rating: null,
        photo: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400",
        category: "Art",
        badge: "Original",
        isOriginal: true,
        railKey: "originals",
        railTitle: "Airbnb Originals",
        railSubtitle: "Hosted by the world's most interesting people"
    },

    {
        title: "Prosecco Hills: discover a small producer",
        location: "Conegliano, Italy",
        city: "Conegliano",
        price: 3050,
        rating: 5.0,
        photo: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
        category: "Food & Drink",
        badge: "Original",
        isOriginal: true,
        railKey: "originals",
        railTitle: "Airbnb Originals",
        railSubtitle: "Hosted by the world's most interesting people"
    },

    {
        title: "Participate in almsgiving and yoga in Chiang Mai",
        location: "Haiya Sub-district, Thailand",
        city: "Chiang Mai",
        price: 855,
        rating: 4.95,
        photo: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
        category: "Wellness",
        badge: "Original",
        isOriginal: true,
        railKey: "originals",
        railTitle: "Airbnb Originals",
        railSubtitle: "Hosted by the world's most interesting people"
    },

    {
        title: "Insider's Food Tour: South Philly & Italian Market",
        location: "Philadelphia, United States",
        city: "Philadelphia",
        price: 9866,
        rating: 5.0,
        photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
        category: "Food & Drink",
        badge: "Original",
        isOriginal: true,
        railKey: "originals",
        railTitle: "Airbnb Originals",
        railSubtitle: "Hosted by the world's most interesting people"
    },

    {
        title: "Blend incense with a priest at Seisho-ji Temple",
        location: "Kawachinagano, Japan",
        city: "Kawachinagano",
        price: 10528,
        rating: null,
        photo: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400",
        category: "Culture",
        badge: "Original",
        isOriginal: true,
        railKey: "originals",
        railTitle: "Airbnb Originals",
        railSubtitle: "Hosted by the world's most interesting people"
    },


    // =========================
    // BENGALURU
    // =========================

    {
        title: "Play with clay: Fun weekend pottery workshop",
        location: "",
        city: "Bengaluru",
        price: 2000,
        rating: null,
        photo: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400",
        category: "Art",
        badge: "Trending",
        isOriginal: false,
        railKey: "bengaluru",
        railTitle: "Experiences in Bengaluru",
        railSubtitle: ""
    },

    {
        title: "Street Food Tour near a Local Market in Bangalore",
        location: "",
        city: "Bengaluru",
        price: 3333,
        rating: 4.98,
        photo: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400",
        category: "Food & Drink",
        badge: "Trending",
        isOriginal: false,
        railKey: "bengaluru",
        railTitle: "Experiences in Bengaluru",
        railSubtitle: ""
    },

    {
        title: "Walk in Lalbagh Botanical Garden",
        location: "",
        city: "Bengaluru",
        price: 1400,
        rating: 5.0,
        photo: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400",
        category: "Nature",
        badge: "Trending",
        isOriginal: false,
        railKey: "bengaluru",
        railTitle: "Experiences in Bengaluru",
        railSubtitle: ""
    },

    {
        title: "All You Knead is Love: Master Indian Breads",
        location: "",
        city: "Bengaluru",
        price: 3500,
        rating: 4.98,
        photo: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400",
        category: "Food & Drink",
        badge: "Trending",
        isOriginal: false,
        railKey: "bengaluru",
        railTitle: "Experiences in Bengaluru",
        railSubtitle: ""
    },


    // =========================
    // SOUTH GOA
    // =========================

    {
        title: "Trek to a hidden Cliff jumping Spot",
        location: "",
        city: "South Goa",
        price: 2650,
        rating: 4.94,
        photo: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400",
        category: "Adventure",
        badge: "Trending",
        isOriginal: false,
        railKey: "south-goa",
        railTitle: "Experiences in South Goa",
        railSubtitle: ""
    },

    {
        title: "Explore Goa's Vibrant Latin Quarter Lanes",
        location: "",
        city: "South Goa",
        price: 1533,
        rating: 4.94,
        photo: "https://images.unsplash.com/photo-1587922546307-776227941871?w=400",
        category: "Culture",
        badge: "Trending",
        isOriginal: false,
        railKey: "south-goa",
        railTitle: "Experiences in South Goa",
        railSubtitle: ""
    },

    {
        title: "Stroll Goan history through Latin Quarter",
        location: "",
        city: "South Goa",
        price: 1250,
        rating: 5.0,
        photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400",
        category: "Culture",
        badge: "Trending",
        isOriginal: false,
        railKey: "south-goa",
        railTitle: "Experiences in South Goa",
        railSubtitle: ""
    },

    {
        title: "Kayaking experience on the Chapora river.",
        location: "",
        city: "South Goa",
        price: 2850,
        rating: 4.98,
        photo: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=400",
        category: "Adventure",
        badge: "Trending",
        isOriginal: false,
        railKey: "south-goa",
        railTitle: "Experiences in South Goa",
        railSubtitle: ""
    },

    {
        title: "Get hooked on Fishing Anjuna",
        location: "",
        city: "South Goa",
        price: 1250,
        rating: 4.98,
        photo: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400",
        category: "Adventure",
        badge: "Trending",
        isOriginal: false,
        railKey: "south-goa",
        railTitle: "Experiences in South Goa",
        railSubtitle: ""
    },

    {
        title: "Ferry to Divar Island hidden gems",
        location: "",
        city: "South Goa",
        price: 1250,
        rating: 4.9,
        photo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
        category: "Adventure",
        badge: "Trending",
        isOriginal: false,
        railKey: "south-goa",
        railTitle: "Experiences in South Goa",
        railSubtitle: ""
    }
];


// =========================
// CONNECT TO MONGODB
// =========================

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("MongoDB connected");

        // Check whether experiences already exist
        const existingCount = await Experience.countDocuments();

        if (existingCount > 0) {
            console.log(
                `Experiences already exist (${existingCount} documents).`
            );

            console.log("Nothing was inserted.");

            await mongoose.connection.close();

            return;
        }

        // Insert experiences only if collection is empty
        await Experience.insertMany(experiences);

        console.log(
            `${experiences.length} experiences inserted successfully`
        );

        await mongoose.connection.close();

        console.log("MongoDB connection closed");
    })
    .catch((error) => {
        console.error("Seeding failed:");
        console.error(error);
    });
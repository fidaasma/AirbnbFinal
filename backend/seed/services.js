const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Service = require("../models/Service");

dotenv.config();

const services = [
    {
        title: "Golden hour portraits at Lodhi Garden",
        serviceType: "Photography",
        location: "New Delhi, Delhi",
        price: 8500,
        unit: "group",
        duration: "1 hr 30 mins",
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
            "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200&q=80"
        ],
        rating: 4.9,
        reviewCount: 64,
        description: "I run relaxed, professional photo sessions across New Delhi for couples, families and solo travellers. We will walk through Lodhi Garden and Humayun's Tomb while capturing natural, candid moments in soft evening light.",
        providedAt: "a location of your choice",
        host: {
            name: "Navya Malhotra",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
            role: "Photographer"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel at least 1 day before the start time for a full refund."
        },
        guestRequirements: "Guests aged 2 and up can attend. Please arrive 10 minutes before golden hour.",
        accessibility: "Paved garden paths are suitable for wheelchairs. Message your host for accessibility details.",
        qualifications: [
            { title: "7 years of experience", description: "I have photographed travellers, families and local clients across Delhi since 2019." },
            { title: "Featured in travel magazines", description: "My Old Delhi street series was published in a national travel magazine." },
            { title: "Diploma in Photography", description: "I trained in portrait and natural-light photography at a Delhi arts institute." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
            "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
            "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
        ],
        serviceArea: {
            description: "I travel to guests across central and south Delhi.",
            address: "Lodhi Road, New Delhi, Delhi, 110003"
        },
        thingsToKnow: {
            guestRequirements: "Guests aged 2 and up can attend. Please arrive 10 minutes before golden hour.",
            accessibility: "Paved garden paths are suitable for wheelchairs. Message your host for accessibility details.",
            cancellationPolicy: "Cancel at least 1 day before the start time for a full refund."
        },
        highlight: true,
        isPopular: false
    },
    {
        title: "Bandra street and sea-face photo walk",
        serviceType: "Photography",
        location: "Mumbai, Maharashtra",
        price: 12900,
        unit: "group",
        duration: "2 hrs",
        image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80"
        ],
        rating: 4.8,
        reviewCount: 91,
        description: "Explore Bandra's colourful lanes, graffiti walls and the Bandstand promenade with a photographer who knows every good corner. You will get an edited gallery of 40 high-resolution photos within five days.",
        providedAt: "a location of your choice",
        host: {
            name: "Rohan Deshmukh",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
            role: "Photographer"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 48 hours before the session."
        },
        guestRequirements: "Groups of up to 6 guests. Wear comfortable shoes as we walk about 2 km.",
        accessibility: "The route includes some uneven pavements. Message the host to plan a shorter, step-free route.",
        qualifications: [
            { title: "9 years of experience", description: "I have shot lifestyle and street photography across Mumbai for magazines and brands." },
            { title: "Street photography exhibition", description: "My Bandra series was exhibited at a Kala Ghoda Arts Festival showcase." },
            { title: "Adobe Lightroom certified", description: "I personally edit and colour-grade every gallery I deliver." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
            "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80"
        ],
        serviceArea: {
            description: "I cover Bandra, Juhu, Colaba and the Marine Drive stretch.",
            address: "Bandra West, Mumbai, Maharashtra, 400050"
        },
        thingsToKnow: {
            guestRequirements: "Groups of up to 6 guests. Wear comfortable shoes as we walk about 2 km.",
            accessibility: "The route includes some uneven pavements. Message the host to plan a shorter, step-free route.",
            cancellationPolicy: "Free cancellation up to 48 hours before the session."
        },
        highlight: false,
        isPopular: true
    },
    {
        title: "Sunset beach shoot in Anjuna",
        serviceType: "Photography",
        location: "North Goa, Goa",
        price: 6480,
        unit: "group",
        duration: "1 hr",
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80",
            "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1200&q=80"
        ],
        rating: 4.9,
        reviewCount: 184,
        description: "A laid-back sunset shoot on the beaches of North Goa, perfect for couples, honeymooners and friends on holiday. I guide poses gently so you look natural and end up with golden, sun-kissed photos.",
        providedAt: "a beach near Anjuna",
        host: {
            name: "Kabir Fernandes",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
            role: "Photographer"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 24 hours before the session for a full refund, or reschedule free if rain stops the shoot."
        },
        guestRequirements: "Guests aged 5 and up can attend. Bring a change of outfit if you would like variety.",
        accessibility: "Beach sand can be uneven. Message your host if you need a spot close to the access road.",
        qualifications: [
            { title: "6 years of experience", description: "I have photographed couples and travel groups on Goa's beaches every season." },
            { title: "Drone licence holder", description: "I am licensed to fly drones and can add aerial shots on request." },
            { title: "Over 300 couple shoots", description: "Honeymooners and pre-wedding clients make up most of my bookings." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
        ],
        serviceArea: {
            description: "I shoot at beaches and cafes across Anjuna, Vagator, Baga and Candolim.",
            address: "Anjuna, North Goa, Goa, 403509"
        },
        thingsToKnow: {
            guestRequirements: "Guests aged 5 and up can attend. Bring a change of outfit if you would like variety.",
            accessibility: "Beach sand can be uneven. Message your host if you need a spot close to the access road.",
            cancellationPolicy: "Cancel up to 24 hours before the session for a full refund, or reschedule free if rain stops the shoot."
        },
        highlight: true,
        isPopular: true
    },
    {
        title: "Royal Jaipur heritage portraits at Amer Fort",
        serviceType: "Photography",
        location: "Jaipur, Rajasthan",
        price: 9800,
        unit: "group",
        duration: "2 hrs",
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&q=80",
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80"
        ],
        rating: 4.7,
        reviewCount: 38,
        description: "Step into Rajasthan's royal backdrops with a photographer who grew up in the Pink City. We shoot at Amer Fort and Jal Mahal, and I can arrange traditional outfits for an extra charge.",
        providedAt: "Amer Fort and nearby heritage sites",
        host: {
            name: "Meera Rathore",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
            role: "Photographer"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel at least 2 days before the session for a full refund."
        },
        guestRequirements: "Guests aged 3 and up can attend. Entry tickets to monuments are paid separately.",
        accessibility: "Amer Fort involves steep ramps and stairs. Please message the host to plan accessible locations.",
        qualifications: [
            { title: "8 years of experience", description: "I specialise in heritage, wedding and travel photography across Rajasthan." },
            { title: "Pre-wedding specialist", description: "I have shot over 120 pre-wedding sessions at Jaipur palaces and forts." },
            { title: "Local heritage guide training", description: "I hold a state tourism guide certificate, so I know the best light and quiet corners." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
            "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80"
        ],
        serviceArea: {
            description: "I work across Jaipur's old city, Amer, Nahargarh and Jal Mahal.",
            address: "Amer Road, Jaipur, Rajasthan, 302001"
        },
        thingsToKnow: {
            guestRequirements: "Guests aged 3 and up can attend. Entry tickets to monuments are paid separately.",
            accessibility: "Amer Fort involves steep ramps and stairs. Please message the host to plan accessible locations.",
            cancellationPolicy: "Cancel at least 2 days before the session for a full refund."
        },
        highlight: true,
        isPopular: false
    },
    {
        title: "Fort Kochi travel photography session",
        serviceType: "Photography",
        location: "Kochi, Kerala",
        price: 5500,
        unit: "group",
        duration: "1 hr 30 mins",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80",
            "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200&q=80",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80"
        ],
        rating: 4.6,
        reviewCount: 112,
        description: "Wander through Fort Kochi's Chinese fishing nets, colonial lanes and cafes while I capture your trip in a documentary style. Ideal for solo travellers and small groups who want authentic memories.",
        providedAt: "Fort Kochi waterfront",
        host: {
            name: "Ishita Nair",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
            role: "Photographer"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 24 hours before the start time."
        },
        guestRequirements: "Guests of all ages are welcome. Carry a hat and water as the coastal sun can be strong.",
        accessibility: "Most of the route is flat and walkable. Message your host for accessibility details.",
        qualifications: [
            { title: "5 years of experience", description: "I have photographed tourists and Kochi-Muziris Biennale events across Fort Kochi." },
            { title: "Documentary photography course", description: "I completed a storytelling photography programme in Kerala." },
            { title: "Featured local creator", description: "My Kochi harbour photographs have been featured by a regional tourism board." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&q=80",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
        ],
        serviceArea: {
            description: "I shoot in Fort Kochi, Mattancherry and Marine Drive.",
            address: "Fort Kochi, Kochi, Kerala, 682001"
        },
        thingsToKnow: {
            guestRequirements: "Guests of all ages are welcome. Carry a hat and water as the coastal sun can be strong.",
            accessibility: "Most of the route is flat and walkable. Message your host for accessibility details.",
            cancellationPolicy: "Free cancellation up to 24 hours before the start time."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Cubbon Park and cafe lifestyle shoot",
        serviceType: "Photography",
        location: "Bengaluru, Karnataka",
        price: 4200,
        unit: "group",
        duration: "1 hr",
        image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80",
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
            "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1200&q=80"
        ],
        rating: 4.7,
        reviewCount: 56,
        description: "A compact, affordable lifestyle shoot for profile pictures, portfolios and friends' catch-ups. We use Cubbon Park's greenery and a nearby cafe to get a mix of candid and posed shots.",
        providedAt: "Cubbon Park",
        host: {
            name: "Aditya Gowda",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
            role: "Photographer"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 12 hours before the booking for a full refund."
        },
        guestRequirements: "Up to 4 guests per session. Solid colours photograph best, so avoid busy patterns.",
        accessibility: "Park pathways are mostly flat. Message your host for accessibility details.",
        qualifications: [
            { title: "4 years of experience", description: "I shoot portfolios and professional headshots for Bengaluru's startup community." },
            { title: "Headshot specialist", description: "I have photographed over 400 professionals for LinkedIn and company websites." },
            { title: "Self-taught with mentorship", description: "I trained under a senior commercial photographer for two years." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80"
        ],
        serviceArea: {
            description: "I work in Cubbon Park, Indiranagar and Koramangala.",
            address: "Cubbon Park, Bengaluru, Karnataka, 560001"
        },
        thingsToKnow: {
            guestRequirements: "Up to 4 guests per session. Solid colours photograph best, so avoid busy patterns.",
            accessibility: "Park pathways are mostly flat. Message your host for accessibility details.",
            cancellationPolicy: "Cancel up to 12 hours before the booking for a full refund."
        },
        highlight: false,
        isPopular: true
    },
    {
        title: "Pre-wedding film and photo day in Hyderabad",
        serviceType: "Photography",
        location: "Hyderabad, Telangana",
        price: 27500,
        unit: "group",
        duration: "Half day",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80"
        ],
        rating: 5.0,
        reviewCount: 27,
        description: "A premium pre-wedding experience covering Charminar, Golconda Fort and a sunset rooftop. You receive 80 edited photos and a 2-minute highlight reel within two weeks.",
        providedAt: "Golconda Fort and Old City locations",
        host: {
            name: "Arjun Reddy",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
            role: "Photographer & Filmmaker"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel at least 7 days before the shoot for a full refund."
        },
        guestRequirements: "Suitable for couples and up to 2 additional family members. Bring two outfit changes.",
        accessibility: "Golconda Fort includes long staircases. Discuss mobility needs with the host before booking.",
        qualifications: [
            { title: "11 years of experience", description: "I have shot more than 200 weddings and pre-wedding films across Telangana." },
            { title: "Award-winning filmmaker", description: "My short wedding film won a regional wedding cinematography award." },
            { title: "Cinematography diploma", description: "I studied film and cinematography in Hyderabad." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
            "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80",
            "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
        ],
        serviceArea: {
            description: "I shoot in Hyderabad's Old City, Banjara Hills and Golconda.",
            address: "Banjara Hills, Hyderabad, Telangana, 500034"
        },
        thingsToKnow: {
            guestRequirements: "Suitable for couples and up to 2 additional family members. Bring two outfit changes.",
            accessibility: "Golconda Fort includes long staircases. Discuss mobility needs with the host before booking.",
            cancellationPolicy: "Cancel at least 7 days before the shoot for a full refund."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Private North Indian dinner by a home chef",
        serviceType: "Chefs",
        location: "New Delhi, Delhi",
        price: 3500,
        unit: "guest",
        duration: "3 hrs",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
            "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1200&q=80"
        ],
        rating: 4.9,
        reviewCount: 143,
        description: "Enjoy a restaurant-style multi-course North Indian dinner cooked in your own kitchen, from smoky kebabs to slow-cooked dal and saffron phirni. I handle shopping, cooking and clean-up.",
        providedAt: "your home",
        host: {
            name: "Aarav Kapoor",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
            role: "Private Chef"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 48 hours before the booking for a full refund, as ingredients are purchased a day in advance."
        },
        guestRequirements: "Minimum 2 and maximum 10 guests. Please share allergies and dietary preferences at least a day ahead.",
        accessibility: "Requires a working kitchen. Message your host to discuss seating or kitchen layout needs.",
        qualifications: [
            { title: "12 years in professional kitchens", description: "I have cooked at five-star hotels in Delhi before starting my private chef practice." },
            { title: "Culinary arts diploma", description: "I graduated from a leading hotel management institute in Delhi." },
            { title: "Over 500 private dinners", description: "I regularly cook for birthdays, anniversaries and small corporate dinners." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
        ],
        serviceArea: {
            description: "I cook at homes across New Delhi, Gurugram and Noida.",
            address: "Connaught Place, New Delhi, Delhi, 110001"
        },
        thingsToKnow: {
            guestRequirements: "Minimum 2 and maximum 10 guests. Please share allergies and dietary preferences at least a day ahead.",
            accessibility: "Requires a working kitchen. Message your host to discuss seating or kitchen layout needs.",
            cancellationPolicy: "Cancel up to 48 hours before the booking for a full refund, as ingredients are purchased a day in advance."
        },
        highlight: true,
        isPopular: true
    },
    {
        title: "Goan seafood feast with a local chef",
        serviceType: "Chefs",
        location: "South Goa, Goa",
        price: 4800,
        unit: "guest",
        duration: "3 hrs",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80",
            "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&q=80",
            "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80"
        ],
        rating: 4.8,
        reviewCount: 77,
        description: "Taste Goa the way locals eat it: recaado prawns, fish curry rice, xacuti and bebinca. I cook fresh catch from the local market at your villa or holiday rental.",
        providedAt: "your villa or rental",
        host: {
            name: "Diya D'Souza",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
            role: "Private Chef"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 24 hours before the experience."
        },
        guestRequirements: "Not suitable for guests with shellfish allergies. Vegetarian menus available on request.",
        accessibility: "Kitchen access required. Message your host for accessibility details.",
        qualifications: [
            { title: "10 years of experience", description: "I grew up cooking Goan Catholic recipes and have worked in beach restaurants across Benaulim." },
            { title: "Food festival participant", description: "I have hosted live seafood demonstrations at the Goa Food and Cultural Festival." },
            { title: "Food safety certified", description: "I hold a FoSTaC food safety supervisor certificate." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80",
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
            "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80"
        ],
        serviceArea: {
            description: "I cook at villas and homestays in Benaulim, Colva and Palolem.",
            address: "Benaulim, South Goa, Goa, 403716"
        },
        thingsToKnow: {
            guestRequirements: "Not suitable for guests with shellfish allergies. Vegetarian menus available on request.",
            accessibility: "Kitchen access required. Message your host for accessibility details.",
            cancellationPolicy: "Free cancellation up to 24 hours before the experience."
        },
        highlight: false,
        isPopular: true
    },
    {
        title: "Traditional Kerala sadya cooked at your home",
        serviceType: "Chefs",
        location: "Kochi, Kerala",
        price: 2200,
        unit: "guest",
        duration: "3 hrs",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80",
            "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
            "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=80"
        ],
        rating: 4.9,
        reviewCount: 98,
        description: "A full vegetarian sadya served on banana leaf, with parippu, sambar, avial, olan, payasam and more. I cook on-site and explain the meaning behind each dish.",
        providedAt: "your home",
        host: {
            name: "Anjali Menon",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
            role: "Private Chef"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel at least 1 day before the start time for a full refund."
        },
        guestRequirements: "Minimum 4 guests. Please inform the host about any food allergies in advance.",
        accessibility: "Floor or table seating both work. Ground-floor setup available on request.",
        qualifications: [
            { title: "15 years of experience", description: "I have cooked traditional Kerala feasts for weddings and temple festivals." },
            { title: "Cookbook contributor", description: "My sadya recipes were featured in a Malayalam food magazine." },
            { title: "Catering management training", description: "I completed a hospitality programme at a Kochi catering college." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
            "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&q=80",
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
        ],
        serviceArea: {
            description: "I cook at homes across Ernakulam, Fort Kochi and Kakkanad.",
            address: "Panampilly Nagar, Kochi, Kerala, 682036"
        },
        thingsToKnow: {
            guestRequirements: "Minimum 4 guests. Please inform the host about any food allergies in advance.",
            accessibility: "Floor or table seating both work. Ground-floor setup available on request.",
            cancellationPolicy: "Cancel at least 1 day before the start time for a full refund."
        },
        highlight: false,
        isPopular: true
    },
    {
        title: "Coastal Maharashtrian tasting menu",
        serviceType: "Chefs",
        location: "Mumbai, Maharashtra",
        price: 5900,
        unit: "guest",
        duration: "3 hrs",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
            "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=80",
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80"
        ],
        rating: 4.8,
        reviewCount: 52,
        description: "A chef's tasting menu that reimagines Malvani and Konkani classics with fine-dining plating. Expect bombil fry, kombdi vade and modak with a twist, cooked in your apartment kitchen.",
        providedAt: "your home",
        host: {
            name: "Vikram Sawant",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
            role: "Private Chef"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 72 hours before the booking for a full refund."
        },
        guestRequirements: "Suitable for 2 to 8 adult guests. The menu includes seafood and cannot be fully vegetarian.",
        accessibility: "Please message the host about elevator access and kitchen space before booking.",
        qualifications: [
            { title: "9 years in fine dining", description: "I worked in Mumbai's leading modern Indian restaurants before going independent." },
            { title: "Culinary school graduate", description: "I trained at a well-known institute of culinary arts in Mumbai." },
            { title: "Featured on local food shows", description: "I have appeared as a guest chef on regional cooking programmes." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
            "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
            "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80"
        ],
        serviceArea: {
            description: "I cook in south Mumbai, Bandra and Powai apartments.",
            address: "Worli, Mumbai, Maharashtra, 400018"
        },
        thingsToKnow: {
            guestRequirements: "Suitable for 2 to 8 adult guests. The menu includes seafood and cannot be fully vegetarian.",
            accessibility: "Please message the host about elevator access and kitchen space before booking.",
            cancellationPolicy: "Cancel up to 72 hours before the booking for a full refund."
        },
        highlight: false,
        isPopular: true
    },
    {
        title: "South Indian breakfast and filter coffee masterclass",
        serviceType: "Chefs",
        location: "Bengaluru, Karnataka",
        price: 1900,
        unit: "guest",
        duration: "2 hrs",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80",
            "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
        ],
        rating: 4.7,
        reviewCount: 41,
        description: "Learn to make crisp dosas, fluffy idlis, chutneys and proper filter coffee in a hands-on class at my home kitchen. We sit down together to eat everything we cook.",
        providedAt: "my home kitchen",
        host: {
            name: "Lakshmi Iyer",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
            role: "Home Chef"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 24 hours before the class."
        },
        guestRequirements: "Guests aged 10 and up can attend. Up to 6 guests per class.",
        accessibility: "My home is on the first floor with stairs. Message the host for accessibility details.",
        qualifications: [
            { title: "20 years of home cooking", description: "I have been cooking traditional Karnataka and Tamil recipes for my family and community." },
            { title: "Cooking class host", description: "I have taught over 150 travellers to make South Indian breakfasts." },
            { title: "Nutrition certificate", description: "I completed a short course on traditional fermented foods and gut health." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
            "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&q=80",
            "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80"
        ],
        serviceArea: {
            description: "Classes are held at my home in Jayanagar; I can also travel within south Bengaluru.",
            address: "Jayanagar, Bengaluru, Karnataka, 560011"
        },
        thingsToKnow: {
            guestRequirements: "Guests aged 10 and up can attend. Up to 6 guests per class.",
            accessibility: "My home is on the first floor with stairs. Message the host for accessibility details.",
            cancellationPolicy: "Free cancellation up to 24 hours before the class."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Ayurvedic rejuvenation massage by the sea",
        serviceType: "Massage",
        location: "North Goa, Goa",
        price: 3800,
        unit: "guest",
        duration: "1 hr 30 mins",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
            "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80",
            "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80"
        ],
        rating: 4.9,
        reviewCount: 120,
        description: "A warm-oil Ayurvedic massage designed to melt away travel fatigue. I bring a portable massage bed and herbal oils to your villa or hotel room.",
        providedAt: "your villa or hotel room",
        host: {
            name: "Sneha Kamat",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
            role: "Wellness Therapist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 24 hours before the session for a full refund."
        },
        guestRequirements: "Guests must inform the host about allergies, injuries or pregnancy before the session. Guests must be 18 or older.",
        accessibility: "I need about 2 metres of clear floor space. Message the host for accessibility details.",
        qualifications: [
            { title: "8 years of experience", description: "I have worked at wellness resorts and private villas across North Goa." },
            { title: "Certified Ayurvedic therapist", description: "I completed a 1-year therapist programme at a recognised Kerala Ayurveda institute." },
            { title: "Over 2,000 sessions", description: "I have treated guests from India and abroad with consistently strong feedback." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80",
            "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
            "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800&q=80"
        ],
        serviceArea: {
            description: "I visit guests in Calangute, Candolim, Anjuna and Assagao.",
            address: "Calangute, North Goa, Goa, 403516"
        },
        thingsToKnow: {
            guestRequirements: "Guests must inform the host about allergies, injuries or pregnancy before the session. Guests must be 18 or older.",
            accessibility: "I need about 2 metres of clear floor space. Message the host for accessibility details.",
            cancellationPolicy: "Cancel up to 24 hours before the session for a full refund."
        },
        highlight: true,
        isPopular: false
    },
    {
        title: "Traditional abhyanga oil massage",
        serviceType: "Massage",
        location: "Kochi, Kerala",
        price: 2800,
        unit: "guest",
        duration: "1 hr",
        image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
            "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80",
            "https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&q=80"
        ],
        rating: 4.8,
        reviewCount: 86,
        description: "A traditional Kerala abhyanga massage using medicated coconut and sesame oils, performed by a trained therapist. It relieves muscle tension, improves circulation and leaves you deeply relaxed.",
        providedAt: "my treatment room",
        host: {
            name: "Gopika Varma",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
            role: "Ayurvedic Therapist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 12 hours before the start time."
        },
        guestRequirements: "Guests must disclose any skin conditions or recent surgery. Not recommended after a heavy meal.",
        accessibility: "Treatment room is on the ground floor with a step-free entrance. Message the host for accessibility details.",
        qualifications: [
            { title: "11 years of experience", description: "I have practised at Ayurvedic centres in Kochi and Alleppey." },
            { title: "BAMS-trained therapist", description: "I completed Ayurveda therapy training under a licensed Ayurvedic physician." },
            { title: "Panchakarma specialisation", description: "I am experienced in detox and stress-relief treatment plans." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
            "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80",
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
        ],
        serviceArea: {
            description: "Sessions are held at my clinic in Kochi; home visits are available within Ernakulam.",
            address: "Kaloor, Kochi, Kerala, 682017"
        },
        thingsToKnow: {
            guestRequirements: "Guests must disclose any skin conditions or recent surgery. Not recommended after a heavy meal.",
            accessibility: "Treatment room is on the ground floor with a step-free entrance. Message the host for accessibility details.",
            cancellationPolicy: "Free cancellation up to 12 hours before the start time."
        },
        highlight: false,
        isPopular: true
    },
    {
        title: "Deep tissue massage for desk-weary muscles",
        serviceType: "Massage",
        location: "South Delhi, Delhi",
        price: 3200,
        unit: "guest",
        duration: "1 hr",
        image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80",
            "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=1200&q=80",
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80"
        ],
        rating: 4.7,
        reviewCount: 73,
        description: "A focused deep tissue session targeting your neck, shoulders and lower back, ideal after long hours at a desk. I bring all equipment and set up in your living room or bedroom.",
        providedAt: "your home",
        host: {
            name: "Tanvi Sethi",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
            role: "Massage Therapist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel at least 1 day before the start time for a full refund."
        },
        guestRequirements: "Guests must be 18 or older and must tell the host about injuries, medication or allergies before the session.",
        accessibility: "I need a flat area for the massage table. Ground-floor setup available on request.",
        qualifications: [
            { title: "6 years of experience", description: "I work with office professionals, runners and gym-goers across Delhi." },
            { title: "Sports massage certification", description: "I am trained in deep tissue and sports recovery techniques." },
            { title: "Physiotherapy background", description: "I hold a degree in physiotherapy and understand muscle anatomy well." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
            "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
        ],
        serviceArea: {
            description: "I visit homes in Hauz Khas, Greater Kailash, Saket and Vasant Vihar.",
            address: "Hauz Khas, South Delhi, Delhi, 110016"
        },
        thingsToKnow: {
            guestRequirements: "Guests must be 18 or older and must tell the host about injuries, medication or allergies before the session.",
            accessibility: "I need a flat area for the massage table. Ground-floor setup available on request.",
            cancellationPolicy: "Cancel at least 1 day before the start time for a full refund."
        },
        highlight: false,
        isPopular: true
    },
    {
        title: "Relaxing Swedish massage at your hotel in Mumbai",
        serviceType: "Massage",
        location: "Mumbai, Maharashtra",
        price: 4500,
        unit: "guest",
        duration: "1 hr 30 mins",
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
            "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80",
            "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80"
        ],
        rating: 4.6,
        reviewCount: 59,
        description: "A gentle full-body Swedish massage with aromatherapy oils, perfect for business travellers and tourists. I arrive with a portable table, towels and calming music.",
        providedAt: "your hotel room or home",
        host: {
            name: "Siddharth Naik",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
            role: "Wellness Therapist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 24 hours before the session."
        },
        guestRequirements: "Adults only. Please avoid booking within two hours of a heavy meal.",
        accessibility: "Suitable for guests who can lie down comfortably. Message the host for accessibility details.",
        qualifications: [
            { title: "7 years of experience", description: "I have worked at luxury hotel spas in Mumbai before offering private sessions." },
            { title: "International spa diploma", description: "I earned a diploma in body therapies from a Mumbai wellness academy." },
            { title: "Stress-relief specialist", description: "I focus on relaxation techniques for frequent travellers and busy professionals." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
            "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800&q=80",
            "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80"
        ],
        serviceArea: {
            description: "I visit hotels and homes in South Mumbai, Bandra, Andheri and Powai.",
            address: "Andheri West, Mumbai, Maharashtra, 400053"
        },
        thingsToKnow: {
            guestRequirements: "Adults only. Please avoid booking within two hours of a heavy meal.",
            accessibility: "Suitable for guests who can lie down comfortably. Message the host for accessibility details.",
            cancellationPolicy: "Free cancellation up to 24 hours before the session."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Herbal poultice and head massage in Jaipur",
        serviceType: "Massage",
        location: "Jaipur, Rajasthan",
        price: 2400,
        unit: "guest",
        duration: "1 hr",
        image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80",
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80"
        ],
        rating: 4.8,
        reviewCount: 34,
        description: "A soothing combination of herbal poultice massage and scalp treatment using oils inspired by Rajasthani wellness traditions. Excellent after a day of sightseeing in the heat.",
        providedAt: "my wellness studio",
        host: {
            name: "Pooja Shekhawat",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
            role: "Wellness Therapist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 12 hours before the session for a full refund."
        },
        guestRequirements: "Guests should tell the host about any herbal or oil allergies before the session.",
        accessibility: "My studio is on the ground floor with a ramp. Message the host for accessibility details.",
        qualifications: [
            { title: "5 years of experience", description: "I run a small wellness studio serving local and international guests." },
            { title: "Certified massage therapist", description: "I completed a 6-month therapy course in Jaipur." },
            { title: "Herbal oil blending", description: "I blend my own oils using locally sourced herbs." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
            "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
            "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80"
        ],
        serviceArea: {
            description: "Sessions at my studio near C-Scheme; hotel visits within Jaipur city.",
            address: "C-Scheme, Jaipur, Rajasthan, 302001"
        },
        thingsToKnow: {
            guestRequirements: "Guests should tell the host about any herbal or oil allergies before the session.",
            accessibility: "My studio is on the ground floor with a ramp. Message the host for accessibility details.",
            cancellationPolicy: "Cancel up to 12 hours before the session for a full refund."
        },
        highlight: true,
        isPopular: false
    },
    {
        title: "Weekly healthy meal boxes for busy professionals",
        serviceType: "Prepared meals",
        location: "Bengaluru, Karnataka",
        price: 1200,
        unit: "guest",
        duration: "1 hr",
        image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80",
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80",
            "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80"
        ],
        rating: 4.7,
        reviewCount: 105,
        description: "Nutritionist-designed meal boxes with millet bowls, dals, grilled proteins and fresh salads, prepared in small batches and delivered chilled. Each box serves one person for a day.",
        providedAt: "delivered to your door",
        host: {
            name: "Nikhil Rao",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
            role: "Chef & Meal Prep Specialist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 24 hours before delivery for a full refund."
        },
        guestRequirements: "Please share dietary preferences and allergies when booking. Vegetarian, vegan and high-protein plans are available.",
        accessibility: "Delivery is made to your door. Message the host for accessibility details.",
        qualifications: [
            { title: "6 years in healthy cooking", description: "I started my meal-prep kitchen after working in a Bengaluru health cafe." },
            { title: "Diploma in nutrition", description: "I work with a certified nutritionist to balance calories and macros." },
            { title: "Over 10,000 meals delivered", description: "Regular customers include software teams and fitness enthusiasts." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
            "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80",
            "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80"
        ],
        serviceArea: {
            description: "I deliver across Koramangala, HSR Layout, Indiranagar and Whitefield.",
            address: "HSR Layout, Bengaluru, Karnataka, 560102"
        },
        thingsToKnow: {
            guestRequirements: "Please share dietary preferences and allergies when booking. Vegetarian, vegan and high-protein plans are available.",
            accessibility: "Delivery is made to your door. Message the host for accessibility details.",
            cancellationPolicy: "Cancel up to 24 hours before delivery for a full refund."
        },
        highlight: false,
        isPopular: true
    },
    {
        title: "Homestyle Maharashtrian thali delivery",
        serviceType: "Prepared meals",
        location: "Pune, Maharashtra",
        price: 950,
        unit: "guest",
        duration: "1 hr",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1200&q=80",
            "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80",
            "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=80"
        ],
        rating: 4.8,
        reviewCount: 167,
        description: "A comforting Maharashtrian thali with puran poli, varan bhaat, bhaji, koshimbir and chutney, cooked the way my grandmother taught me. Delivered hot in steel tiffin containers.",
        providedAt: "delivered to your door",
        host: {
            name: "Sunita Kulkarni",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
            role: "Home Chef"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 6 hours before the scheduled delivery."
        },
        guestRequirements: "Orders of 2 or more thalis are preferred. Please mention spice preferences and allergies.",
        accessibility: "Delivery to your door or building entrance. Message the host for accessibility details.",
        qualifications: [
            { title: "18 years of home cooking", description: "I have fed my family and neighbourhood with traditional Maharashtrian recipes." },
            { title: "Local food award", description: "Won best home kitchen at a Pune community food fair." },
            { title: "FSSAI licensed kitchen", description: "My kitchen follows food safety and hygiene regulations." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&q=80",
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
            "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80"
        ],
        serviceArea: {
            description: "I deliver in Kothrud, Baner, Aundh and Shivajinagar.",
            address: "Kothrud, Pune, Maharashtra, 411038"
        },
        thingsToKnow: {
            guestRequirements: "Orders of 2 or more thalis are preferred. Please mention spice preferences and allergies.",
            accessibility: "Delivery to your door or building entrance. Message the host for accessibility details.",
            cancellationPolicy: "Free cancellation up to 6 hours before the scheduled delivery."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Hyderabadi dum biryani party platter",
        serviceType: "Prepared meals",
        location: "Hyderabad, Telangana",
        price: 2400,
        unit: "group",
        duration: "1 hr",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1200&q=80",
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80",
            "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=80"
        ],
        rating: 4.9,
        reviewCount: 212,
        description: "Authentic slow-cooked dum biryani sealed and delivered in a handi, with mirchi ka salan, raita and double ka meetha. One platter comfortably serves 4 to 5 people.",
        providedAt: "delivered to your door",
        host: {
            name: "Farhan Qureshi",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
            role: "Chef & Biryani Specialist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 24 hours before delivery for a full refund."
        },
        guestRequirements: "Pre-order at least one day in advance. Vegetarian biryani available on request.",
        accessibility: "Delivery to your door. Message the host for accessibility details.",
        qualifications: [
            { title: "14 years of experience", description: "My family has cooked Hyderabadi biryani for three generations." },
            { title: "Wedding catering background", description: "I have cooked biryani for events of up to 500 guests." },
            { title: "Top-rated home kitchen", description: "Consistently among the top-reviewed biryani makers in Old City." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80",
            "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&q=80",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
        ],
        serviceArea: {
            description: "I deliver across Hyderabad including Charminar, Banjara Hills and Gachibowli.",
            address: "Charminar, Hyderabad, Telangana, 500002"
        },
        thingsToKnow: {
            guestRequirements: "Pre-order at least one day in advance. Vegetarian biryani available on request.",
            accessibility: "Delivery to your door. Message the host for accessibility details.",
            cancellationPolicy: "Cancel up to 24 hours before delivery for a full refund."
        },
        highlight: true,
        isPopular: false
    },
    {
        title: "Gourmet Punjabi home meals for families",
        serviceType: "Prepared meals",
        location: "North Delhi, Delhi",
        price: 1800,
        unit: "group",
        duration: "1 hr",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1200&q=80",
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80",
            "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80"
        ],
        rating: 4.6,
        reviewCount: 48,
        description: "Family-sized trays of dal makhani, paneer butter masala, jeera rice and fresh rotis, made with homemade ghee and ground spices. Perfect for weekend lunches and small gatherings.",
        providedAt: "delivered to your door",
        host: {
            name: "Harpreet Gill",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
            role: "Home Chef"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 12 hours before delivery."
        },
        guestRequirements: "A tray serves 3 to 4 people. Jain and low-oil options are available with advance notice.",
        accessibility: "Delivery to your door or gate. Message the host for accessibility details.",
        qualifications: [
            { title: "10 years of home catering", description: "I started by cooking for neighbours in Model Town and grew through word of mouth." },
            { title: "Gurdwara langar experience", description: "I have cooked for community kitchens serving thousands." },
            { title: "FSSAI registered", description: "My kitchen is registered and regularly inspected." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
            "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
        ],
        serviceArea: {
            description: "I deliver in Model Town, Civil Lines, Pitampura and Rohini.",
            address: "Model Town, North Delhi, Delhi, 110009"
        },
        thingsToKnow: {
            guestRequirements: "A tray serves 3 to 4 people. Jain and low-oil options are available with advance notice.",
            accessibility: "Delivery to your door or gate. Message the host for accessibility details.",
            cancellationPolicy: "Free cancellation up to 12 hours before delivery."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Sunrise yoga and breathwork on the beach",
        serviceType: "Training",
        location: "South Goa, Goa",
        price: 1500,
        unit: "guest",
        duration: "1 hr 30 mins",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
            "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&q=80",
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80"
        ],
        rating: 4.9,
        reviewCount: 158,
        description: "Start your morning with a gentle Hatha yoga flow and guided pranayama as the sun rises over Palolem beach. Suitable for beginners and experienced practitioners alike.",
        providedAt: "Palolem beach",
        host: {
            name: "Ananya Prabhu",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
            role: "Yoga Instructor"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 12 hours before the class for a full refund. Classes cancelled due to weather are rescheduled free."
        },
        guestRequirements: "Participants should wear comfortable clothing and bring water. Yoga mats are provided.",
        accessibility: "Sessions are on soft sand. Message the host to arrange a firmer surface if needed.",
        qualifications: [
            { title: "500-hour yoga teacher training", description: "I am certified through a Yoga Alliance registered school in Rishikesh." },
            { title: "8 years of teaching", description: "I have taught at wellness retreats and beach resorts across Goa." },
            { title: "Breathwork specialist", description: "I am trained in pranayama and meditation techniques for stress and sleep." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
            "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80",
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
        ],
        serviceArea: {
            description: "I teach at beaches and villas around Palolem, Patnem and Agonda.",
            address: "Palolem, South Goa, Goa, 403702"
        },
        thingsToKnow: {
            guestRequirements: "Participants should wear comfortable clothing and bring water. Yoga mats are provided.",
            accessibility: "Sessions are on soft sand. Message the host to arrange a firmer surface if needed.",
            cancellationPolicy: "Cancel up to 12 hours before the class for a full refund. Classes cancelled due to weather are rescheduled free."
        },
        highlight: true,
        isPopular: true
    },
    {
        title: "Personal strength training session",
        serviceType: "Training",
        location: "Bengaluru, Karnataka",
        price: 2500,
        unit: "guest",
        duration: "1 hr",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
            "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200&q=80"
        ],
        rating: 4.8,
        reviewCount: 66,
        description: "A one-on-one strength and conditioning session designed around your goals, whether fat loss, muscle gain or mobility. I guide your form, programme and progression step by step.",
        providedAt: "a partner gym in Indiranagar",
        host: {
            name: "Karthik Shetty",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
            role: "Fitness Coach"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel at least 6 hours before the session for a full refund."
        },
        guestRequirements: "Participants should wear gym clothing and sports shoes. Please share any injuries beforehand.",
        accessibility: "The gym has lift access. Message the host to discuss adaptive training options.",
        qualifications: [
            { title: "9 years of coaching", description: "I have trained over 300 clients in Bengaluru." },
            { title: "ACE certified personal trainer", description: "I hold an internationally recognised personal training certification." },
            { title: "Former state-level athlete", description: "I competed in powerlifting at the state level for five years." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
        ],
        serviceArea: {
            description: "Sessions at partner gyms in Indiranagar and Koramangala.",
            address: "Indiranagar, Bengaluru, Karnataka, 560038"
        },
        thingsToKnow: {
            guestRequirements: "Participants should wear gym clothing and sports shoes. Please share any injuries beforehand.",
            accessibility: "The gym has lift access. Message the host to discuss adaptive training options.",
            cancellationPolicy: "Cancel at least 6 hours before the session for a full refund."
        },
        highlight: true,
        isPopular: false
    },
    {
        title: "Dance fitness inspired by Bharatanatyam",
        serviceType: "Training",
        location: "Chennai, Tamil Nadu",
        price: 1800,
        unit: "guest",
        duration: "1 hr 30 mins",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200&q=80",
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
            "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&q=80"
        ],
        rating: 4.7,
        reviewCount: 29,
        description: "A joyful, high-energy workout using Bharatanatyam footwork, hand gestures and music from the classical tradition. No dance experience is needed, just good energy.",
        providedAt: "my dance studio",
        host: {
            name: "Kavitha Raman",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
            role: "Dance & Fitness Instructor"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 24 hours before the class."
        },
        guestRequirements: "Participants should wear comfortable clothing and bring water. Barefoot or light socks recommended.",
        accessibility: "Studio is on the ground floor. Message your host for accessibility details.",
        qualifications: [
            { title: "Trained Bharatanatyam dancer", description: "I completed my arangetram and have performed for over 15 years." },
            { title: "Fitness instructor certificate", description: "I hold a group fitness certification for low-impact cardio." },
            { title: "Community workshop leader", description: "I run weekend classes for women's groups in Chennai." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"
        ],
        serviceArea: {
            description: "Classes at my studio in Mylapore; private sessions available across Chennai.",
            address: "Mylapore, Chennai, Tamil Nadu, 600004"
        },
        thingsToKnow: {
            guestRequirements: "Participants should wear comfortable clothing and bring water. Barefoot or light socks recommended.",
            accessibility: "Studio is on the ground floor. Message your host for accessibility details.",
            cancellationPolicy: "Free cancellation up to 24 hours before the class."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "At-home boxing and HIIT bootcamp",
        serviceType: "Training",
        location: "South Delhi, Delhi",
        price: 4500,
        unit: "group",
        duration: "1 hr",
        image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80"
        ],
        rating: 4.8,
        reviewCount: 45,
        description: "A high-intensity session mixing boxing drills, bodyweight circuits and core work for up to 5 people. I bring gloves, pads and resistance bands to your home or terrace.",
        providedAt: "your home or terrace",
        host: {
            name: "Rahul Bisht",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
            role: "Fitness Coach"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel at least 1 day before the start time for a full refund."
        },
        guestRequirements: "Participants should wear comfortable clothing and sports shoes, and bring water. Guests must be 14 or older.",
        accessibility: "Needs an open space of about 3 by 3 metres per person. Message the host for accessibility details.",
        qualifications: [
            { title: "7 years of coaching", description: "I train working professionals and small groups across Delhi." },
            { title: "National-level boxer", description: "I represented Delhi at the national boxing championship." },
            { title: "First aid certified", description: "I hold a current first aid and CPR certification." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
            "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80"
        ],
        serviceArea: {
            description: "I travel to homes in Saket, Defence Colony, Greater Kailash and Vasant Kunj.",
            address: "Saket, South Delhi, Delhi, 110017"
        },
        thingsToKnow: {
            guestRequirements: "Participants should wear comfortable clothing and sports shoes, and bring water. Guests must be 14 or older.",
            accessibility: "Needs an open space of about 3 by 3 metres per person. Message the host for accessibility details.",
            cancellationPolicy: "Cancel at least 1 day before the start time for a full refund."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Bridal make-up and styling in Delhi",
        serviceType: "Make-up",
        location: "New Delhi, Delhi",
        price: 14500,
        unit: "guest",
        duration: "3 hrs",
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80",
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80",
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&q=80"
        ],
        rating: 4.9,
        reviewCount: 131,
        description: "Complete bridal make-up with HD airbrush finish, lashes and dupatta setting, done at your home or venue. I begin with a skin consultation so your look lasts through long ceremonies.",
        providedAt: "your home or wedding venue",
        host: {
            name: "Ritika Chawla",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
            role: "Make-up Artist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel at least 7 days before the booking for a full refund."
        },
        guestRequirements: "Guests should arrive with a clean, moisturised face for the best results. A trial session is recommended beforehand.",
        accessibility: "I need a well-lit space with a chair and mirror. Message the host for accessibility details.",
        qualifications: [
            { title: "10 years of bridal experience", description: "I have styled over 600 brides across Delhi NCR." },
            { title: "Professional make-up certification", description: "I trained at a leading beauty academy in Delhi." },
            { title: "Featured in wedding magazines", description: "My bridal work has been published in regional wedding publications." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
            "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&q=80",
            "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
        ],
        serviceArea: {
            description: "I travel to homes and venues across Delhi NCR.",
            address: "Greater Kailash, New Delhi, Delhi, 110048"
        },
        thingsToKnow: {
            guestRequirements: "Guests should arrive with a clean, moisturised face for the best results. A trial session is recommended beforehand.",
            accessibility: "I need a well-lit space with a chair and mirror. Message the host for accessibility details.",
            cancellationPolicy: "Cancel at least 7 days before the booking for a full refund."
        },
        highlight: true,
        isPopular: false
    },
    {
        title: "Party glam make-up in Mumbai",
        serviceType: "Make-up",
        location: "Mumbai, Maharashtra",
        price: 4800,
        unit: "guest",
        duration: "1 hr 30 mins",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80",
            "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&q=80",
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80"
        ],
        rating: 4.7,
        reviewCount: 94,
        description: "A polished glam look for cocktail nights, engagements and photoshoots, tailored to your outfit and skin tone. I use cruelty-free, long-wear products that stay put in Mumbai humidity.",
        providedAt: "your home or hotel",
        host: {
            name: "Zoya Khan",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
            role: "Make-up Artist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 48 hours before the booking."
        },
        guestRequirements: "Please inform the host about skin allergies and bring a photo of your outfit.",
        accessibility: "I need a chair near a window or bright light. Message the host for accessibility details.",
        qualifications: [
            { title: "6 years of experience", description: "I work with models, influencers and event clients in Mumbai." },
            { title: "Certified make-up artist", description: "I completed a professional course with special focus on HD and editorial looks." },
            { title: "Fashion week assistant", description: "I assisted a senior artist backstage at Lakme Fashion Week." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
            "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&q=80",
            "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80"
        ],
        serviceArea: {
            description: "I travel across Mumbai from Colaba to Andheri and Navi Mumbai on request.",
            address: "Juhu, Mumbai, Maharashtra, 400049"
        },
        thingsToKnow: {
            guestRequirements: "Please inform the host about skin allergies and bring a photo of your outfit.",
            accessibility: "I need a chair near a window or bright light. Message the host for accessibility details.",
            cancellationPolicy: "Free cancellation up to 48 hours before the booking."
        },
        highlight: false,
        isPopular: true
    },
    {
        title: "South Indian bridal and festive make-up",
        serviceType: "Make-up",
        location: "Chennai, Tamil Nadu",
        price: 6200,
        unit: "guest",
        duration: "2 hrs",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&q=80",
            "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80",
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80"
        ],
        rating: 4.8,
        reviewCount: 62,
        description: "Traditional and contemporary make-up for weddings, pongal celebrations and temple functions, coordinated with silk sarees and jewellery. I also offer draping and hair styling as an add-on.",
        providedAt: "your home or function hall",
        host: {
            name: "Deepa Krishnan",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
            role: "Make-up Artist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 3 days before the booking for a full refund."
        },
        guestRequirements: "Guests should arrive with a clean face and inform the host of any skin sensitivities.",
        accessibility: "I need a stable chair and power socket. Message the host for accessibility details.",
        qualifications: [
            { title: "8 years of experience", description: "I have worked with families and wedding planners across Tamil Nadu." },
            { title: "Saree draping specialist", description: "I am trained in Kanjeevaram and Bengal cotton draping styles." },
            { title: "Beauty therapy diploma", description: "I studied skincare and make-up at a Chennai beauty institute." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
            "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&q=80",
            "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80"
        ],
        serviceArea: {
            description: "I serve guests in T. Nagar, Adyar, Anna Nagar and OMR.",
            address: "Adyar, Chennai, Tamil Nadu, 600020"
        },
        thingsToKnow: {
            guestRequirements: "Guests should arrive with a clean face and inform the host of any skin sensitivities.",
            accessibility: "I need a stable chair and power socket. Message the host for accessibility details.",
            cancellationPolicy: "Cancel up to 3 days before the booking for a full refund."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Rajasthani wedding guest make-up",
        serviceType: "Make-up",
        location: "Jaipur, Rajasthan",
        price: 8900,
        unit: "guest",
        duration: "2 hrs",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1200&q=80",
            "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80",
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80"
        ],
        rating: 4.6,
        reviewCount: 25,
        description: "A bold, regal look that complements lehengas, bandhani and polki jewellery. I match the intensity of the colours to your outfit so you stand out beautifully at destination weddings.",
        providedAt: "your hotel or palace venue",
        host: {
            name: "Shruti Singh",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
            role: "Make-up Artist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel at least 2 days before the booking for a full refund."
        },
        guestRequirements: "Guests should arrive with a clean face. Please share outfit and jewellery photos beforehand.",
        accessibility: "I can work in any well-lit room. Ground-floor setup available on request.",
        qualifications: [
            { title: "5 years of experience", description: "I have worked with destination wedding guests at Jaipur's heritage hotels." },
            { title: "Professional make-up course", description: "I trained in bridal and party make-up at a Jaipur academy." },
            { title: "Hotel partnership", description: "I am a preferred beauty partner for two heritage hotels in the city." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
            "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
        ],
        serviceArea: {
            description: "I travel to hotels and venues around Jaipur, including Amer and Sanganer.",
            address: "Civil Lines, Jaipur, Rajasthan, 302006"
        },
        thingsToKnow: {
            guestRequirements: "Guests should arrive with a clean face. Please share outfit and jewellery photos beforehand.",
            accessibility: "I can work in any well-lit room. Ground-floor setup available on request.",
            cancellationPolicy: "Cancel at least 2 days before the booking for a full refund."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Blow-dry and occasion hairstyling in Delhi",
        serviceType: "Hair",
        location: "New Delhi, Delhi",
        price: 3200,
        unit: "guest",
        duration: "1 hr 30 mins",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
            "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200&q=80",
            "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&q=80"
        ],
        rating: 4.8,
        reviewCount: 82,
        description: "Get a voluminous blow-dry, soft curls or an elegant updo at home before your event. I use heat protection and professional tools so your hair stays healthy and styled for hours.",
        providedAt: "your home",
        host: {
            name: "Simran Bhatia",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
            role: "Hair Stylist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 24 hours before the booking for a full refund."
        },
        guestRequirements: "Arrive with clean, dry hair for best results. Please share inspiration photos in advance.",
        accessibility: "Styling can be done seated. Message your host for accessibility details.",
        qualifications: [
            { title: "8 years of experience", description: "I have worked in top Delhi salons and for private bridal clients." },
            { title: "Advanced styling diploma", description: "I trained in modern cutting and styling at a leading hair academy." },
            { title: "Bridal hair specialist", description: "I have styled more than 250 wedding and sangeet looks." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
            "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
            "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80"
        ],
        serviceArea: {
            description: "I visit homes and hotels across New Delhi, Gurugram and Noida.",
            address: "Defence Colony, New Delhi, Delhi, 110024"
        },
        thingsToKnow: {
            guestRequirements: "Arrive with clean, dry hair for best results. Please share inspiration photos in advance.",
            accessibility: "Styling can be done seated. Message your host for accessibility details.",
            cancellationPolicy: "Cancel up to 24 hours before the booking for a full refund."
        },
        highlight: false,
        isPopular: true
    },
    {
        title: "Celebrity-style haircut and colour consultation",
        serviceType: "Hair",
        location: "Mumbai, Maharashtra",
        price: 5400,
        unit: "guest",
        duration: "1 hr 30 mins",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&q=80",
            "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=80",
            "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200&q=80"
        ],
        rating: 4.9,
        reviewCount: 69,
        description: "A personalised haircut and colour consultation based on your face shape, lifestyle and hair type. Includes a precision cut, gloss treatment and a styling guide to recreate the look at home.",
        providedAt: "my private studio",
        host: {
            name: "Aisha Merchant",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
            role: "Hair Stylist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 48 hours before the session."
        },
        guestRequirements: "Please share your hair history, including recent colouring or chemical treatments. Guests must be 12 or older.",
        accessibility: "Studio is on the ground floor with wide entrance. Message the host for accessibility details.",
        qualifications: [
            { title: "10 years of experience", description: "I have styled hair for fashion shoots and private clients in Mumbai." },
            { title: "International colour certification", description: "I completed advanced colour courses with a global hair brand." },
            { title: "Editorial hair artist", description: "My work has appeared in fashion magazine shoots." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
            "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
            "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80"
        ],
        serviceArea: {
            description: "Sessions at my studio in Bandra; home visits available within Mumbai for an extra fee.",
            address: "Bandra West, Mumbai, Maharashtra, 400050"
        },
        thingsToKnow: {
            guestRequirements: "Please share your hair history, including recent colouring or chemical treatments. Guests must be 12 or older.",
            accessibility: "Studio is on the ground floor with wide entrance. Message the host for accessibility details.",
            cancellationPolicy: "Free cancellation up to 48 hours before the session."
        },
        highlight: true,
        isPopular: false
    },
    {
        title: "Hair spa and oil therapy in Kochi",
        serviceType: "Hair",
        location: "Kochi, Kerala",
        price: 1800,
        unit: "guest",
        duration: "1 hr",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&q=80",
            "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&q=80",
            "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1200&q=80"
        ],
        rating: 4.7,
        reviewCount: 37,
        description: "A nourishing hair spa using warm coconut and amla oils, a gentle scalp massage and steam treatment. Ideal for humid weather, frizz and hair fall concerns.",
        providedAt: "your home",
        host: {
            name: "Remya Thomas",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
            role: "Hair Stylist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 12 hours before the booking for a full refund."
        },
        guestRequirements: "Inform the host about any scalp conditions or allergies to oils before booking.",
        accessibility: "The treatment can be done seated. Message the host for accessibility details.",
        qualifications: [
            { title: "6 years of experience", description: "I have treated hair and scalp concerns at salons in Kochi and Thrissur." },
            { title: "Trichology basics course", description: "I completed a short course on scalp health and hair fall management." },
            { title: "Natural oil specialist", description: "I prepare herbal oils using traditional Kerala recipes." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
            "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
            "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80"
        ],
        serviceArea: {
            description: "I visit homes in Edappally, Kakkanad, Fort Kochi and Marine Drive.",
            address: "Edappally, Kochi, Kerala, 682024"
        },
        thingsToKnow: {
            guestRequirements: "Inform the host about any scalp conditions or allergies to oils before booking.",
            accessibility: "The treatment can be done seated. Message the host for accessibility details.",
            cancellationPolicy: "Cancel up to 12 hours before the booking for a full refund."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Keratin smoothing and styling studio session",
        serviceType: "Hair",
        location: "Bengaluru, Karnataka",
        price: 7900,
        unit: "guest",
        duration: "3 hrs",
        image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200&q=80",
            "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1200&q=80",
            "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&q=80"
        ],
        rating: 4.6,
        reviewCount: 51,
        description: "A formaldehyde-free keratin smoothing treatment followed by a blow-dry and styling. Get frizz-free, glossy hair that lasts up to four months with proper care.",
        providedAt: "my salon studio",
        host: {
            name: "Mahesh Hegde",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
            role: "Hair Stylist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 48 hours before the booking for a full refund."
        },
        guestRequirements: "Hair should not have been chemically treated in the last two weeks. Please arrive with unwashed hair.",
        accessibility: "Studio is on the first floor with lift access. Message the host for accessibility details.",
        qualifications: [
            { title: "12 years of experience", description: "I have managed hair departments at leading Bengaluru salons." },
            { title: "Keratin and smoothing certified", description: "I am certified by a professional haircare brand for smoothing treatments." },
            { title: "Hair education trainer", description: "I train junior stylists at a Bengaluru hair academy." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
            "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
            "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
        ],
        serviceArea: {
            description: "Sessions at my studio in Jayanagar, with appointments Tuesday to Sunday.",
            address: "Jayanagar 4th Block, Bengaluru, Karnataka, 560011"
        },
        thingsToKnow: {
            guestRequirements: "Hair should not have been chemically treated in the last two weeks. Please arrive with unwashed hair.",
            accessibility: "Studio is on the first floor with lift access. Message the host for accessibility details.",
            cancellationPolicy: "Cancel up to 48 hours before the booking for a full refund."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Beachside detox spa ritual",
        serviceType: "Spa treatments",
        location: "North Goa, Goa",
        price: 6800,
        unit: "guest",
        duration: "2 hrs",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1200&q=80",
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80"
        ],
        rating: 4.9,
        reviewCount: 88,
        description: "A two-hour detox ritual with a coconut body scrub, herbal wrap, facial massage and a soothing foot soak. Enjoy it on your villa balcony with the sea breeze for company.",
        providedAt: "your villa",
        host: {
            name: "Tara Pinto",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
            role: "Spa Therapist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel at least 1 day before the session for a full refund."
        },
        guestRequirements: "Guests must be 18 or older. Please share skin allergies and pregnancy status before booking.",
        accessibility: "Needs a flat area for the treatment bed. Ground-floor setup available on request.",
        qualifications: [
            { title: "9 years of experience", description: "I have worked in resort spas in Goa and Kerala." },
            { title: "International spa therapy diploma", description: "I trained in body treatments and skincare therapies." },
            { title: "Organic products specialist", description: "I use locally made organic scrubs and oils." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
            "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
            "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80"
        ],
        serviceArea: {
            description: "I visit villas in Assagao, Vagator, Anjuna and Candolim.",
            address: "Assagao, North Goa, Goa, 403507"
        },
        thingsToKnow: {
            guestRequirements: "Guests must be 18 or older. Please share skin allergies and pregnancy status before booking.",
            accessibility: "Needs a flat area for the treatment bed. Ground-floor setup available on request.",
            cancellationPolicy: "Cancel at least 1 day before the session for a full refund."
        },
        highlight: true,
        isPopular: false
    },
    {
        title: "Signature facial and skin glow session",
        serviceType: "Spa treatments",
        location: "New Delhi, Delhi",
        price: 4900,
        unit: "guest",
        duration: "2 hrs",
        image: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
            "https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&q=80"
        ],
        rating: 4.8,
        reviewCount: 102,
        description: "A deep-cleansing facial with exfoliation, steam, massage and a hydrating mask suited to Delhi's dry weather and pollution. Includes a skincare routine recommendation after the session.",
        providedAt: "your home",
        host: {
            name: "Nidhi Arora",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
            role: "Skin & Spa Therapist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 24 hours before the session."
        },
        guestRequirements: "Guests should avoid waxing or threading on the day. Inform the host about skin allergies.",
        accessibility: "Treatment is done on a reclining chair or bed. Message the host for accessibility details.",
        qualifications: [
            { title: "8 years of experience", description: "I work with private clients across Delhi, focusing on skincare and relaxation." },
            { title: "Cosmetology diploma", description: "I studied aesthetics and skin science at a recognised institute." },
            { title: "Sensitive skin specialist", description: "I am trained in treatments for acne-prone and sensitive skin." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
            "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80",
            "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80"
        ],
        serviceArea: {
            description: "I visit homes across New Delhi, Gurugram and Noida.",
            address: "Vasant Vihar, New Delhi, Delhi, 110057"
        },
        thingsToKnow: {
            guestRequirements: "Guests should avoid waxing or threading on the day. Inform the host about skin allergies.",
            accessibility: "Treatment is done on a reclining chair or bed. Message the host for accessibility details.",
            cancellationPolicy: "Free cancellation up to 24 hours before the session."
        },
        highlight: false,
        isPopular: true
    },
    {
        title: "Couples spa evening in Hyderabad",
        serviceType: "Spa treatments",
        location: "Hyderabad, Telangana",
        price: 9800,
        unit: "group",
        duration: "2 hrs",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
            "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80",
            "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1200&q=80"
        ],
        rating: 4.7,
        reviewCount: 23,
        description: "A romantic spa evening for two, including aromatherapy massage, foot ritual and a calming herbal tea. Candles, soft music and oils are provided in your home or hotel suite.",
        providedAt: "your home or hotel suite",
        host: {
            name: "Sana Hussain",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
            role: "Spa Therapist"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 48 hours before the session for a full refund."
        },
        guestRequirements: "Suitable for two adults. Please share health conditions and allergies when booking.",
        accessibility: "Requires floor space for two treatment beds. Message the host for accessibility details.",
        qualifications: [
            { title: "7 years of experience", description: "I have worked at boutique spas in Jubilee Hills and Banjara Hills." },
            { title: "Aromatherapy certification", description: "I am trained in essential oil blending for relaxation and sleep." },
            { title: "Couples therapy specialist", description: "I design treatments for anniversaries and honeymoon stays." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
            "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800&q=80",
            "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80"
        ],
        serviceArea: {
            description: "I visit homes and hotels in Jubilee Hills, Banjara Hills and Hitec City.",
            address: "Jubilee Hills, Hyderabad, Telangana, 500033"
        },
        thingsToKnow: {
            guestRequirements: "Suitable for two adults. Please share health conditions and allergies when booking.",
            accessibility: "Requires floor space for two treatment beds. Message the host for accessibility details.",
            cancellationPolicy: "Cancel up to 48 hours before the session for a full refund."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Goan beach party catering for groups",
        serviceType: "Catering",
        location: "South Goa, Goa",
        price: 18500,
        unit: "group",
        duration: "4 hrs",
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=1200&q=80",
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80",
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80"
        ],
        rating: 4.8,
        reviewCount: 46,
        description: "A relaxed barbecue and seafood buffet for up to 25 guests, with live grill stations, Goan sides and desserts. My team handles setup, service and clean-up so you can enjoy the party.",
        providedAt: "your villa or beach venue",
        host: {
            name: "Joaquim Fernandes",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
            role: "Chef & Caterer"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel at least 3 days before the event for a full refund."
        },
        guestRequirements: "Suitable for groups of 10 to 25 guests. Please confirm dietary needs a week in advance.",
        accessibility: "We need vehicle access to the venue for equipment. Message the host for accessibility details.",
        qualifications: [
            { title: "14 years in hospitality", description: "I have managed catering at beach resorts and wedding venues across Goa." },
            { title: "Event catering specialist", description: "We cater more than 80 private events each year." },
            { title: "Hygiene certified team", description: "My team holds food safety training and follows strict kitchen standards." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
            "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
        ],
        serviceArea: {
            description: "We cater at villas and beaches across South Goa, from Colva to Agonda.",
            address: "Colva, South Goa, Goa, 403708"
        },
        thingsToKnow: {
            guestRequirements: "Suitable for groups of 10 to 25 guests. Please confirm dietary needs a week in advance.",
            accessibility: "We need vehicle access to the venue for equipment. Message the host for accessibility details.",
            cancellationPolicy: "Cancel at least 3 days before the event for a full refund."
        },
        highlight: true,
        isPopular: false
    },
    {
        title: "Kerala feast catering for family functions",
        serviceType: "Catering",
        location: "Kochi, Kerala",
        price: 16800,
        unit: "group",
        duration: "4 hrs",
        image: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80",
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80",
            "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80"
        ],
        rating: 4.9,
        reviewCount: 73,
        description: "A traditional Kerala spread for birthdays, housewarmings and small weddings, served buffet-style or on banana leaves. Menus include appam, stew, beef fry, fish molee and payasam.",
        providedAt: "your home or function hall",
        host: {
            name: "Thomas Kurian",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
            role: "Chef & Caterer"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel up to 5 days before the event for a full refund."
        },
        guestRequirements: "Suitable for 20 to 60 guests. Vegetarian and non-vegetarian menus available.",
        accessibility: "Serving can be arranged at ground level. Message your host for accessibility details.",
        qualifications: [
            { title: "16 years of catering", description: "My family has catered Kerala weddings and church events since 2005." },
            { title: "Regional menu expert", description: "I specialise in Syrian Christian and Malabar cuisine." },
            { title: "Trained service staff", description: "My team includes professional cooks and hospitality-trained servers." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
            "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80"
        ],
        serviceArea: {
            description: "We cater across Ernakulam district, including Kochi, Aluva and Tripunithura.",
            address: "Kadavanthra, Kochi, Kerala, 682020"
        },
        thingsToKnow: {
            guestRequirements: "Suitable for 20 to 60 guests. Vegetarian and non-vegetarian menus available.",
            accessibility: "Serving can be arranged at ground level. Message your host for accessibility details.",
            cancellationPolicy: "Cancel up to 5 days before the event for a full refund."
        },
        highlight: false,
        isPopular: true
    },
    {
        title: "Premium cocktail party catering in Delhi",
        serviceType: "Catering",
        location: "North Delhi, Delhi",
        price: 22900,
        unit: "group",
        duration: "4 hrs",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80",
            "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80",
            "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=1200&q=80"
        ],
        rating: 4.7,
        reviewCount: 39,
        description: "Finger food, live chaat counters, tandoori starters and mini desserts for cocktail evenings and birthday parties. Includes uniformed staff, crockery and buffet styling.",
        providedAt: "your home or banquet",
        host: {
            name: "Mohit Bansal",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
            role: "Chef & Caterer"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Cancel at least 4 days before the event for a full refund."
        },
        guestRequirements: "Minimum 25 guests. Jain, vegan and gluten-free options available on request.",
        accessibility: "We need a clear service area and power access. Message the host for accessibility details.",
        qualifications: [
            { title: "13 years of experience", description: "I have catered corporate and family events across North Delhi and NCR." },
            { title: "Hotel management graduate", description: "I trained in food production at a hotel management institute." },
            { title: "Catered 300+ events", description: "I handle weddings, engagements and corporate parties of all sizes." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80"
        ],
        serviceArea: {
            description: "We serve North Delhi, Civil Lines, Rohini and Model Town.",
            address: "Civil Lines, North Delhi, Delhi, 110054"
        },
        thingsToKnow: {
            guestRequirements: "Minimum 25 guests. Jain, vegan and gluten-free options available on request.",
            accessibility: "We need a clear service area and power access. Message the host for accessibility details.",
            cancellationPolicy: "Cancel at least 4 days before the event for a full refund."
        },
        highlight: false,
        isPopular: false
    },
    {
        title: "Traditional Maharashtrian wedding lunch catering",
        serviceType: "Catering",
        location: "Pune, Maharashtra",
        price: 12400,
        unit: "group",
        duration: "3 hrs",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80",
            "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80"
        ],
        rating: 4.6,
        reviewCount: 31,
        description: "A vegetarian Maharashtrian thali spread for small weddings, pujas and housewarming ceremonies, served on traditional plates. Menu includes masale bhaat, aamti, shrikhand and puran poli.",
        providedAt: "your home or hall",
        host: {
            name: "Prakash Joshi",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
            role: "Chef & Caterer"
        },
        cancellationPolicy: {
            type: "Free cancellation",
            description: "Free cancellation up to 72 hours before the event."
        },
        guestRequirements: "Suitable for 30 to 100 guests. Menu is pure vegetarian.",
        accessibility: "Service can be arranged for seated guests. Message the host for accessibility details.",
        qualifications: [
            { title: "19 years in catering", description: "My family catering business has served Pune since 2003." },
            { title: "Ritual food specialist", description: "I am experienced in preparing food for religious ceremonies." },
            { title: "FSSAI licensed", description: "Our kitchen is licensed and regularly inspected." }
        ],
        portfolio: [
            "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80",
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
            "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&q=80"
        ],
        serviceArea: {
            description: "We cater across Pune city, Pimpri-Chinchwad and nearby suburbs.",
            address: "Shivajinagar, Pune, Maharashtra, 411005"
        },
        thingsToKnow: {
            guestRequirements: "Suitable for 30 to 100 guests. Menu is pure vegetarian.",
            accessibility: "Service can be arranged for seated guests. Message the host for accessibility details.",
            cancellationPolicy: "Free cancellation up to 72 hours before the event."
        },
        highlight: false,
        isPopular: false
    }
];
async function seedServices() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully");

        await Service.deleteMany({});

        console.log("Old services deleted");

        await Service.insertMany(services);

        console.log(`${services.length} services inserted successfully`);
    } catch (error) {
        console.error("Seeding failed:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    }
}

seedServices();
// ==========================================================================
// Mock Dataset for Airbnb UI:
// - Navigation tabs: All, Homes, Experiences, Services
// - Destinations for you (cities)
// - Indian stays (Ernakulam, Kochi, Kakkanad, Bengaluru)
// - INR (₹) pricing with strike-through original prices
// - Map coordinates for interactive price pins
// ==========================================================================

export const NAV_TABS = [
  { id: "all", label: "All", icon: "🏆" },
  { id: "homes", label: "Homes", icon: "🏠" },
  { id: "experiences", label: "Experiences", icon: "🎈" },
  { id: "services", label: "Services", icon: "🛎️" }
];

export const DESTINATIONS = [
  { id: "d-1", city: "Kuala Lumpur", subtitle: "For the Petronas Towers", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=300&q=80" },
  { id: "d-2", city: "Dubai", subtitle: "Prime beach spot", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=80" },
  { id: "d-3", city: "Bangkok", subtitle: "Vibrant nightlife", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=300&q=80" },
  { id: "d-4", city: "Paris", subtitle: "Epic architecture", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80" },
  { id: "d-5", city: "Istanbul", subtitle: "World-class dining", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=300&q=80" },
  { id: "d-6", city: "Melbourne", subtitle: "For a trip abroad", image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=300&q=80" },
  { id: "d-7", city: "London", subtitle: "Epic architecture", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=300&q=80" },
  { id: "d-8", city: "Osaka", subtitle: "World-class dining", image: "https://images.unsplash.com/photo-1590559899731-a372a146ff97?auto=format&fit=crop&w=300&q=80" }
];

export const CATEGORIES = [
  { id: "all", label: "All Homes", icon: "🏠" },
  { id: "ernakulam", label: "Ernakulam", icon: "🌴" },
  { id: "kochi", label: "Kochi", icon: "⛵" },
  { id: "bengaluru", label: "Bengaluru", icon: "🏙️" },
  { id: "trending", label: "Trending", icon: "🔥" }
];

export const LISTINGS = [
  {
    id: "stay-001",
    title: "Relaxing 2BHK Stay for Families/Friends In Kochi",
    category: "kochi",
    propertyType: "Home in Kochi",
    location: "Kochi, Kerala",
    country: "India",
    rating: 4.93,
    reviewsCount: 43,
    pricePerNight: 2500,
    originalPrice: 2899,
    taxes: 125,
    cleaningFee: 350,
    serviceFee: 180,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    guestFavorite: true,
    mapCoords: { top: "62%", left: "42%" },
    host: {
      name: "Suresh & Meera",
      isSuperhost: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      joinedYear: "2020",
      badgeText: "Superhost · 8 months hosting"
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Centrally located 2BHK apartment ideal for families and friends visiting Kochi. Complete with high-speed Wi-Fi, air-conditioned bedrooms, equipped kitchen, and balcony overlooking lush green residential streets.",
    amenities: [
      { name: "Balcony view", icon: "🌴" },
      { name: "Air conditioning", icon: "❄️" },
      { name: "Fast Wi-Fi", icon: "📶" },
      { name: "Dedicated workspace", icon: "💻" },
      { name: "Free parking on premises", icon: "🚗" },
      { name: "Kitchen with cookware", icon: "🍳" },
      { name: "Washing machine", icon: "🧺" }
    ]
  },
  {
    id: "stay-002",
    title: "Boho Bloom-A Cozy Bohemian Escape! Kaloor",
    category: "ernakulam",
    propertyType: "Flat in Ernakulam",
    location: "Kaloor, Ernakulam",
    country: "India",
    rating: 4.92,
    reviewsCount: 12,
    pricePerNight: 3399,
    originalPrice: 4248,
    taxes: 170,
    cleaningFee: 400,
    serviceFee: 220,
    maxGuests: 3,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    guestFavorite: true,
    mapCoords: { top: "40%", left: "48%" },
    host: {
      name: "Ananya",
      isSuperhost: true,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      joinedYear: "2021",
      badgeText: "Superhost · 2 years hosting"
    },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Boho-chic designer apartment located in the prime hub of Kaloor, close to the Kochi metro station and premier dining spots.",
    amenities: [
      { name: "City skyline view", icon: "🏙️" },
      { name: "High-speed Wi-Fi", icon: "📶" },
      { name: "Smart TV with Netflix", icon: "📺" },
      { name: "Elevator access", icon: "🛗" },
      { name: "Kitchen", icon: "🍳" }
    ]
  },
  {
    id: "stay-003",
    title: "3BHK! Serene: The Rhythm, Listen to the River Song",
    category: "ernakulam",
    propertyType: "Entire rental unit in Veliyathunadu",
    location: "Veliyathunadu, Kerala",
    country: "India",
    rating: 4.96,
    reviewsCount: 52,
    pricePerNight: 3533,
    originalPrice: 4637,
    taxes: 176,
    cleaningFee: 450,
    serviceFee: 240,
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    baths: 3,
    guestFavorite: true,
    mapCoords: { top: "25%", left: "55%" },
    host: {
      name: "Nisha",
      isSuperhost: true,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      joinedYear: "2019",
      badgeText: "Superhost · 8 months hosting"
    },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Riverside balconies overlook the Periyar River. Close to Cochin International Airport with direct access to metro and highway networks.",
    amenities: [
      { name: "River view balconies", icon: "🌊" },
      { name: "Air conditioning", icon: "❄️" },
      { name: "Private parking", icon: "🚗" },
      { name: "High-speed Wi-Fi", icon: "📶" },
      { name: "Kitchen", icon: "🍳" }
    ]
  },
  {
    id: "stay-004",
    title: "IRIS Urban Stay - Diva 101 Modern Stay",
    category: "ernakulam",
    propertyType: "Room in Ernakulam",
    location: "Ernakulam, Kerala",
    country: "India",
    rating: 4.83,
    reviewsCount: 12,
    pricePerNight: 1800,
    originalPrice: 2200,
    taxes: 90,
    cleaningFee: 250,
    serviceFee: 120,
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    guestFavorite: false,
    mapCoords: { top: "52%", left: "45%" },
    host: {
      name: "Rahul",
      isSuperhost: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      joinedYear: "2022",
      badgeText: "Superhost"
    },
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Chic boutique room with king bed, attached bathroom, and workstation in the center of Ernakulam.",
    amenities: [
      { name: "King bed", icon: "🛏️" },
      { name: "Fast Wi-Fi", icon: "📶" },
      { name: "Air conditioning", icon: "❄️" },
      { name: "Free parking", icon: "🚗" }
    ]
  },
  {
    id: "stay-005",
    title: "Coosytree Inn | A Spacious 1st Floor 2BHK",
    category: "kochi",
    propertyType: "Home in Kochi",
    location: "Fort Kochi, Kerala",
    country: "India",
    rating: 4.92,
    reviewsCount: 59,
    pricePerNight: 2500,
    originalPrice: 4013,
    taxes: 125,
    cleaningFee: 300,
    serviceFee: 160,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    guestFavorite: false,
    mapCoords: { top: "72%", left: "38%" },
    host: {
      name: "George Kutty",
      isSuperhost: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      joinedYear: "2018",
      badgeText: "Host for 6 years"
    },
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Heritage bungalow stay located in Fort Kochi, walking distance to coastal promenades and historic spice markets.",
    amenities: [
      { name: "Garden view", icon: "🌿" },
      { name: "Wi-Fi", icon: "📶" },
      { name: "Kitchen", icon: "🍳" },
      { name: "Free parking", icon: "🚗" }
    ]
  },
  {
    id: "stay-006",
    title: "Palm & Petal | Tropical 1BHK Retreat",
    category: "ernakulam",
    propertyType: "Flat in Ernakulam",
    location: "Ernakulam, Kerala",
    country: "India",
    rating: 4.78,
    reviewsCount: 9,
    pricePerNight: 3500,
    originalPrice: 3950,
    taxes: 175,
    cleaningFee: 350,
    serviceFee: 200,
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    guestFavorite: true,
    mapCoords: { top: "48%", left: "50%" },
    host: {
      name: "Priya",
      isSuperhost: false,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      joinedYear: "2023",
      badgeText: "Host for 1 year"
    },
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Modern minimalist 1BHK retreat with indoor tropical plants, workspace, and seamless highway connectivity.",
    amenities: [
      { name: "Dedicated workspace", icon: "💻" },
      { name: "Air conditioning", icon: "❄️" },
      { name: "Fast Wi-Fi", icon: "📶" },
      { name: "Free parking", icon: "🚗" }
    ]
  }
];

export function getListingById(id) {
  return LISTINGS.find((listing) => listing.id === id) || null;
}
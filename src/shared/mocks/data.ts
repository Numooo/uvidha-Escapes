// Mock Data for Avia Travel Club
import type { Airport, FlightOffer, Hotel, Package } from "../../types";

export const AIRPORTS: Airport[] = [
  { code: "FRU", city: "Bishkek", name: "Manas Intl" },
  { code: "OSS", city: "Osh", name: "Osh Intl" },
  { code: "ALA", city: "Almaty", name: "Almaty Intl" },
  { code: "TAS", city: "Tashkent", name: "Islam Karimov Intl" },
  { code: "NQZ", city: "Astana", name: "Nursultan Nazarbayev Intl" },
  { code: "SVO", city: "Moscow", name: "Sheremetyevo Intl" },
  { code: "DME", city: "Moscow", name: "Domodedovo Intl" },
  { code: "LED", city: "St. Petersburg", name: "Pulkovo" },
  { code: "DXB", city: "Dubai", name: "Dubai Intl" },
  { code: "SHJ", city: "Sharjah", name: "Sharjah Intl" },
  { code: "IST", city: "Istanbul", name: "Istanbul Airport" },
  { code: "SAW", city: "Istanbul", name: "Sabiha Gokcen Intl" },
  { code: "AYT", city: "Antalya", name: "Antalya Airport" },
  { code: "JED", city: "Jeddah", name: "King Abdulaziz Intl" },
  { code: "LHR", city: "London", name: "Heathrow" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle" },
  { code: "FRA", city: "Frankfurt", name: "Frankfurt Airport" },
  { code: "JFK", city: "New York", name: "John F. Kennedy Intl" },
  { code: "PEK", city: "Beijing", name: "Beijing Capital Intl" },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Intl" },
  { code: "DEL", city: "Delhi", name: "Indira Gandhi Intl" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda Intl" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi Intl" },
  { code: "MAA", city: "Chennai", name: "Chennai Intl" },
  { code: "MOW", city: "Moscow", name: "Moscow Airports" },
  { code: "GOI", city: "Goa", name: "Dabolim Airport" },
  { code: "MLE", city: "Maldives", name: "Velana International" },
];

export const MOCK_FLIGHTS: FlightOffer[] = [
  {
    id: "6E-2045",
    airline: "IndiGo",
    airlineLogo:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=200&fit=crop&q=80", // Blue sky aircraft - IndiGo's blue branding
    flightNumber: "6E-2045",
    segments: [
      {
        from: "DEL",
        to: "BOM",
        departure: "2024-01-15T09:00:00",
        arrival: "2024-01-15T11:05:00",
        duration: 125, // 2h 5m
        cabin: "Economy",
        flightNumber: "6E-2045",
      },
    ],
    duration: 125,
    price: 5499,
    cabin: "Economy",
    refundable: true,
    changeable: true,
    baggage: {
      cabin: "7 kg",
      checked: "15 kg",
    },
    amenities: ["WiFi", "In-flight entertainment", "Meals included"],
  },
  {
    id: "UK-911",
    airline: "Vistara",
    airlineLogo:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=200&h=200&fit=crop&q=80", // Premium aircraft tail - Vistara's premium positioning
    flightNumber: "UK-911",
    segments: [
      {
        from: "DEL",
        to: "BOM",
        departure: "2024-01-15T12:20:00",
        arrival: "2024-01-15T14:35:00",
        duration: 135, // 2h 15m
        cabin: "Economy",
        flightNumber: "UK-911",
      },
    ],
    duration: 135,
    price: 6299,
    cabin: "Economy",
    refundable: true,
    changeable: true,
    baggage: {
      cabin: "7 kg",
      checked: "15 kg",
    },
    amenities: ["WiFi", "Priority boarding", "Complimentary meals"],
  },
  {
    id: "AI-804",
    airline: "Air India",
    airlineLogo:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=200&h=200&fit=crop&q=80", // Iconic airline at sunset - Air India's heritage
    flightNumber: "AI-804",
    segments: [
      {
        from: "BLR",
        to: "HYD",
        departure: "2024-01-15T06:30:00",
        arrival: "2024-01-15T07:45:00",
        duration: 75, // 1h 15m
        cabin: "Economy",
        flightNumber: "AI-804",
      },
      {
        from: "HYD",
        to: "DEL",
        departure: "2024-01-15T09:00:00",
        arrival: "2024-01-15T11:30:00",
        duration: 150, // 2h 30m
        cabin: "Economy",
        flightNumber: "AI-805",
      },
    ],
    duration: 300, // 5h total (including layover)
    price: 4899,
    cabin: "Economy",
    refundable: false,
    changeable: false,
    baggage: { cabin: "7 kg", checked: "20 kg" },
    amenities: ["Meals included"],
  },
  {
    id: "HD-IST",
    airline: "Turkish Airlines",
    airlineLogo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=200&fit=crop&q=80",
    flightNumber: "TK-402",
    segments: [{ from: "MOW", to: "IST", departure: "2024-01-15T09:00:00", arrival: "2024-01-15T13:30:00", duration: 270, cabin: "Economy", flightNumber: "TK-402" }],
    duration: 270,
    price: 24500,
    cabin: "Economy",
    refundable: true,
    changeable: true,
    baggage: { cabin: "8 kg", checked: "23 kg" },
    amenities: ["WiFi", "Meals included", "In-flight entertainment"],
  },
  {
    id: "HD-DXB",
    airline: "Emirates",
    airlineLogo: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=200&h=200&fit=crop&q=80",
    flightNumber: "EK-133",
    segments: [{ from: "MOW", to: "DXB", departure: "2024-01-15T23:50:00", arrival: "2024-01-16T06:15:00", duration: 325, cabin: "Economy", flightNumber: "EK-133" }],
    duration: 325,
    price: 18900,
    cabin: "Economy",
    refundable: true,
    changeable: true,
    baggage: { cabin: "7 kg", checked: "25 kg" },
    amenities: ["WiFi", "Premium meals", "In-flight entertainment"],
  },
  {
    id: "HD-BKK",
    airline: "Aeroflot",
    airlineLogo: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=200&h=200&fit=crop&q=80",
    flightNumber: "SU-270",
    segments: [{ from: "MOW", to: "BKK", departure: "2024-01-15T19:40:00", arrival: "2024-01-16T08:30:00", duration: 530, cabin: "Economy", flightNumber: "SU-270" }],
    duration: 530,
    price: 32400,
    cabin: "Economy",
    refundable: false,
    changeable: true,
    baggage: { cabin: "10 kg", checked: "23 kg" },
    amenities: ["Meals included", "In-flight entertainment"],
  },
  {
    id: "HD-GOI",
    airline: "Air India",
    airlineLogo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=200&fit=crop&q=80",
    flightNumber: "AI-156",
    segments: [{ from: "MOW", to: "DEL", departure: "2024-01-15T15:00:00", arrival: "2024-01-15T23:30:00", duration: 390, cabin: "Economy", flightNumber: "AI-156" },
               { from: "DEL", to: "GOI", departure: "2024-01-16T02:00:00", arrival: "2024-01-16T04:30:00", duration: 150, cabin: "Economy", flightNumber: "AI-888" }],
    duration: 660,
    price: 12000,
    cabin: "Economy",
    refundable: false,
    changeable: false,
    baggage: { cabin: "7 kg", checked: "15 kg" },
    amenities: ["Meals included"],
  },
  {
    id: "HD-MLE",
    airline: "Qatar Airways",
    airlineLogo: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=200&h=200&fit=crop&q=80",
    flightNumber: "QR-234",
    segments: [{ from: "MOW", to: "DOH", departure: "2024-01-15T17:00:00", arrival: "2024-01-15T22:15:00", duration: 315, cabin: "Economy", flightNumber: "QR-234" },
               { from: "DOH", to: "MLE", departure: "2024-01-16T01:00:00", arrival: "2024-01-16T07:45:00", duration: 285, cabin: "Economy", flightNumber: "QR-672" }],
    duration: 720,
    price: 45000,
    cabin: "Economy",
    refundable: true,
    changeable: true,
    baggage: { cabin: "7 kg", checked: "25 kg" },
    amenities: ["WiFi", "Premium meals", "In-flight entertainment", "Lounge access"],
  },
  {
    id: "FRU-DXB",
    airline: "FlyDubai",
    airlineLogo: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=200&h=200&fit=crop&q=80",
    flightNumber: "FZ-1762",
    segments: [{ from: "FRU", to: "DXB", departure: "2024-01-20T05:30:00", arrival: "2024-01-20T08:45:00", duration: 195, cabin: "Economy", flightNumber: "FZ-1762" }],
    duration: 195,
    price: 320,
    cabin: "Economy",
    refundable: true,
    changeable: true,
    baggage: { cabin: "7 kg", checked: "20 kg" },
    amenities: ["Comfortable seating", "Buy-on-board meals"],
  },
  {
    id: "FRU-IST",
    airline: "Pegasus",
    airlineLogo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=200&fit=crop&q=80",
    flightNumber: "PC-701",
    segments: [{ from: "FRU", to: "SAW", departure: "2024-01-22T08:15:00", arrival: "2024-01-22T10:45:00", duration: 330, cabin: "Economy", flightNumber: "PC-701" }],
    duration: 330,
    price: 180,
    cabin: "Economy",
    refundable: false,
    changeable: true,
    baggage: { cabin: "8 kg", checked: "20 kg" },
    amenities: ["Low cost", "Modern fleet"],
  },
  {
    id: "ALA-TAS",
    airline: "Air Astana",
    airlineLogo: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=200&h=200&fit=crop&q=80",
    flightNumber: "KC-127",
    segments: [{ from: "ALA", to: "TAS", departure: "2024-01-25T14:20:00", arrival: "2024-01-25T15:00:00", duration: 100, cabin: "Business", flightNumber: "KC-127" }],
    duration: 100,
    price: 250,
    cabin: "Business",
    refundable: true,
    changeable: true,
    baggage: { cabin: "10 kg", checked: "30 kg" },
    amenities: ["Lounge access", "Premium meals", "Extra legroom"],
  },
  {
    id: "LHR-CDG",
    airline: "Air France",
    airlineLogo: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=200&h=200&fit=crop&q=80",
    flightNumber: "AF-1681",
    segments: [{ from: "LHR", to: "CDG", departure: "2024-02-01T10:30:00", arrival: "2024-02-01T12:45:00", duration: 75, cabin: "Economy", flightNumber: "AF-1681" }],
    duration: 75,
    price: 125,
    cabin: "Economy",
    refundable: true,
    changeable: false,
    baggage: { cabin: "12 kg", checked: "23 kg" },
    amenities: ["Snacks included", "Central arrival"],
  },
];

export const MOCK_HOTELS: Hotel[] = [
  {
    id: "taj",
    name: "The Taj Mahal Palace",
    city: "Mumbai",
    location: "Colaba, Mumbai",
    rating: 4.8,
    reviews: 1234,
    pricePerNight: 15000,
    hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
    ],
    amenities: [
      { label: "Free WiFi" },
      { label: "Restaurant" },
      { label: "Pool" },
      { label: "Spa" },
    ],
  },
];

export const MOCK_PACKAGES: Package[] = [
  {
    id: "goa-beach",
    title: "Goa Beach Paradise",
    duration: { days: 5, nights: 4 },
    pricePerPerson: 35000,
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200",
    inclusions: ["Flights", "Hotels", "Transfers", "Breakfast"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Beach Relaxation",
        desc: "Welcome to Goa! Upon arrival at Dabolim Airport, our representative will greet you and transfer you to your beach resort. Check-in and spend the afternoon relaxing on the pristine beaches. Evening at leisure to explore the nearby area and enjoy dinner at a beachside shack.",
      },
      {
        day: 2,
        title: "North Goa Exploration",
        desc: "Start your day with breakfast and head out to explore North Goa's famous beaches and forts. Visit the historic Fort Aguada with stunning ocean views, followed by the vibrant Calangute and Baga beaches. Enjoy water sports or simply relax. Evening visit to the Saturday Night Market (if available) or Anjuna Flea Market.",
      },
      {
        day: 3,
        title: "South Goa Serenity",
        desc: "After breakfast, discover the tranquil beauty of South Goa. Visit the pristine Colva Beach, peaceful Palolem Beach, and the historic Cabo de Rama Fort. Stop by a spice plantation for a guided tour and traditional Goan lunch. Return to hotel in the evening.",
      },
      {
        day: 4,
        title: "Water Adventures & Sunset Cruise",
        desc: "Morning dedicated to thrilling water sports - try parasailing, jet skiing, banana boat rides, or scuba diving. Afternoon at leisure. In the evening, embark on a romantic sunset cruise along the Mandovi River with live music and entertainment.",
      },
      {
        day: 5,
        title: "Departure",
        desc: "Enjoy your final breakfast in Goa. Check-out from the hotel and transfer to Dabolim Airport for your onward journey, carrying beautiful memories of your Goa beach escape.",
      },
    ],
  },
];

export const formatCurrency = (amount: number) =>
  amount.toLocaleString("en-IN");

export const getAirportLabel = (code: string) => {
  const airport = AIRPORTS.find((a) => a.code === code);
  return airport ? airport.city : code;
};

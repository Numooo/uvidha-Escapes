// Mock Data Types for Suvidha Escapes

export type Route =
  | "HOME"
  | "FLIGHTS_RESULTS"
  | "HOTELS_RESULTS"
  | "PACKAGES_RESULTS"
  | "HOTEL_DETAIL"
  | "PACKAGE_DETAIL"
  | "BOOKING";

export interface Airport {
  code: string;
  city: string;
  name: string;
}

export interface FlightSegment {
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: number; // in minutes
  cabin: string;
  flightNumber: string;
}

export interface FlightOffer {
  id: string;
  airline: string;
  flightNumber: string;
  logo?: string;
  airlineLogo?: string; // Airline brand logo URL
  segments: FlightSegment[];
  duration: number; // total duration in minutes
  price: number;
  cabin: string;
  refundable: boolean;
  changeable: boolean;
  baggage: {
    cabin: string;
    checked: string;
  };
  amenities?: string[];
}

export interface Hotel {
  id: string;
  name: string;
  city?: string;
  location: string;
  distance?: string; // distance from center
  rating: number;
  reviews?: number;
  reviewCount?: number;
  reviewScore?: string; // "Excellent", "Very Good", etc.
  stars?: number; // 3, 4, 5 star hotel
  pricePerNight?: number;
  price?: number; // per night (alternative)
  originalPrice?: number;
  discount?: number; // percentage
  availableRooms?: number;
  checkIn?: string;
  checkOut?: string;
  hero?: string;
  images?: string[];
  gallery?: string[];
  amenities: Array<{ label: string }> | string[];
  description?: string;
  rooms?: HotelRoom[];
}

export interface HotelRoom {
  id: string;
  name: string;
  size: string; // e.g., "28 sqm"
  bedType: string;
  maxOccupancy: number;
  amenities: string[];
  price: number;
  images: string[];
  available: number;
}

export interface Package {
  id: string;
  title: string;
  destination?: string;
  duration: { days: number; nights: number };
  pricePerPerson?: number;
  price?: number; // per person (alternative)
  image?: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  theme?: string[]; // "Beach", "Adventure", "Heritage", etc.
  inclusions: string[];
  highlights?: string[];
  itinerary: Array<{ day: number; title: string; desc: string }> | PackageDay[];
  hotels?: Hotel[];
}

export interface SearchCriteria {
  from: string;
  to: string;
  depart: string;
  return: string;
  pax: number;
  cabin: string;
}

export interface BookingSelection {
  flight: FlightOffer | null;
  hotel: Hotel | null;
  package: Package | null;
}

export interface FilterState {
  priceRange: [number, number];
  stops: string[];
  airlines: string[];
  departureTime: string[];
  arrivalTime: string[];
  duration: [number, number];
  cabinClass: string[];
}

// Booking Flow Types
export interface TravelerDetails {
  title: "Mr" | "Ms" | "Mrs" | "Dr";
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  nationality: string;
  passportNumber?: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
  countryCode: string;
  receiveUpdates: boolean;
}

export interface FareBreakdown {
  baseFare: number;
  taxes: number;
  seatSelection?: number;
  baggage?: number;
  discount?: number;
  total: number;
}

// Additional type definitions for Hotels and Packages
export interface HotelRoom {
  id: string;
  name: string;
  size: string; // e.g., "28 sqm"
  bedType: string;
  maxOccupancy: number;
  amenities: string[];
  price: number;
  images: string[];
  available: number;
}

export interface PackageDay {
  day: number;
  title: string;
  desc?: string;
  description?: string;
  activities?: string[];
  meals?: string[];
  accommodation?: string;
}

// Visa Types
export interface VisaRequirement {
  id: string;
  country: string;
  countryCode: string;
  visaType: string; // "Tourist", "Business", "Transit", etc.
  processingTime: string;
  validity: string;
  price: number;
  requirements: string[];
  image: string;
  description: string;
}

export interface BookingData {
  bookingId: string;
  flight: FlightOffer;
  travelers: TravelerDetails[];
  contact: ContactDetails;
  fareBreakdown: FareBreakdown;
  paymentMethod: "upi" | "card" | "netbanking" | "wallet";
  paymentStatus: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
}

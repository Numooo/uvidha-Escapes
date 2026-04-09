import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  LayoutList,
  LayoutGrid,
  MapPin,
  Star,
  Wifi,
  Coffee,
  UtensilsCrossed,
  Dumbbell,
  Car,
  Wind,
  Waves,
  Heart,
  Calendar,
} from "lucide-react";
import { Input } from "./primitives/input";
import { Button } from "./primitives/button";
import { Badge } from "./primitives/badge";
import { Carousel } from "./primitives/carousel";
import { HotelDetailPage } from "./HotelDetailPage";
import type { Hotel } from "./types";

// Mock hotel data with real Unsplash images
const MOCK_HOTELS: Hotel[] = [
  {
    id: "1",
    name: "The Taj Mahal Palace",
    location: "Colaba, Mumbai",
    distance: "2.5 km from center",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    ],
    rating: 4.8,
    reviewCount: 1234,
    reviewScore: "Excellent",
    stars: 5,
    amenities: [
      "WiFi",
      "Pool",
      "Spa",
      "Restaurant",
      "Gym",
      "Parking",
      "Bar",
      "Room Service",
    ],
    price: 15000,
    originalPrice: 20000,
    discount: 25,
    availableRooms: 5,
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    description: "Iconic luxury hotel overlooking the Gateway of India",
  },
  {
    id: "2",
    name: "The Oberoi",
    location: "Nariman Point, Mumbai",
    distance: "1.2 km from center",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    ],
    rating: 4.9,
    reviewCount: 892,
    reviewScore: "Outstanding",
    stars: 5,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Airport Shuttle"],
    price: 18000,
    availableRooms: 3,
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
  },
  {
    id: "3",
    name: "Trident BKC",
    location: "Bandra Kurla Complex",
    distance: "8 km from center",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800",
    ],
    rating: 4.6,
    reviewCount: 567,
    reviewScore: "Very Good",
    stars: 5,
    amenities: ["WiFi", "Pool", "Restaurant", "Gym", "Business Center"],
    price: 12000,
    originalPrice: 15000,
    discount: 20,
    availableRooms: 8,
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
  },
  {
    id: "4",
    name: "ITC Maratha",
    location: "Andheri East, Mumbai",
    distance: "6 km from airport",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
    ],
    rating: 4.7,
    reviewCount: 743,
    reviewScore: "Excellent",
    stars: 5,
    amenities: [
      "WiFi",
      "Pool",
      "Spa",
      "Restaurant",
      "Gym",
      "Airport Shuttle",
      "Bar",
    ],
    price: 10000,
    availableRooms: 12,
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
  },
  {
    id: "5",
    name: "JW Marriott Juhu",
    location: "Juhu Beach, Mumbai",
    distance: "15 km from center",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      "https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=800",
    ],
    rating: 4.8,
    reviewCount: 1089,
    reviewScore: "Excellent",
    stars: 5,
    amenities: [
      "WiFi",
      "Beach Access",
      "Pool",
      "Spa",
      "Restaurant",
      "Gym",
      "Bar",
    ],
    price: 14000,
    originalPrice: 17500,
    discount: 20,
    availableRooms: 6,
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
  },
  {
    id: "6",
    name: "Hotel Sea Green",
    location: "Marine Drive, Mumbai",
    distance: "0.8 km from center",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
    ],
    rating: 4.3,
    reviewCount: 445,
    reviewScore: "Good",
    stars: 3,
    amenities: ["WiFi", "Restaurant", "Room Service", "Laundry"],
    price: 5000,
    availableRooms: 15,
    checkIn: "1:00 PM",
    checkOut: "11:00 AM",
  },
];

const amenityIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  WiFi: Wifi,
  Pool: Waves,
  Spa: Wind,
  Restaurant: UtensilsCrossed,
  Gym: Dumbbell,
  Parking: Car,
  Bar: Coffee,
};

interface HotelsPageProps {
  onHotelSelect?: (
    hotel: Hotel,
    metadata?: {
      checkInDate?: string;
      checkOutDate?: string;
      rooms?: number;
      guests?: number;
    }
  ) => void;
}

export function HotelsPage({ onHotelSelect }: HotelsPageProps) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [hotels] = useState(MOCK_HOTELS);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "distance">(
    "rating"
  );

  // Show detail page if a hotel is selected
  if (selectedHotel) {
    return (
      <HotelDetailPage
        hotelData={selectedHotel}
        onBack={() => setSelectedHotel(null)}
        onBook={(
          hotelId: string,
          roomId?: string,
          checkInDate?: string,
          checkOutDate?: string,
          rooms?: number,
          guests?: number
        ) => {
          // Trigger unified booking flow
          onHotelSelect?.(selectedHotel, {
            checkInDate,
            checkOutDate,
            rooms,
            guests,
          });
        }}
      />
    );
  }

  const handleSearch = () => {
    // Filter logic would go here
    console.log("Searching for:", searchQuery);
  };

  const toggleStar = (stars: number) => {
    setSelectedStars((prev) =>
      prev.includes(stars) ? prev.filter((s) => s !== stars) : [...prev, stars]
    );
  };

  // Filter and sort hotels
  const filteredHotels = hotels
    .filter((hotel) => {
      const hotelPrice = hotel.price || hotel.pricePerNight || 0;
      const matchesPrice =
        hotelPrice >= priceRange[0] && hotelPrice <= priceRange[1];
      const matchesStars =
        selectedStars.length === 0 || selectedStars.includes(hotel.stars || 0);
      return matchesPrice && matchesStars;
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        const priceA = a.price || a.pricePerNight || 0;
        const priceB = b.price || b.pricePerNight || 0;
        return priceA - priceB;
      }
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                DESTINATION
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Where are you going?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                CHECK-IN
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="date" className="pl-10" />
              </div>
            </div>
            <div className="w-48">
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                CHECK-OUT
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="date" className="pl-10" />
              </div>
            </div>
            <Button onClick={handleSearch} className="h-11">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {filteredHotels.length} Hotels in Mumbai
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Great savings on hotels in Mumbai, India online
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "price" | "rating" | "distance")
              }
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="distance">Sort by Distance</option>
            </select>

            {/* Filters Button */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>

            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <LayoutList className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 border-l border-gray-300 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-3 space-y-6"
            >
              {/* Price Range */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Price per night
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">₹{priceRange[0]}</span>
                    <span className="font-medium text-gray-900">
                      ₹{priceRange[1]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Star Rating
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3].map((stars) => (
                    <label
                      key={stars}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStars.includes(stars)}
                        onChange={() => toggleStar(stars)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 flex items-center gap-1">
                        {Array.from({ length: stars }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="text-sm text-gray-700 ml-1">
                          ({stars} star)
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Amenities</h3>
                <div className="space-y-2">
                  {["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Parking"].map(
                    (amenity) => {
                      const Icon = amenityIcons[amenity] || Wifi;
                      return (
                        <label
                          key={amenity}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <Icon className="h-4 w-4 text-gray-600 ml-3" />
                          <span className="ml-2 text-sm text-gray-700">
                            {amenity}
                          </span>
                        </label>
                      );
                    }
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Hotels Grid/List */}
          <div className={showFilters ? "col-span-9" : "col-span-12"}>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 lg:grid-cols-2 gap-5"
                  : "space-y-5"
              }
            >
              {filteredHotels.map((hotel, index) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  viewMode={viewMode}
                  index={index}
                  onSelect={() => setSelectedHotel(hotel)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface HotelCardProps {
  hotel: Hotel;
  viewMode: "list" | "grid";
  index: number;
  onSelect?: () => void;
}

function HotelCard({ hotel, viewMode, index, onSelect }: HotelCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group ${
        viewMode === "list" ? "grid grid-cols-12 gap-0" : ""
      }`}
      onClick={() => onSelect?.()}
    >
      {/* Image Gallery */}
      <div className={viewMode === "list" ? "col-span-4" : ""}>
        <div className="relative h-64">
          <Carousel
            images={hotel.images || hotel.gallery || []}
            className="h-full"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors z-10"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
              }`}
            />
          </button>
          {hotel.discount && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg z-10">
              {hotel.discount}% OFF
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${viewMode === "list" ? "col-span-8" : ""}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {hotel.stars && (
                <div className="flex gap-0.5">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              )}
              {hotel.reviewScore && (
                <Badge variant="success" className="text-xs">
                  {hotel.reviewScore}
                </Badge>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1.5">
              <MapPin className="h-4 w-4" />
              <span>{hotel.location}</span>
              {hotel.distance && (
                <>
                  <span className="text-gray-400">•</span>
                  <span>{hotel.distance}</span>
                </>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-bold text-gray-900">
                {hotel.rating}
              </span>
              <span className="text-sm text-gray-600">
                ({hotel.reviewCount})
              </span>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 6).map((amenity, idx) => {
            const amenityLabel =
              typeof amenity === "string" ? amenity : amenity.label;
            const Icon = amenityIcons[amenityLabel] || Wifi;
            return (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-700"
              >
                <Icon className="h-3.5 w-3.5" />
                {amenityLabel}
              </div>
            );
          })}
          {hotel.amenities.length > 6 && (
            <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
              +{hotel.amenities.length - 6} more
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pt-4 border-t border-gray-200">
          <div>
            {hotel.originalPrice && (
              <span className="text-sm text-gray-500 line-through block">
                ₹{hotel.originalPrice.toLocaleString()}
              </span>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-blue-600">
                ₹{(hotel.price || hotel.pricePerNight || 0).toLocaleString()}
              </span>
              <span className="text-sm text-gray-600">/night</span>
            </div>
            {hotel.availableRooms && hotel.availableRooms <= 5 && (
              <p className="text-xs text-red-600 font-medium mt-1">
                Only {hotel.availableRooms} rooms left!
              </p>
            )}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 flex-1 sm:flex-initial"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.();
              }}
            >
              View Details
            </Button>
            <Button
              size="sm"
              className="gap-2 flex-1 sm:flex-initial"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.();
              }}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { format } from "date-fns";
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
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Carousel } from "@/shared/ui/carousel";
import { useRouter } from "@/i18n/routing";
import type { Hotel } from "@/types";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";
import { HotelAutocomplete } from "@/shared/ui/HotelAutocomplete";
import { DatePicker } from "@/shared/ui/DatePicker";

// Amenity icons mapping

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
    },
  ) => void;
}


export function HotelsPage({ onHotelSelect }: HotelsPageProps) {
  const t = useTranslations("Hotels");
  const tMock = useTranslations("MockData");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { symbol, symbolText, CurrencySymbol } = useCurrency();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [hotels] = useState<Hotel[]>(tMock.raw("hotels"));
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [checkOutDate, setCheckOutDate] = useState(
    format(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
  );

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
    const date = searchParams.get("date");
    if (date) {
      setCheckInDate(date);
      const outDate = new Date(date);
      outDate.setDate(outDate.getDate() + 3);
      setCheckOutDate(outDate.toISOString().split("T")[0]);
    }
  }, [searchParams]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "distance">(
    "rating",
  );

  // Show detail page if a hotel is selected

  const handleSearch = () => {
    // Filter logic would go here
    console.log("Searching for:", searchQuery);
  };

  const toggleStar = (stars: number) => {
    setSelectedStars((prev) =>
      prev.includes(stars) ? prev.filter((s) => s !== stars) : [...prev, stars],
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
      const query = searchQuery.toLowerCase();
      const matchesSearch = query === "" || 
        hotel.name.toLowerCase().includes(query) ||
        hotel.location.toLowerCase().includes(query) ||
        (hotel.city && (hotel.city.toLowerCase().includes(query) || query.includes(hotel.city.toLowerCase()))) ||
        (hotel.country && (hotel.country.toLowerCase().includes(query) || query.includes(hotel.country.toLowerCase())));
      
      return matchesPrice && matchesStars && matchesSearch;
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
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <HotelAutocomplete
                label={t("destination")}
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t("destinationPlaceholder")}
              />
            </div>
            <div className="w-56 pb-0.5">
              <DatePicker
                label={t("checkIn")}
                value={checkInDate}
                onChange={setCheckInDate}
                minDate={new Date()}
              />
            </div>
            <div className="w-56 pb-0.5">
              <DatePicker
                label={t("checkOut")}
                value={checkOutDate}
                onChange={setCheckOutDate}
                minDate={checkInDate ? new Date(checkInDate) : new Date()}
              />
            </div>
            <div className="pb-1">
              <Button onClick={handleSearch} className="h-[46px] px-8 rounded-2xl shadow-lg shadow-blue-600/20">
                <Search className="h-5 w-5 mr-2" />
                {t("search")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {searchQuery 
                ? t("hotelsFound", { count: filteredHotels.length, location: searchQuery })
                : `${t("allHotels")}: ${filteredHotels.length}`
              }
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {searchQuery
                ? t("savingsSubtitle", { location: searchQuery })
                : t("savingsSubtitleAll")
              }
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
              <option value="rating">{t("sortBy.rating")}</option>
              <option value="price">{t("sortBy.price")}</option>
              <option value="distance">{t("sortBy.distance")}</option>
            </select>

            {/* Filters Button */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {t("filters")}
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
                  {t("pricePerNight")}
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="150000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <CurrencySymbol className="h-3 w-3 mr-1" />
                      {priceRange[0]}
                    </span>
                    <span className="font-medium text-gray-900 flex items-center">
                      <CurrencySymbol className="h-4 w-4 mr-1" />
                      {priceRange[1]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {t("starRating")}
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
                          ({t("starCount", { count: stars })})
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {t("amenities")}
                </h3>
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
                    },
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
                  onSelect={() => router.push(`/hotels/${hotel.id}`)}
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
  const t = useTranslations("Hotels");
  const { symbol, symbolText, CurrencySymbol } = useCurrency();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group ${
        viewMode === "list" ? "grid grid-cols-12 gap-0" : ""
      }`}
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
              e.preventDefault();
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
      <div
        className={`p-6 cursor-pointer ${viewMode === "list" ? "col-span-8" : ""}`}
        onClick={() => onSelect?.()}
      >
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
              <span>
                {hotel.location}
                {hotel.country && `, ${hotel.country}`}
              </span>
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
              {t("more", { count: hotel.amenities.length - 6 })}
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pt-4 border-t border-gray-200">
          <div>
            {hotel.originalPrice && (
              <span className="text-sm text-gray-500 line-through flex items-center">
                <CurrencySymbol className="h-3 w-3 mr-1" />
                {hotel.originalPrice.toLocaleString()}
              </span>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-blue-600 flex items-center">
                <CurrencySymbol className="h-6 w-6 mr-1" />
                {(hotel.price || hotel.pricePerNight || 0).toLocaleString()}
              </span>
              <span className="text-sm text-gray-600">/{t("night")}</span>
            </div>
            {hotel.availableRooms && hotel.availableRooms <= 5 && (
              <p className="text-xs text-red-600 font-medium mt-1">
                {t("roomsLeft", { count: hotel.availableRooms })}
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
              {t("viewDetails")}
            </Button>
            <Button
              size="sm"
              className="gap-2 flex-1 sm:flex-initial"
              onClick={(e: any) => {
                e.stopPropagation();
                onSelect?.();
              }}
            >
              {t("bookNow")}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

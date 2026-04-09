import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  MapPin,
  Check,
  Calendar,
  Users,
  Clock,
  Shield,
  Phone,
  Mail,
  Wifi,
  Coffee,
  UtensilsCrossed,
  Dumbbell,
  Car,
  Wind,
  Waves,
  Droplets,
  TvMinimalPlay,
  LampDesk,
  Refrigerator,
  Bed,
  Bath,
  Info,
  Plus,
  Minus,
  Home,
} from "lucide-react";
import { Badge } from "./primitives/badge";
import type { Hotel, HotelRoom } from "./types";

interface HotelDetailPageProps {
  hotelData: Hotel;
  onBack: () => void;
  onBook: (
    hotelId: string,
    roomId?: string,
    checkInDate?: string,
    checkOutDate?: string,
    rooms?: number,
    guests?: number
  ) => void;
}

export function HotelDetailPage({
  hotelData,
  onBack,
  onBook,
}: HotelDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const hotelImages = hotelData.images || [];
  const hotelPrice = hotelData.price || 0;

  const nights =
    checkInDate && checkOutDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOutDate).getTime() -
              new Date(checkInDate).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const areDatesValid =
    checkInDate &&
    checkOutDate &&
    new Date(checkOutDate) > new Date(checkInDate);

  const totalPrice = areDatesValid ? hotelPrice * nights * rooms : 0;
  const taxesAndFees = Math.round(totalPrice * 0.12); // 12% taxes
  const grandTotal = totalPrice + taxesAndFees;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === hotelImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? hotelImages.length - 1 : prev - 1
    );
  };

  const amenityIcons: Record<
    string,
    React.ComponentType<{ className?: string }>
  > = {
    WiFi: Wifi,
    Pool: Waves,
    Spa: Droplets,
    Restaurant: UtensilsCrossed,
    Gym: Dumbbell,
    Parking: Car,
    Bar: Coffee,
    "Room Service": Coffee,
    "Air Conditioning": Wind,
    TV: TvMinimalPlay,
    "Work Desk": LampDesk,
    "Mini Bar": Refrigerator,
    "Airport Shuttle": Car,
    "Business Center": LampDesk,
  };

  // Mock room data if not provided
  const hotelRooms: HotelRoom[] = hotelData.rooms || [
    {
      id: "deluxe",
      name: "Deluxe Room",
      size: "32 sqm",
      bedType: "King Bed",
      maxOccupancy: 2,
      amenities: ["WiFi", "Air Conditioning", "TV", "Mini Bar", "Work Desk"],
      price: hotelPrice,
      images: hotelImages,
      available: hotelData.availableRooms || 5,
    },
    {
      id: "suite",
      name: "Executive Suite",
      size: "55 sqm",
      bedType: "King Bed + Sofa Bed",
      maxOccupancy: 4,
      amenities: [
        "WiFi",
        "Air Conditioning",
        "TV",
        "Mini Bar",
        "Work Desk",
        "Living Area",
        "Bathtub",
      ],
      price: Math.round(hotelPrice * 1.6),
      images: hotelImages,
      available: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Back to Hotels</span>
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart
                className={`h-6 w-6 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative aspect-[16/9]">
                {hotelImages.length > 0 ? (
                  <>
                    <img
                      src={hotelImages[currentImageIndex]}
                      alt={hotelData.name}
                      className="w-full h-full object-cover"
                    />
                    {hotelImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
                        >
                          <ChevronLeft className="h-6 w-6 text-gray-900" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
                        >
                          <ChevronRight className="h-6 w-6 text-gray-900" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {hotelImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`h-2 rounded-full transition-all ${
                                index === currentImageIndex
                                  ? "w-8 bg-white"
                                  : "w-2 bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Hotel Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {hotelData.stars && (
                      <div className="flex gap-0.5">
                        {Array.from({ length: hotelData.stars }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    )}
                    <span className="text-sm font-medium text-yellow-600">
                      {hotelData.stars}-Star Hotel
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {hotelData.name}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{hotelData.location}</span>
                    </div>
                    {hotelData.distance && (
                      <>
                        <span>•</span>
                        <span className="text-sm">{hotelData.distance}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                  <Star className="h-5 w-5 fill-blue-500 text-blue-500" />
                  <span className="font-bold text-gray-900">
                    {hotelData.rating}
                  </span>
                  {hotelData.reviewScore && (
                    <span className="text-gray-600">
                      {hotelData.reviewScore}
                    </span>
                  )}
                </div>
              </div>

              {hotelData.description && (
                <p className="text-gray-700 mb-4">{hotelData.description}</p>
              )}

              {/* Check-in/Check-out Times */}
              {(hotelData.checkIn || hotelData.checkOut) && (
                <div className="flex items-center gap-6 text-sm text-gray-600 border-t border-gray-200 pt-4">
                  {hotelData.checkIn && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Check-in: {hotelData.checkIn}</span>
                    </div>
                  )}
                  {hotelData.checkOut && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Check-out: {hotelData.checkOut}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Amenities */}
            {hotelData.amenities && hotelData.amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Hotel Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotelData.amenities.map((amenity) => {
                    const amenityStr =
                      typeof amenity === "string" ? amenity : amenity.label;
                    const Icon = amenityIcons[amenityStr] || Check;
                    return (
                      <div
                        key={amenityStr}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                      >
                        <div className="p-2 rounded-lg bg-blue-50">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {amenityStr}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Available Rooms */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Available Rooms
              </h2>
              <div className="space-y-4">
                {hotelRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border-2 rounded-xl p-5 transition-all cursor-pointer ${
                      selectedRoom === room.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {room.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            <span>{room.bedType}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4" />
                            <span>{room.size}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>Up to {room.maxOccupancy} guests</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {room.amenities.slice(0, 5).map((amenity) => (
                            <Badge key={amenity} variant="secondary">
                              {amenity}
                            </Badge>
                          ))}
                          {room.amenities.length > 5 && (
                            <Badge variant="default">
                              +{room.amenities.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          ₹{room.price.toLocaleString("en-IN")}
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          per night
                        </div>
                        {room.available < 5 && (
                          <Badge variant="warning">
                            Only {room.available} left
                          </Badge>
                        )}
                      </div>
                    </div>
                    {selectedRoom === room.id && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                          <Check className="h-5 w-5" />
                          <span>Selected for booking</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    Important Information
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Valid ID proof required at check-in</li>
                    <li>• Early check-in subject to availability</li>
                    <li>• Pets not allowed</li>
                    <li>• Smoking only in designated areas</li>
                    <li>• Cancellation charges as per policy</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Help?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+918002025000"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Call us</p>
                    <p className="font-semibold text-gray-900">
                      +91 800 202 5000
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:hotels@suvidhaescapes.com"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email us</p>
                    <p className="font-semibold text-gray-900">
                      hotels@suvidhaescapes.com
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="space-y-6">
                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    {hotelData.originalPrice && hotelData.discount ? (
                      <>
                        <span className="text-3xl font-bold text-gray-900">
                          ₹{hotelPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          ₹{hotelData.originalPrice.toLocaleString("en-IN")}
                        </span>
                        <Badge variant="success">
                          {hotelData.discount}% OFF
                        </Badge>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{hotelPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">per night + taxes</p>
                </div>

                {/* Check-in Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => {
                        const newCheckIn = e.target.value;
                        setCheckInDate(newCheckIn);
                        // Ensure checkout is at least 1 day after check-in
                        if (
                          checkOutDate &&
                          new Date(checkOutDate) <= new Date(newCheckIn)
                        ) {
                          const nextDay = new Date(newCheckIn);
                          nextDay.setDate(nextDay.getDate() + 1);
                          setCheckOutDate(nextDay.toISOString().split("T")[0]);
                        }
                      }}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Check-out Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={
                        checkInDate
                          ? new Date(
                              new Date(checkInDate).getTime() +
                                24 * 60 * 60 * 1000
                            )
                              .toISOString()
                              .split("T")[0]
                          : new Date(Date.now() + 24 * 60 * 60 * 1000)
                              .toISOString()
                              .split("T")[0]
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Rooms & Guests */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Rooms Stepper */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rooms
                    </label>
                    <div className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white flex items-center justify-between">
                      <span className="flex items-center gap-2 text-gray-900">
                        <Home className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {rooms} {rooms === 1 ? "Room" : "Rooms"}
                        </span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setRooms(Math.max(1, rooms - 1))}
                          disabled={rooms <= 1}
                          className="w-7 h-7 rounded-md border border-orange-500 text-orange-500 flex items-center justify-center hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setRooms(Math.min(5, rooms + 1))}
                          disabled={rooms >= 5}
                          className="w-7 h-7 rounded-md border border-orange-500 text-orange-500 flex items-center justify-center hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Guests Stepper */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guests
                    </label>
                    <div className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white flex items-center justify-between">
                      <span className="flex items-center gap-2 text-gray-900">
                        <Users className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {guests} {guests === 1 ? "Guest" : "Guests"}
                        </span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          disabled={guests <= 1}
                          className="w-7 h-7 rounded-md border border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setGuests(Math.min(6, guests + 1))}
                          disabled={guests >= 6}
                          className="w-7 h-7 rounded-md border border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                {checkInDate && checkOutDate && (
                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-gray-700">
                      <span>
                        ₹{hotelPrice.toLocaleString("en-IN")} × {nights}{" "}
                        {nights === 1 ? "night" : "nights"} × {rooms}{" "}
                        {rooms === 1 ? "room" : "rooms"}
                      </span>
                      <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Taxes & Fees (12%)</span>
                      <span>₹{taxesAndFees.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                )}

                {/* Book Now Button */}
                <button
                  onClick={() => {
                    if (areDatesValid) {
                      onBook(
                        hotelData.id,
                        selectedRoom || undefined,
                        checkInDate,
                        checkOutDate,
                        rooms,
                        guests
                      );
                    }
                  }}
                  disabled={!areDatesValid}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700"
                >
                  Book Now
                </button>

                {/* Trust Badges */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>100% Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Instant Confirmation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Star,
  Heart,
  MapPin,
  Plane,
  Hotel as HotelIcon,
  Car,
  UtensilsCrossed,
  Check,
  X,
  Users,
  Clock,
  Shield,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "./primitives/badge";
import type { Package } from "./types";

interface PackageDetailPageProps {
  packageData: Package;
  onBack: () => void;
  onBook: (packageId: string) => void;
}

export function PackageDetailPage({
  packageData,
  onBack,
  onBook,
}: PackageDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);

  const packagePrice = packageData.price || packageData.pricePerPerson || 0;
  const packageImages = packageData.images || [packageData.image || ""];
  const totalPrice = packagePrice * travelers;
  const taxesAndFees = Math.round(totalPrice * 0.05); // 5% taxes
  const grandTotal = totalPrice + taxesAndFees;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === packageImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? packageImages.length - 1 : prev - 1
    );
  };

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
              <span className="font-medium">Back to Packages</span>
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
                <img
                  src={packageImages[currentImageIndex]}
                  alt={packageData.title}
                  className="w-full h-full object-cover"
                />
                {packageImages.length > 1 && (
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
                      {packageImages.map((_, index) => (
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
              </div>
            </div>

            {/* Package Title & Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {packageData.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{packageData.destination}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {packageData.duration.days} Days /{" "}
                        {packageData.duration.nights} Nights
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-full">
                  <Star className="h-5 w-5 fill-primary-500 text-primary-500" />
                  <span className="font-bold text-gray-900">
                    {packageData.rating}
                  </span>
                  <span className="text-gray-600">
                    ({packageData.reviewCount})
                  </span>
                </div>
              </div>

              {/* Themes */}
              <div className="flex flex-wrap gap-2 mb-4">
                {packageData.theme &&
                  packageData.theme.map((theme) => (
                    <Badge key={theme} variant="secondary">
                      {theme}
                    </Badge>
                  ))}
              </div>

              {/* Quick Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {packageData.inclusions.includes("Flights") && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <Plane className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>Flights</span>
                  </div>
                )}
                {packageData.inclusions.includes("Hotels") && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="p-2 rounded-lg bg-green-50">
                      <HotelIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <span>Hotels</span>
                  </div>
                )}
                {packageData.inclusions.includes("Transfers") && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="p-2 rounded-lg bg-orange-50">
                      <Car className="h-5 w-5 text-orange-600" />
                    </div>
                    <span>Transfers</span>
                  </div>
                )}
                {packageData.inclusions.includes("Meals") ||
                packageData.inclusions.includes("Breakfast") ? (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="p-2 rounded-lg bg-purple-50">
                      <UtensilsCrossed className="h-5 w-5 text-purple-600" />
                    </div>
                    <span>Meals</span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Detailed Itinerary
              </h2>
              <div className="space-y-6">
                {packageData.itinerary && packageData.itinerary.length > 0 ? (
                  packageData.itinerary.map((day, index) => {
                    const isPackageDay = "activities" in day;
                    return (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8 pb-6 border-l-2 border-primary-200 last:border-l-0 last:pb-0"
                      >
                        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
                          {day.day}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Day {day.day}: {day.title}
                          </h3>
                          <p className="text-gray-600 mb-2">{day.desc}</p>
                          {isPackageDay && day.description && (
                            <p className="text-sm text-gray-500">
                              {day.description}
                            </p>
                          )}
                          {isPackageDay &&
                            day.activities &&
                            day.activities.length > 0 && (
                              <div className="mt-3 space-y-1">
                                <p className="text-sm font-medium text-gray-700">
                                  Activities:
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                  {day.activities.map(
                                    (activity: string, idx: number) => (
                                      <li
                                        key={idx}
                                        className="text-sm text-gray-600"
                                      >
                                        {activity}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                          {isPackageDay &&
                            day.meals &&
                            day.meals.length > 0 && (
                              <div className="mt-2 flex items-center gap-2">
                                <UtensilsCrossed className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  {day.meals.join(", ")}
                                </span>
                              </div>
                            )}
                          {isPackageDay && day.accommodation && (
                            <div className="mt-2 flex items-center gap-2">
                              <HotelIcon className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {day.accommodation}
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Info className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>Detailed itinerary will be shared upon booking</p>
                  </div>
                )}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-green-50">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    What&apos;s Included
                  </h3>
                </div>
                <ul className="space-y-2">
                  {packageData.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                  {packageData.highlights &&
                    packageData.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-red-50">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    What&apos;s Not Included
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Travel insurance",
                    "Personal expenses",
                    "Additional meals not mentioned",
                    "Monument entrance fees",
                    "Tips and gratuities",
                    "Anything not mentioned in inclusions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
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
                    <li>• Minimum 2 travelers required for this package</li>
                    <li>
                      • Booking must be made at least 7 days before departure
                    </li>
                    <li>
                      • Cancellation charges apply as per terms & conditions
                    </li>
                    <li>• Valid government ID required for all travelers</li>
                    <li>• Package prices may vary during peak season</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Help Planning?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+918002025000"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary-500 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary-50">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Call us</p>
                    <p className="font-semibold text-gray-900">
                      +91 800 202 5000
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:packages@suvidhaescapes.com"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary-500 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary-50">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email us</p>
                    <p className="font-semibold text-gray-900">
                      packages@suvidhaescapes.com
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
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{packagePrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-gray-600">per person</span>
                  </div>
                  <p className="text-sm text-gray-500">Taxes included</p>
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Travel Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={
                        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                          .toISOString()
                          .split("T")[0]
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Number of Travelers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                    >
                      {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} Travelers
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>
                      ₹{packagePrice.toLocaleString("en-IN")} × {travelers}{" "}
                      travelers
                    </span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Taxes & Fees</span>
                    <span>₹{taxesAndFees.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={() => onBook(packageData.id)}
                  disabled={!selectedDate}
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

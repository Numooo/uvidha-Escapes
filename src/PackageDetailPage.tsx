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
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";
import { LocationMap } from "./LocationMap";
import { Badge } from "./primitives/badge";
import { ImageModal } from "./ImageModal";
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
  const t = useTranslations("PackageDetail");
  const th = useTranslations("HotelDetail"); // Reusing common keys like 'bookNow'
  const { symbol, symbolText, CurrencyIcon, CurrencySymbol } = useCurrency();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

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

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">{t("back")}</span>
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
            {/* Image Gallery Grid */}
            <div className="space-y-3">
              {/* Desktop Grid View */}
              <div className="hidden sm:block">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[300px] md:h-[480px]">
                  {/* Main Large Image */}
                  <div className="md:col-span-3 relative rounded-2xl overflow-hidden group cursor-pointer" onClick={() => openGallery(0)}>
                    {packageImages.length > 0 ? (
                      <img
                        src={packageImages[0]}
                        alt={packageData.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">{th("noImages")}</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  
                  {/* Side Stacked Images */}
                  <div className="hidden md:grid grid-rows-2 gap-3 h-full">
                    <div className="relative rounded-2xl overflow-hidden group cursor-pointer" onClick={() => openGallery(1 % packageImages.length)}>
                      <img
                        src={packageImages[1] || packageImages[0]}
                        alt={`${packageData.title} 2`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="relative rounded-2xl overflow-hidden group cursor-pointer" onClick={() => openGallery(2 % packageImages.length)}>
                      <img
                        src={packageImages[2] || (packageImages.length > 1 ? packageImages[1] : packageImages[0])}
                        alt={`${packageData.title} 3`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Bottom Row Thumbnails */}
                {packageImages.length > 3 && (
                  <div className="grid grid-cols-5 gap-3 mt-3">
                    {packageImages.slice(3, 8).map((img, idx) => (
                      <div 
                        key={idx} 
                        className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                        onClick={() => openGallery((idx + 3) % packageImages.length)}
                      >
                        <img
                          src={img}
                          alt={`${packageData.title} thumb ${idx + 4}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {idx === 4 && packageImages.length > 8 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity group-hover:opacity-90">
                            <span className="text-white font-bold text-lg">
                              {th("morePhotos", { count: packageImages.length - 8 })}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Carousel View */}
              <div className="sm:hidden bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="relative aspect-[16/9]">
                  {packageImages.length > 0 ? (
                    <>
                      <img
                        src={packageImages[currentImageIndex]}
                        alt={packageData.title}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => openGallery(currentImageIndex)}
                      />
                      {packageImages.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md"
                          >
                            <ChevronLeft className="h-5 w-5 text-gray-900" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md"
                          >
                            <ChevronRight className="h-5 w-5 text-gray-900" />
                          </button>
                          <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded text-white text-xs font-medium">
                            {currentImageIndex + 1} / {packageImages.length}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500 text-sm">{th("noImages")}</p>
                    </div>
                  )}
                </div>
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
                        {typeof packageData.duration === "string"
                          ? packageData.duration
                          : t("daysNights", {
                              days: packageData.duration.days,
                              nights: packageData.duration.nights,
                            })}
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
                    <div className="p-2 rounded-lg bg-brand-primary/5">
                      <UtensilsCrossed className="h-5 w-5 text-brand-primary" />
                    </div>
                    <span>{t("meals") || "Meals"}</span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("itineraryTitle")}
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
                            {t("dayTitle", { day: day.day, title: day.title })}
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
                                  {t("activities")}
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
                    <p>{t("itineraryPlaceholder")}</p>
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
                    {t("includedTitle")}
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
                    {t("notIncludedTitle")}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {t.raw("included").map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                      <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Location Map */}
            {packageData.coordinates && (
              <LocationMap
                lat={packageData.coordinates.lat}
                lng={packageData.coordinates.lng}
                name={packageData.title}
                location={packageData.destination}
              />
            )}

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    {t("importantInfo")}
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {t.raw("infoItems").map((item: string, idx: number) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t("helpTitle")}
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
                    <p className="text-sm text-gray-600">{t("callUs")}</p>
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
                    <p className="text-sm text-gray-600">{t("emailUs")}</p>
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
            <div className="sticky top-40 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="space-y-6">
                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900 flex items-center">
                      <CurrencySymbol className="h-7 w-7 mr-1" />
                      {packagePrice.toLocaleString()}
                    </span>
                    <span className="text-gray-600">{t("perPerson")}</span>
                  </div>
                  <p className="text-sm text-gray-500">{t("taxesIncluded")}</p>
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("selectTravelDate")}
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
                    {t("numberOfTravelers")}
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
                        {num} {t("travelersCount", { count: num })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span className="flex items-center">
                      <CurrencySymbol className="h-3.5 w-3.5 mr-1" />
                      {packagePrice.toLocaleString()} × {travelers}{" "}
                      {t("travelersCount", { count: travelers })}
                    </span>
                    <span className="flex items-center">
                      <CurrencySymbol className="h-3.5 w-3.5 mr-1" />
                      {totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>{t("taxesFees")}</span>
                    <span className="flex items-center">
                      <CurrencySymbol className="h-3.5 w-3.5 mr-1" />
                      {taxesAndFees.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>{t("total")}</span>
                    <span className="flex items-center">
                      <CurrencySymbol className="h-5 w-5 mr-1" />
                      {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={() => onBook(packageData.id)}
                  disabled={!selectedDate}
                  className="w-full bg-brand-primary text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-brand-secondary hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {th("bookNow")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Image Gallery Modal */}
      <ImageModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={packageImages}
        currentIndex={galleryIndex}
        onPrev={() => setGalleryIndex((prev) => (prev === 0 ? packageImages.length - 1 : prev - 1))}
        onNext={() => setGalleryIndex((prev) => (prev === packageImages.length - 1 ? 0 : prev + 1))}
        onThumbnailClick={(idx) => setGalleryIndex(idx)}
      />
    </div>
  );
}

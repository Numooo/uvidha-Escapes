import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Moon,
  Star,
  Heart,
  MapPin,
  Plane,
  Hotel as HotelIcon,
  Car,
  UtensilsCrossed,
} from "lucide-react";
import { Badge } from "./components/shared/ui/badge";
import { PackageDetailPage } from "./PackageDetailPage";
import type { Package } from "./types";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";

// Theme filters
const THEME_FILTERS = [
  "All",
  "Beach",
  "Adventure",
  "Heritage",
  "Wellness",
  "Mountains",
  "Wildlife",
  "Honeymoon",
  "Family",
];

const inclusionIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Flights: Plane,
  Hotels: HotelIcon,
  Hotel: HotelIcon,
  Accommodation: HotelIcon,
  Transfers: Car,
  Meals: UtensilsCrossed,
  Breakfast: UtensilsCrossed,
};

interface HolidaysPageProps {
  onPackageSelect?: (pkg: Package, metadata?: { guests?: number }) => void;
}

export function HolidaysPage({ onPackageSelect }: HolidaysPageProps) {
  const t = useTranslations("Holidays");
  const { symbol, CurrencyIcon } = useCurrency();
  const [packages] = useState<Package[]>(t.raw("mockData"));
  const [activeTheme, setActiveTheme] = useState("All");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  // Filter packages by theme
  const filteredPackages =
    activeTheme === "All"
      ? packages
      : packages.filter((pkg) => pkg.theme?.includes(activeTheme));

  // Show detail page if a package is selected
  if (selectedPackage) {
    return (
      <PackageDetailPage
        packageData={selectedPackage}
        onBack={() => setSelectedPackage(null)}
        onBook={() => {
          if (onPackageSelect) {
            onPackageSelect(selectedPackage, { guests: 2 }); // Default 2 guests, can be made dynamic
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl opacity-90"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {THEME_FILTERS.map((theme) => (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTheme === theme
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {t(`themes.${theme}` as any)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {t("packagesAvailable", { count: filteredPackages.length })}
          </h2>
          <p className="text-gray-600 mt-1">{t("discoverSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              index={index}
              onSelect={() => setSelectedPackage(pkg)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface PackageCardProps {
  package: Package;
  index: number;
  onSelect?: () => void;
}

function PackageCard({ package: pkg, index, onSelect }: PackageCardProps) {
  const t = useTranslations("Holidays");
  const { symbol, CurrencyIcon, CurrencySymbol } = useCurrency();
  const [isFavorite, setIsFavorite] = useState(false);
  const packageImage = pkg.images?.[0] || pkg.image || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={() => onSelect?.()}
    >
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        <motion.img
          src={packageImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white rounded-full transition-colors z-10 shadow-lg"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
            }`}
          />
        </button>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm opacity-90">{pkg.destination}</span>
          </div>

          <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-200 transition-colors">
            {pkg.title}
          </h3>

          <div className="flex items-center gap-4 text-sm mb-4 opacity-90">
            {typeof pkg.duration === "string" ? (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{pkg.duration}</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{t("daysCount", { count: pkg.duration.days })}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Moon className="h-4 w-4" />
                  <span>
                    {t("nightsCount", { count: pkg.duration.nights })}
                  </span>
                </div>
              </>
            )}
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <CurrencyIcon className="h-4 w-4" />
              <div className="flex items-center">
                {t("fromPrice", {
                  price: (
                    pkg.price ||
                    pkg.pricePerPerson ||
                    0
                  ).toLocaleString(),
                  symbol: "",
                })}
                <CurrencySymbol className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>

          {/* Rating */}
          {pkg.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-yellow-400/90 px-2.5 py-1 rounded-lg">
                <Star className="h-3.5 w-3.5 fill-yellow-900 text-yellow-900" />
                <span className="text-sm font-semibold text-yellow-900">
                  {pkg.rating}
                </span>
              </div>
              <span className="text-xs opacity-80">
                {t("reviews", { count: pkg.reviewCount || 0 })}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="p-5 space-y-4">
        {/* Inclusions */}
        {pkg.inclusions && pkg.inclusions.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
              {t("inclusions")}
            </p>
            <div className="flex flex-wrap gap-2">
              {pkg.inclusions.slice(0, 4).map((inclusion, idx) => {
                const Icon = inclusionIcons[inclusion] || Plane;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {inclusion}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Highlights */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
              {t("highlights")}
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Book Now Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
          className="w-full mt-4 bg-brand-primary hover:bg-brand-secondary text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          {t("bookNow")}
        </button>
      </div>
    </motion.div>
  );
}

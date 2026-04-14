import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, SlidersHorizontal, X } from "lucide-react";
import type { FlightOffer, FilterState } from "../../types";
import { FlightFilters } from "./FlightFilters";
import { FlightResultCard } from "./FlightResultCard";
import { FlightCardSkeletonList } from "./FlightCardSkeleton";
import { FiltersSkeleton } from "./FiltersSkeleton";
import { MOCK_FLIGHTS, formatCurrency, getAirportLabel } from "../../shared/mocks/data";
import { useTranslations } from "next-intl";

interface SearchParams {
  from: string;
  to: string;
  depart: string;
  passengers: number;
  cabin: string;
  tripType: "one-way" | "round-trip";
}

interface FlightsPageProps {
  onBookFlight?: (flight: FlightOffer) => void;
  onBack?: () => void;
  initialOrigin?: string | null;
  initialDestination?: string | null;
}

export function FlightsPage({ onBookFlight, onBack, initialOrigin, initialDestination }: FlightsPageProps = {}) {
  const t = useTranslations("Flights");
  const tSearch = useTranslations("Search.flights");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 50000],
    stops: [],
    airlines: [],
    departureTime: [],
    arrivalTime: [],
    duration: [1, 24],
    cabinClass: [],
  });

  const [sortBy, setSortBy] = useState<"price" | "duration" | "departure">(
    "price"
  );
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDestination, setCurrentDestination] = useState(initialDestination || "DXB");
  const [currentOrigin, setCurrentOrigin] = useState(initialOrigin || "FRU");
  const [isEditingSearch, setIsEditingSearch] = useState(false);

  // Sync with initial props if they change
  useEffect(() => {
    if (initialDestination) {
      setCurrentDestination(initialDestination);
    }
    if (initialOrigin) {
      setCurrentOrigin(initialOrigin);
    }
  }, [initialDestination, initialOrigin]);

  // Simulate loading state only once on mount
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate API call delay

    return () => clearTimeout(timer);
  }, []); // Only run once on mount

  // Mock search params (in real app, these would come from URL/state)
  const searchParams: SearchParams = {
    from: "MOW",
    to: currentDestination,
    depart: "2024-01-15",
    passengers: 1,
    cabin: "Economy",
    tripType: "one-way",
  };

  // Filter flights based on filter state and destination
  const getFilteredFlights = () => {
    let filtered = [...MOCK_FLIGHTS].filter((f) => {
      const lastSegment = f.segments[f.segments.length - 1];
      return lastSegment.to === currentDestination;
    });

    // Price filter
    filtered = filtered.filter(
      (f) =>
        f.price >= filters.priceRange[0] && f.price <= filters.priceRange[1]
    );

    // Stops filter
    if (filters.stops.length > 0) {
      filtered = filtered.filter((f) => {
        const stopCount = f.segments.length - 1;
        if (filters.stops.includes("non-stop") && stopCount === 0) return true;
        if (filters.stops.includes("1-stop") && stopCount === 1) return true;
        if (filters.stops.includes("2-plus") && stopCount >= 2) return true;
        return false;
      });
    }

    // Airlines filter
    if (filters.airlines.length > 0) {
      filtered = filtered.filter((f) =>
        filters.airlines.some((airline) =>
          f.airline.toLowerCase().includes(airline.toLowerCase())
        )
      );
    }

    // Cabin class filter
    if (filters.cabinClass.length > 0) {
      filtered = filtered.filter((f) =>
        filters.cabinClass.some((cabin) =>
          f.cabin.toLowerCase().includes(cabin.toLowerCase())
        )
      );
    }

    // Duration filter (in hours)
    filtered = filtered.filter((f) => {
      const hours = f.duration / 60;
      return hours >= filters.duration[0] && hours <= filters.duration[1];
    });

    return filtered;
  };

  // Sort flights
  const getSortedFlights = (flights: FlightOffer[]) => {
    const sorted = [...flights];
    switch (sortBy) {
      case "price":
        return sorted.sort((a, b) => a.price - b.price);
      case "duration":
        return sorted.sort((a, b) => a.duration - b.duration);
      case "departure":
        return sorted.sort(
          (a, b) =>
            new Date(a.segments[0].departure).getTime() -
            new Date(b.segments[0].departure).getTime()
        );
      default:
        return sorted;
    }
  };

  const filteredFlights = getFilteredFlights();
  const sortedFlights = getSortedFlights(filteredFlights);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      priceRange: [0, 50000],
      stops: [],
      airlines: [],
      departureTime: [],
      arrivalTime: [],
      duration: [1, 24],
      cabinClass: [],
    });
  };

  const handleBookFlight = (flight: FlightOffer) => {
    if (onBookFlight) {
      onBookFlight(flight);
    } else {
      console.log("Booking flight:", flight);
      alert(
        `Booking flight ${flight.flightNumber} for ${formatCurrency(
          flight.price
        )}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Search Bar */}
      <div className="sticky top-16 z-20 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <span>{getAirportLabel(currentOrigin)}</span>
                  <span className="text-gray-400">→</span>
                  <span>{getAirportLabel(currentDestination)}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {searchParams.depart} • {searchParams.passengers}{" "}
                  {searchParams.passengers === 1
                    ? tSearch("passenger")
                    : tSearch("passengers")}{" "}
                  • {searchParams.cabin}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsEditingSearch(true)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
            >
              {t("editSearch")}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-24">
              {isLoading ? (
                <FiltersSkeleton />
              ) : (
                <FlightFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearAll={handleClearFilters}
                />
              )}
            </div>
          </aside>

          {/* Results Area */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {isLoading ? (
                  <div className="h-7 w-32 animate-shimmer rounded" />
                ) : (
                  <h2 className="text-xl font-semibold text-gray-900">
                    {sortedFlights.length === 1
                      ? t("oneFlightFound")
                      : t("foundFlights", { count: sortedFlights.length })}
                  </h2>
                )}
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {t("filters")}
                </button>
              </div>
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="hidden text-sm text-gray-500 sm:inline">
                  {t("sortBy.label")}:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "price" | "duration" | "departure"
                    )
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <option value="price">{t("sortBy.price")}</option>
                  <option value="duration">{t("sortBy.duration")}</option>
                  <option value="departure">{t("sortBy.departure")}</option>
                </select>
              </div>
            </div>

            {/* Flight Cards */}
            {isLoading ? (
              <FlightCardSkeletonList count={5} />
            ) : sortedFlights.length > 0 ? (
              <div className="space-y-4">
                {sortedFlights.map((flight) => (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FlightResultCard
                      flight={flight}
                      onBook={handleBookFlight}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-12 text-center">
                <div className="mb-4 text-6xl">✈️</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {t("noFlightsFound")}
                </h3>
                <p className="mb-4 text-gray-600">{t("adjustFilters")}</p>
                <button
                  onClick={handleClearFilters}
                  className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  {t("clearAllFilters")}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white shadow-xl sm:max-w-sm"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("filters")}
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FlightFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearFilters}
              onClose={() => setShowFilters(false)}
            />
            <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {sortedFlights.length === 1
                  ? t("showOneResult")
                  : t("showResults", { count: sortedFlights.length })}
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {/* Edit Search Modal */}
      <AnimatePresence>
        {isEditingSearch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditingSearch(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">{t("editSearch")}</h3>
                <button 
                  onClick={() => setIsEditingSearch(false)}
                  className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {tSearch("to")}
                  </label>
                  <div className="grid grid-cols-1 gap-2 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar">
                    {MOCK_FLIGHTS.map(f => f.segments[f.segments.length-1].to)
                      .filter((v, i, a) => a.indexOf(v) === i)
                      .map(code => (
                        <button
                          key={code}
                          onClick={() => {
                            setCurrentDestination(code);
                            setIsEditingSearch(false);
                          }}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                            currentDestination === code 
                              ? "border-brand-primary bg-brand-primary/5 text-brand-primary" 
                              : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="font-bold">{getAirportLabel(code)}</span>
                          <span className="text-xs font-black opacity-50">{code}</span>
                        </button>
                      ))}
                  </div>
                </div>
                
                <button
                  onClick={() => setIsEditingSearch(false)}
                  className="w-full rounded-2xl bg-brand-primary py-4 text-white font-bold shadow-lg hover:shadow-brand-primary/25 transition-all active:scale-95 cursor-pointer"
                >
                  {t("showResults", { count: MOCK_FLIGHTS.filter(f => f.segments[f.segments.length-1].to === currentDestination).length })}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

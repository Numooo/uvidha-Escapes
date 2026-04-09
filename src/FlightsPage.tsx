import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, SlidersHorizontal, X } from "lucide-react";
import type { FlightOffer, FilterState } from "./types";
import { FlightFilters } from "./FlightFilters";
import { FlightResultCard } from "./FlightResultCard";
import { FlightCardSkeletonList } from "./FlightCardSkeleton";
import { FiltersSkeleton } from "./FiltersSkeleton";
import { MOCK_FLIGHTS, formatCurrency, getAirportLabel } from "./data";

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
}

export function FlightsPage({ onBookFlight, onBack }: FlightsPageProps = {}) {
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

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate API call delay

    return () => clearTimeout(timer);
  }, [filters, sortBy]); // Re-trigger loading when filters or sort changes

  // Mock search params (in real app, these would come from URL/state)
  const searchParams: SearchParams = {
    from: "DEL",
    to: "BOM",
    depart: "2024-01-15",
    passengers: 1,
    cabin: "Economy",
    tripType: "one-way",
  };

  // Filter flights based on filter state
  const getFilteredFlights = () => {
    let filtered = [...MOCK_FLIGHTS];

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
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => (onBack ? onBack() : window.history.back())}
                className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {getAirportLabel(searchParams.from)} →{" "}
                  {getAirportLabel(searchParams.to)}
                </div>
                <div className="text-sm text-gray-600">
                  {searchParams.depart} • {searchParams.passengers} passenger
                  {searchParams.passengers > 1 ? "s" : ""} •{" "}
                  {searchParams.cabin}
                </div>
              </div>
            </div>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              Edit Search
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
                    {sortedFlights.length} flight
                    {sortedFlights.length !== 1 ? "s" : ""} found
                  </h2>
                )}
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>
              </div>
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "price" | "duration" | "departure"
                  )
                }
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                <option value="price">Cheapest First</option>
                <option value="duration">Shortest First</option>
                <option value="departure">Earliest First</option>
              </select>
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
                  No flights found
                </h3>
                <p className="mb-4 text-gray-600">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={handleClearFilters}
                  className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Clear All Filters
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
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
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
                Show {sortedFlights.length} Result
                {sortedFlights.length !== 1 ? "s" : ""}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

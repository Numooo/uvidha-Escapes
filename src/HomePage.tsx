import React, { useState, useEffect, useRef } from "react";
import {
  Plane,
  Hotel,
  Palmtree,
  FileText,
  Calendar,
  MapPin,
  Users,
  ChevronDown,
  Star,
  ArrowRight,
  Heart,
  TrendingUp,
  Shield,
  Headphones,
  Plus,
  Minus,
  Baby,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { AIRPORTS } from "./data";
import { Badge } from "./primitives/badge";

type TabType = "flights" | "hotels" | "holidays" | "visa";
type TripType = "oneway" | "roundtrip";
type CabinClass = "economy" | "premium-economy" | "business" | "first";

interface HomePageProps {
  onSearchFlights?: () => void;
  onNavigate?: (page: "flights" | "hotels" | "holidays" | "visa") => void;
}

export function HomePage({ onSearchFlights, onNavigate }: HomePageProps = {}) {
  const [activeTab, setActiveTab] = useState<TabType>("flights");
  const [tripType, setTripType] = useState<TripType>("roundtrip");
  const [cabinClass, setCabinClass] = useState<CabinClass>("economy");

  // Passenger counters
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [passengersDropdownOpen, setPassengersDropdownOpen] = useState(false);
  const passengersDropdownRef = useRef<HTMLDivElement>(null);

  // Hotel search state
  const [hotelDestination, setHotelDestination] = useState("");
  const [hotelCheckIn, setHotelCheckIn] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [hotelCheckOut, setHotelCheckOut] = useState(
    format(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")
  );
  const [hotelRooms, setHotelRooms] = useState(1);
  const [hotelGuests, setHotelGuests] = useState(2);

  // Holiday search state
  const [holidayDestination, setHolidayDestination] = useState("");
  const [holidayStartDate, setHolidayStartDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [holidayEndDate, setHolidayEndDate] = useState(
    format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")
  );
  const [holidayTravelers, setHolidayTravelers] = useState(2);
  const [holidayBudget, setHolidayBudget] = useState<string>("medium");

  // Visa search state
  const [visaCountry, setVisaCountry] = useState("");
  const [visaType, setVisaType] = useState("tourist");
  const [visaTravelDate, setVisaTravelDate] = useState(
    format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")
  );
  const [visaApplicants, setVisaApplicants] = useState(1);

  const totalPassengers = adults + children;
  const canAddPassenger = totalPassengers < 9;
  const canRemoveAdult = adults > 1;
  const canRemoveChild = children > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        passengersDropdownRef.current &&
        !passengersDropdownRef.current.contains(event.target as Node)
      ) {
        setPassengersDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (activeTab === "flights" && onSearchFlights) {
      onSearchFlights();
    } else if (onNavigate) {
      onNavigate(activeTab);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Unsplash Background Image - Beautiful travel destination with airplane */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80)",
          }}
        >
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-indigo-900/80 to-purple-900/85" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Text */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-4"
            >
              Discover Your Next Adventure
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-blue-100 sm:text-xl"
            >
              Book flights, hotels, and holiday packages at the best prices
            </motion.p>
          </div>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-3xl bg-white/95 backdrop-blur-lg p-8 shadow-2xl border border-white/20"
          >
            {/* Tabs */}
            <div className="mb-8 flex gap-2 border-b border-gray-200">
              {[
                { id: "flights" as TabType, label: "Flights", icon: Plane },
                { id: "hotels" as TabType, label: "Hotels", icon: Hotel },
                {
                  id: "holidays" as TabType,
                  label: "Holidays",
                  icon: Palmtree,
                },
                { id: "visa" as TabType, label: "Visa", icon: FileText },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all rounded-t-lg ${
                      activeTab === tab.id
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Flight Search Form */}
            {activeTab === "flights" && (
              <div className="space-y-6">
                {/* Trip Type */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      value="oneway"
                      checked={tripType === "oneway"}
                      onChange={(e) => setTripType(e.target.value as TripType)}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      One-way
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      value="roundtrip"
                      checked={tripType === "roundtrip"}
                      onChange={(e) => setTripType(e.target.value as TripType)}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Round-trip
                    </span>
                  </label>
                </div>

                {/* Search Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Origin */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      From
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                        {AIRPORTS.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      To
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                        {AIRPORTS.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {tripType === "roundtrip" ? "Departure" : "Date"}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        defaultValue={format(new Date(), "yyyy-MM-dd")}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {tripType === "roundtrip" && (
                    <div className="relative">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Return
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          defaultValue={format(
                            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                            "yyyy-MM-dd"
                          )}
                          className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Passengers & Class */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Passengers Dropdown */}
                  <div className="relative" ref={passengersDropdownRef}>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Passengers
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setPassengersDropdownOpen(!passengersDropdownOpen)
                      }
                      className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-900 hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gray-400" />
                        <span>
                          {totalPassengers}{" "}
                          {totalPassengers === 1 ? "Passenger" : "Passengers"}
                          {children > 0 && (
                            <span className="text-gray-500 ml-1">
                              ({adults} Adult{adults !== 1 ? "s" : ""},{" "}
                              {children} Child{children !== 1 ? "ren" : ""})
                            </span>
                          )}
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transition-transform ${
                          passengersDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Panel */}
                    {passengersDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white p-4 shadow-xl"
                      >
                        <div className="space-y-4">
                          {/* Adults Counter */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-blue-50">
                                <User className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900">
                                  Adults
                                </div>
                                <div className="text-xs text-gray-500">
                                  12+ years
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  canRemoveAdult && setAdults(adults - 1)
                                }
                                disabled={!canRemoveAdult}
                                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                                  canRemoveAdult
                                    ? "border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95"
                                    : "border-gray-200 text-gray-300 cursor-not-allowed"
                                }`}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center text-base font-bold text-gray-900">
                                {adults}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  canAddPassenger && setAdults(adults + 1)
                                }
                                disabled={!canAddPassenger}
                                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                                  canAddPassenger
                                    ? "border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95"
                                    : "border-gray-200 text-gray-300 cursor-not-allowed"
                                }`}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Children Counter */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-purple-50">
                                <Baby className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900">
                                  Children
                                </div>
                                <div className="text-xs text-gray-500">
                                  2-11 years
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  canRemoveChild && setChildren(children - 1)
                                }
                                disabled={!canRemoveChild}
                                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                                  canRemoveChild
                                    ? "border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95"
                                    : "border-gray-200 text-gray-300 cursor-not-allowed"
                                }`}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center text-base font-bold text-gray-900">
                                {children}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  canAddPassenger && setChildren(children + 1)
                                }
                                disabled={!canAddPassenger}
                                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                                  canAddPassenger
                                    ? "border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95"
                                    : "border-gray-200 text-gray-300 cursor-not-allowed"
                                }`}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Info Note */}
                          <div className="pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                              Maximum 9 passengers allowed per booking
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Cabin Class */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Cabin Class
                    </label>
                    <div className="relative">
                      <select
                        value={cabinClass}
                        onChange={(e) =>
                          setCabinClass(e.target.value as CabinClass)
                        }
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="economy">Economy</option>
                        <option value="premium-economy">Premium Economy</option>
                        <option value="business">Business Class</option>
                        <option value="first">First Class</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Plane className="h-5 w-5" />
                  Search Flights
                </button>
              </div>
            )}

            {/* Hotels Search Form */}
            {activeTab === "hotels" && (
              <div className="space-y-6">
                {/* Search Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Destination */}
                  <div className="relative lg:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={hotelDestination}
                        onChange={(e) => setHotelDestination(e.target.value)}
                        placeholder="City, hotel name, or landmark"
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Check-in Date */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Check-in
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={hotelCheckIn}
                        onChange={(e) => {
                          const newCheckIn = e.target.value;
                          setHotelCheckIn(newCheckIn);
                          // Ensure checkout is at least 1 day after check-in
                          if (
                            hotelCheckOut &&
                            new Date(hotelCheckOut) <= new Date(newCheckIn)
                          ) {
                            const nextDay = new Date(newCheckIn);
                            nextDay.setDate(nextDay.getDate() + 1);
                            setHotelCheckOut(format(nextDay, "yyyy-MM-dd"));
                          }
                        }}
                        min={format(new Date(), "yyyy-MM-dd")}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Check-out Date */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Check-out
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={hotelCheckOut}
                        onChange={(e) => setHotelCheckOut(e.target.value)}
                        min={
                          hotelCheckIn
                            ? format(
                                new Date(
                                  new Date(hotelCheckIn).getTime() +
                                    24 * 60 * 60 * 1000
                                ),
                                "yyyy-MM-dd"
                              )
                            : format(
                                new Date(Date.now() + 24 * 60 * 60 * 1000),
                                "yyyy-MM-dd"
                              )
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Rooms & Guests */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Rooms */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Rooms
                    </label>
                    <div className="relative">
                      <Hotel className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={hotelRooms}
                        onChange={(e) => setHotelRooms(Number(e.target.value))}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Room" : "Rooms"}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={hotelGuests}
                        onChange={(e) => setHotelGuests(Number(e.target.value))}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  disabled={!hotelDestination}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Hotel className="h-5 w-5" />
                  Search Hotels
                </button>
              </div>
            )}

            {/* Holidays Search Form */}
            {activeTab === "holidays" && (
              <div className="space-y-6">
                {/* Search Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Destination */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Destination / Theme
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={holidayDestination}
                        onChange={(e) => setHolidayDestination(e.target.value)}
                        placeholder="Beach, Mountains, Adventure..."
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Budget Range
                    </label>
                    <div className="relative">
                      <select
                        value={holidayBudget}
                        onChange={(e) => setHolidayBudget(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="budget">
                          Budget (₹10,000 - ₹25,000)
                        </option>
                        <option value="medium">
                          Mid-Range (₹25,000 - ₹50,000)
                        </option>
                        <option value="luxury">Luxury (₹50,000+)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Travel Dates */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Start Date */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Travel Start
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={holidayStartDate}
                        onChange={(e) => setHolidayStartDate(e.target.value)}
                        min={format(new Date(), "yyyy-MM-dd")}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Travel End
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={holidayEndDate}
                        onChange={(e) => setHolidayEndDate(e.target.value)}
                        min={holidayStartDate}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Travelers */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Travelers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={holidayTravelers}
                        onChange={(e) =>
                          setHolidayTravelers(Number(e.target.value))
                        }
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Traveler" : "Travelers"}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Palmtree className="h-5 w-5" />
                  Search Holiday Packages
                </button>
              </div>
            )}

            {/* Visa Search Form */}
            {activeTab === "visa" && (
              <div className="space-y-6">
                {/* Search Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Country Selection */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Destination Country
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={visaCountry}
                        onChange={(e) => setVisaCountry(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="">Select Country</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="schengen">Schengen (Europe)</option>
                        <option value="australia">Australia</option>
                        <option value="canada">Canada</option>
                        <option value="dubai">Dubai (UAE)</option>
                        <option value="singapore">Singapore</option>
                        <option value="thailand">Thailand</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Visa Type */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Visa Type
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={visaType}
                        onChange={(e) => setVisaType(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="tourist">Tourist Visa</option>
                        <option value="business">Business Visa</option>
                        <option value="student">Student Visa</option>
                        <option value="work">Work Visa</option>
                        <option value="transit">Transit Visa</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Travel Date & Applicants */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Travel Date */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Planned Travel Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={visaTravelDate}
                        onChange={(e) => setVisaTravelDate(e.target.value)}
                        min={format(
                          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                          "yyyy-MM-dd"
                        )}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Number of Applicants */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Number of Applicants
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={visaApplicants}
                        onChange={(e) =>
                          setVisaApplicants(Number(e.target.value))
                        }
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Applicant" : "Applicants"}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  disabled={!visaCountry}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText className="h-5 w-5" />
                  Check Visa Requirements
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Holiday Packages - Auto-Scrolling Carousel */}
      <FeaturedPackagesSection onNavigate={onNavigate} />

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              ⭐ Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from thousands of happy travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;Our Bali trip organized by Suvidha Escapes was absolutely
                magical! Every detail was perfectly planned, from the stunning
                hotels to the incredible experiences. The AI trip planner made
                it so easy to customize our itinerary.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                  alt="Priya Sharma"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                  <p className="text-sm text-gray-600">Bali Trip, Dec 2024</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;Best travel booking experience ever! The hotel
                recommendations were spot-on, and the customer support was
                available 24/7. We saved so much time and money. Highly
                recommend for family vacations!&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  alt="Rajesh Kumar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-600">Dubai Trip, Jan 2025</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;The Maldives package was a dream come true! Crystal clear
                waters, luxury resort, and amazing activities. Suvidha Escapes
                made our honeymoon unforgettable. Thank you for the seamless
                experience!&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
                  alt="Ananya Patel"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Ananya Patel</h4>
                  <p className="text-sm text-gray-600">
                    Maldives Trip, Nov 2024
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;Incredible service from start to finish! The flight
                bookings were hassle-free, hotels were top-notch, and the visa
                assistance was super helpful. Will definitely book again for our
                next international trip.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
                  alt="Amit Verma"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Amit Verma</h4>
                  <p className="text-sm text-gray-600">Europe Tour, Oct 2024</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;As a solo traveler, I was nervous about planning
                everything myself. Suvidha Escapes made it effortless! Great
                hotels, safe locations, and the AI planner understood exactly
                what I wanted. Five stars!&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                  alt="Sneha Reddy"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sneha Reddy</h4>
                  <p className="text-sm text-gray-600">
                    Thailand Trip, Sep 2024
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;Outstanding experience! The Kerala backwaters trip was
                peaceful and rejuvenating. Everything from houseboat to Ayurveda
                spa was perfectly arranged. Suvidha Escapes exceeded all our
                expectations!&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100"
                  alt="Vikram Singh"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Vikram Singh</h4>
                  <p className="text-sm text-gray-600">Kerala Trip, Aug 2024</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <p className="text-gray-600 font-medium">Happy Travelers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                4.9
              </div>
              <p className="text-gray-600 font-medium">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                150+
              </div>
              <p className="text-gray-600 font-medium">Destinations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-gray-600 font-medium">Support Available</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - Compact */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4"
            >
              Why Choose Suvidha Escapes?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              Your trusted travel partner for seamless journeys
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Best Prices Guaranteed",
                description:
                  "Get the lowest fares with our price match guarantee and exclusive deals.",
                icon: TrendingUp,
                color: "from-green-500 to-emerald-500",
              },
              {
                title: "24/7 Customer Support",
                description:
                  "Our travel experts are available round the clock to assist you.",
                icon: Headphones,
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Secure Booking",
                description:
                  "Your data is protected with industry-standard encryption and security.",
                icon: Shield,
                color: "from-purple-500 to-pink-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${feature.color} rounded-l-2xl`}
                />
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Featured Packages Section with Auto-Scrolling Carousel
interface FeaturedPackagesSectionProps {
  onNavigate?: (page: "holidays") => void;
}

function FeaturedPackagesSection({ onNavigate }: FeaturedPackagesSectionProps) {
  const [isPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Featured packages data
  const featuredPackages = [
    {
      id: "1",
      title: "Goa Beach Escape",
      destination: "Goa, India",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
      duration: "5D / 4N",
      price: 35000,
      rating: 4.9,
      reviews: 234,
      badge: "Bestseller",
      highlights: ["Beach Resort", "Water Sports", "Sunset Cruise"],
    },
    {
      id: "2",
      title: "Himalayan Adventure",
      destination: "Manali, HP",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop",
      duration: "6D / 5N",
      price: 28000,
      rating: 4.8,
      reviews: 189,
      badge: "Adventure",
      highlights: ["Rohtang Pass", "Paragliding", "Trekking"],
    },
    {
      id: "3",
      title: "Kerala Backwaters",
      destination: "Kerala, India",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop",
      duration: "4D / 3N",
      price: 22000,
      rating: 4.7,
      reviews: 156,
      badge: "Wellness",
      highlights: ["Houseboat Cruise", "Ayurveda Spa", "Backwaters"],
    },
    {
      id: "4",
      title: "Rajasthan Heritage",
      destination: "Jaipur, Udaipur",
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop",
      duration: "7D / 6N",
      price: 45000,
      rating: 4.9,
      reviews: 312,
      badge: "Heritage",
      highlights: ["Amber Fort", "City Palace", "Lake Pichola"],
    },
    {
      id: "5",
      title: "Andaman Paradise",
      destination: "Port Blair, Havelock",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
      duration: "5D / 4N",
      price: 42000,
      rating: 4.8,
      reviews: 198,
      badge: "Beach",
      highlights: ["Radhanagar Beach", "Scuba Diving", "Island Hopping"],
    },
    {
      id: "6",
      title: "Leh Ladakh Expedition",
      destination: "Leh, Ladakh",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      duration: "8D / 7N",
      price: 52000,
      rating: 5.0,
      reviews: 445,
      badge: "Popular",
      highlights: ["Pangong Lake", "Nubra Valley", "Khardung La"],
    },
  ];

  useEffect(() => {
    if (!scrollRef.current || isPaused) return;

    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollAmount += scrollSpeed;
        scrollContainer.scrollLeft = scrollAmount;

        // Reset when reaching halfway (since we doubled the content)
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="default" className="mb-3">
                Trending Now
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Featured Holiday Packages
              </h2>
              <p className="text-lg text-gray-600">
                Handpicked destinations for your next unforgettable vacation
              </p>
            </motion.div>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => onNavigate?.("holidays")}
            className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
          >
            View All Packages
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.slice(0, 6).map((pkg, index) => (
            <motion.div
              key={`${pkg.id}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onNavigate?.("holidays")}
            >
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="default"
                      className="backdrop-blur-sm bg-blue-600/90"
                    >
                      {pkg.badge}
                    </Badge>
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
                    <Heart className="h-5 w-5 text-gray-700" />
                  </button>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-white/90 text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{pkg.destination}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                      {pkg.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Rating & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          {pkg.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        ({pkg.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-600 mb-0.5">
                        Starting from
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{pkg.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button (Mobile) */}
        <div className="mt-8 text-center md:hidden">
          <button
            onClick={() => onNavigate?.("holidays")}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            View All Packages
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

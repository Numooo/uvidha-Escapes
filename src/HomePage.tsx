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
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";
import type { Package } from "./types";

type TabType = "flights" | "hotels" | "holidays" | "visa";
type TripType = "oneway" | "roundtrip";
type CabinClass = "economy" | "premium-economy" | "business" | "first";

interface HomePageProps {
  onSearchFlights?: () => void;
  onNavigate?: (page: "flights" | "hotels" | "holidays" | "visa") => void;
}

export function HomePage({ onSearchFlights, onNavigate }: HomePageProps = {}) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<TabType>("flights");
  const [tripType, setTripType] = useState<TabType | any>("roundtrip"); // Using any for tripType consistency
  const [cabinClass, setCabinClass] = useState<CabinClass>("economy");
  const { symbol, CurrencyIcon } = useCurrency();

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
          {/* Dark solid overlay for readability */}
          <div className="absolute inset-0 bg-brand-primary/80" />
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
              {t("Hero.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/90 sm:text-xl"
            >
              {t("Hero.subtitle")}
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
                { id: "flights" as TabType, label: t("Search.tabs.flights"), icon: Plane },
                { id: "hotels" as TabType, label: t("Search.tabs.hotels"), icon: Hotel },
                {
                  id: "holidays" as TabType,
                  label: t("Search.tabs.holidays"),
                  icon: Palmtree,
                },
                { id: "visa" as TabType, label: t("Search.tabs.visa"), icon: FileText },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all rounded-t-lg ${
                      activeTab === tab.id
                        ? "text-brand-primary bg-brand-primary/5"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-t"
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
                      {t("Search.flights.oneWay")}
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
                      {t("Search.flights.roundTrip")}
                    </span>
                  </label>
                </div>

                {/* Search Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Origin */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.flights.from")}
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
                      {t("Search.flights.to")}
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
                      {tripType === "roundtrip" ? t("Search.flights.departure") : t("Search.flights.date")}
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
                        {t("Search.flights.return")}
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
                      {t("Search.flights.passengers")}
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
                          {totalPassengers === 1 ? t("Search.flights.passenger") : t("Search.flights.passengers")}
                          {children > 0 && (
                            <span className="text-gray-500 ml-1">
                              ({adults} {t("Search.flights.adults")},{" "}
                              {children} {t("Search.flights.children")})
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
                                  {t("Search.flights.adults")}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {t("Search.flights.age12Plus")}
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
                                  {t("Search.flights.children")}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {t("Search.flights.age2To11")}
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
                              {t("Search.flights.maxPassengers")}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Cabin Class */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.flights.cabinClass")}
                    </label>
                    <div className="relative">
                      <select
                        value={cabinClass}
                        onChange={(e) =>
                          setCabinClass(e.target.value as CabinClass)
                        }
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="economy">{t("Search.flights.economy")}</option>
                        <option value="premium-economy">{t("Search.flights.premiumEconomy")}</option>
                        <option value="business">{t("Search.flights.business")}</option>
                        <option value="first">{t("Search.flights.first")}</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="w-full rounded-xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Plane className="h-5 w-5" />
                  {t("Search.flights.search")}
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
                      {t("Search.hotels.destination")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={hotelDestination}
                        onChange={(e) => setHotelDestination(e.target.value)}
                        placeholder={t("Search.hotels.destinationPlaceholder")}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Check-in Date */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.hotels.checkIn")}
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
                      {t("Search.hotels.checkOut")}
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
                      {t("Search.hotels.rooms")}
                    </label>
                    <div className="relative">
                      <Hotel className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={hotelRooms}
                        onChange={(e) => setHotelRooms(Number(e.target.value))}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? t("Search.hotels.room") : t("Search.hotels.rooms")}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.hotels.guests")}
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={hotelGuests}
                        onChange={(e) => setHotelGuests(Number(e.target.value))}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? t("Search.hotels.guest") : t("Search.hotels.guests")}
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
                  className="w-full rounded-xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Hotel className="h-5 w-5" />
                  {t("Search.hotels.search")}
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
                      {t("Search.holidays.destination")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={holidayDestination}
                        onChange={(e) => setHolidayDestination(e.target.value)}
                        placeholder={t("Search.holidays.destinationPlaceholder")}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.holidays.budget")}
                    </label>
                    <div className="relative">
                      <select
                        value={holidayBudget}
                        onChange={(e) => setHolidayBudget(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="budget">{t("Search.holidays.budgetRange.budget", { symbol })}</option>
                        <option value="medium">{t("Search.holidays.budgetRange.medium", { symbol })}</option>
                        <option value="luxury">{t("Search.holidays.budgetRange.luxury", { symbol })}</option>
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
                      {t("Search.holidays.travelStart")}
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
                      {t("Search.holidays.travelEnd")}
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
                      {t("Search.holidays.travelers")}
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={holidayTravelers}
                        onChange={(e) =>
                          setHolidayTravelers(Number(e.target.value))
                        }
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? t("Search.holidays.traveler") : t("Search.holidays.travelers")}
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
                  className="w-full rounded-xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Palmtree className="h-5 w-5" />
                  {t("Search.holidays.search")}
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
                      {t("Search.visa.destination")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={visaCountry}
                        onChange={(e) => setVisaCountry(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        <option value="">{t("Search.visa.selectCountry")}</option>
                        {Object.entries(t.raw("Search.visa.countries")).map(([code, name]) => (
                          <option key={code} value={code}>
                            {name as string}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Visa Type */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.visa.visaType")}
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={visaType}
                        onChange={(e) => setVisaType(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        <option value="tourist">{t("Search.visa.types.tourist")}</option>
                        <option value="business">{t("Search.visa.types.business")}</option>
                        <option value="student">{t("Search.visa.types.student")}</option>
                        <option value="work">{t("Search.visa.types.work")}</option>
                        <option value="transit">{t("Search.visa.types.transit")}</option>
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
                      {t("Search.visa.travelDate")}
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
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      />
                    </div>
                  </div>

                  {/* Number of Applicants */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.visa.applicants")}
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={visaApplicants}
                        onChange={(e) =>
                          setVisaApplicants(Number(e.target.value))
                        }
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? t("Search.visa.applicant") : t("Search.visa.applicants")}
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
                  className="w-full rounded-xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText className="h-5 w-5" />
                  {t("Search.visa.check")}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Holiday Packages - Auto-Scrolling Carousel */}
      <FeaturedPackagesSection onNavigate={onNavigate} />

      {/* Testimonials Section */}
      <section className="py-20 bg-brand-primary/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-full text-sm font-semibold mb-4">
              ⭐ {t("Testimonials.badge")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("Testimonials.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("Testimonials.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.raw("Testimonials.list").map((testimonial: { content: string; author: string; trip: string }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.trip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                {t("Stats.data.travelers")}
              </div>
              <p className="text-gray-600 font-medium">{t("Stats.happyTravelers")}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                {t("Stats.data.rating")}
              </div>
              <p className="text-gray-600 font-medium">{t("Stats.averageRating")}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                {t("Stats.data.destinations")}
              </div>
              <p className="text-gray-600 font-medium">{t("Stats.destinations")}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                {t("Stats.data.support")}
              </div>
              <p className="text-gray-600 font-medium">{t("Stats.support")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - Compact */}
      <section className="py-16 bg-brand-primary/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4"
            >
              {t("WhyChooseUs.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              {t("WhyChooseUs.subtitle")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: t("WhyChooseUs.features.prices.title"),
                description: t("WhyChooseUs.features.prices.description"),
                icon: TrendingUp,
                color: "bg-brand-accent",
              },
              {
                title: t("WhyChooseUs.features.support.title"),
                description: t("WhyChooseUs.features.support.description"),
                icon: Headphones,
                color: "bg-brand-secondary",
              },
              {
                title: t("WhyChooseUs.features.secure.title"),
                description: t("WhyChooseUs.features.secure.description"),
                icon: Shield,
                color: "bg-brand-primary",
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
                  className={`absolute top-0 left-0 w-1 h-full ${feature.color} rounded-l-2xl`}
                />
                <div
                  className={`inline-flex p-4 rounded-xl ${feature.color} mb-4`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
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
  const t = useTranslations();
  const { symbol } = useCurrency();
  const [isPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Featured packages data
  const featuredPackages = t.raw("Featured.packages") as Package[];

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
                {t("Featured.badge")}
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                {t("Featured.title")}
              </h2>
              <p className="text-lg text-gray-600">
                {t("Featured.subtitle")}
              </p>
            </motion.div>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => onNavigate?.("holidays")}
            className="hidden md:flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-secondary transition-colors group"
          >
            {t("Featured.viewAll")}
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
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-secondary transition-colors">
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
                        ({pkg.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">
                        {typeof pkg.duration === "string"
                          ? pkg.duration
                          : `${t("Holidays.daysCount", { count: pkg.duration.days })} / ${t("Holidays.nightsCount", { count: pkg.duration.nights })}`}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.highlights?.slice(0, 3).map((highlight: string, idx: number) => (
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
                        {t("Featured.startingFrom")}
                      </p>
                      <p className="text-2xl font-bold text-brand-primary">
                        {symbol}{(pkg.price || 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">{t("Featured.perPerson")}</p>
                    </div>
                    <button className="px-4 py-2 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-secondary transition-colors flex items-center gap-2">
                      {t("Featured.viewDetails")}
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
            className="w-full px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-brand-secondary transition-colors flex items-center justify-center gap-2"
          >
            {t("Featured.viewAll")}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

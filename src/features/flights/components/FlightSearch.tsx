"use client";

import React, { useState } from "react";
import { Plane, MapPin, Calendar, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { AIRPORTS } from "@/shared/mocks/data";
import { useTranslations } from "next-intl";
import { PassengerSelector } from "@/shared/ui/passenger-selector";

interface FlightSearchProps {
  onSearch?: (from: string, to: string) => void;
}

export function FlightSearch({ onSearch }: FlightSearchProps) {
  const t = useTranslations();
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("roundtrip");
  const [cabinClass, setCabinClass] = useState("economy");
  const [flightOrigin, setFlightOrigin] = useState("FRU");
  const [flightDestination, setFlightDestination] = useState("DXB");
  const [departureDate, setDepartureDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [returnDate, setReturnDate] = useState(format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
  
  // Passenger state
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [animals, setAnimals] = useState(0);
  const [animalsComment, setAnimalsComment] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(flightOrigin, flightDestination);
    }
  };

  return (
    <div className="space-y-6">
      {/* Trip Type */}
      <div className="flex p-1 bg-gray-100 rounded-2xl w-fit">
        <button
          onClick={() => setTripType("oneway")}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
            tripType === "oneway"
              ? "bg-white text-brand-primary shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("Search.flights.oneWay")}
        </button>
        <button
          onClick={() => setTripType("roundtrip")}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
            tripType === "roundtrip"
              ? "bg-white text-brand-primary shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("Search.flights.roundTrip")}
        </button>
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
            <select
              value={flightOrigin}
              onChange={(e) => setFlightOrigin(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
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
            <select
              value={flightDestination}
              onChange={(e) => setFlightDestination(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {AIRPORTS.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Departure Date */}
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {tripType === "roundtrip"
              ? t("Search.flights.departure")
              : t("Search.flights.date")}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Return Date */}
        {tripType === "roundtrip" && (
          <div className="relative">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t("Search.flights.return")}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        )}
      </div>

      {/* Passengers & Class */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PassengerSelector
          adults={adults}
          children={children}
          animals={animals}
          animalsComment={animalsComment}
          onAdultsChange={setAdults}
          onChildrenChange={setChildren}
          onAnimalsChange={setAnimals}
          onAnimalsCommentChange={setAnimalsComment}
        />

        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.flights.cabinClass")}
          </label>
          <div className="flex p-1 bg-gray-100 rounded-2xl">
            {[
              { id: "economy", label: t("Search.flights.economy") },
              { id: "business", label: t("Search.flights.business") },
            ].map((cabin) => (
              <button
                key={cabin.id}
                onClick={() => setCabinClass(cabin.id)}
                className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                  cabinClass === cabin.id
                    ? "bg-white text-brand-primary shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {cabin.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full rounded-2xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
      >
        <Plane className="h-5 w-5" />
        {t("Search.flights.search")}
      </button>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Train, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { AIRPORTS } from "@/shared/mocks/data";
import { useTranslations } from "next-intl";

interface TrainSearchProps {
  onSearch?: (from: string, to: string, date: string) => void;
}

export function TrainSearch({ onSearch }: TrainSearchProps) {
  const t = useTranslations();
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [origin, setOrigin] = useState("FRU");
  const [destination, setDestination] = useState("DXB");
  const [date, setDate] = useState(format(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
  const [passengers, setPassengers] = useState(1);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(origin, destination, date);
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
          {t("Search.trains.oneWay")}
        </button>
        <button
          onClick={() => setTripType("roundtrip")}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
            tripType === "roundtrip"
              ? "bg-white text-brand-primary shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("Search.trains.roundTrip")}
        </button>
      </div>

      {/* Search Inputs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Origin */}
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.trains.from")}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
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
            {t("Search.trains.to")}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
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

        {/* Date */}
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.trains.date")}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary"
            />
          </div>
        </div>

        {/* Passengers */}
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.trains.passengers")}
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? t("Search.trains.passenger") : t("Search.trains.passengers")}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full rounded-2xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
      >
        <Train className="h-5 w-5" />
        {t("Search.trains.search")}
      </button>
    </div>
  );
}

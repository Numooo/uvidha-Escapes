"use client";

import React, { useState } from "react";
import { Palmtree, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface HolidaySearchProps {
  onSearch?: (destination: string) => void;
}

export function HolidaySearch({ onSearch }: HolidaySearchProps) {
  const t = useTranslations();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState("medium");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(destination);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Destination */}
        <div className="relative lg:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.holidays.destination")}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={t("Search.holidays.destinationPlaceholder")}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.holidays.departure")}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary"
            />
          </div>
        </div>

        {/* Passengers */}
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.holidays.travelers")}
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? t("Search.flights.passenger") : t("Search.flights.passengers")}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Budget Selector */}
      <div className="w-full max-w-md">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {t("Search.holidays.budget")}
        </label>
        <div className="flex p-1 bg-gray-100 rounded-2xl">
          {["economy", "medium", "luxury"].map((b) => (
            <button
              key={b}
              onClick={() => setBudget(b)}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                budget === b
                  ? "bg-white text-brand-primary shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t(`Search.holidays.budgets.${b}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full rounded-2xl bg-brand-primary py-4 text-white font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99]"
      >
        <Palmtree className="h-5 w-5" />
        {t("Search.holidays.search")}
      </button>
    </div>
  );
}

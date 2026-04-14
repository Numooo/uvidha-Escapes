"use client";

import React, { useState } from "react";
import { Hotel, MapPin, Calendar, ChevronDown, Users } from "lucide-react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface HotelSearchProps {
  onSearch?: (destination: string) => void;
}

export function HotelSearch({ onSearch }: HotelSearchProps) {
  const t = useTranslations();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(format(new Date(), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(format(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(destination);
    }
  };

  return (
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
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={t("Search.hotels.destinationPlaceholder")}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.hotels.checkIn")}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary"
            />
          </div>
        </div>
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.hotels.checkOut")}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.hotels.guests")}
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? t("Search.hotels.guest") : t("Search.hotels.guests")}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.hotels.rooms")}
          </label>
          <div className="relative">
            <Hotel className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? t("Search.hotels.room") : t("Search.hotels.rooms")}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full rounded-2xl bg-brand-primary py-4 text-white font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99]"
      >
        <Hotel className="h-5 w-5" />
        {t("Search.hotels.search")}
      </button>
    </div>
  );
}

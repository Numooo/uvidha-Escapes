"use client";

import React, { useState } from "react";
import { Train, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface TrainSearchProps {
  onSearch?: (from: string, to: string, date: string) => void;
}

import { DatePicker } from "@/shared/ui/DatePicker";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { AirportAutocomplete } from "@/shared/ui/AirportAutocomplete";

export function TrainSearch({ onSearch }: TrainSearchProps) {
  const t = useTranslations();
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
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
      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Origin */}
        <AirportAutocomplete
          label={t("Search.trains.from")}
          value={origin}
          onChange={setOrigin}
          placeholder={t("Search.trains.from")}
          mode="train"
          icon={<Train className="h-5 w-5" />}
        />

        {/* Destination */}
        <AirportAutocomplete
          label={t("Search.trains.to")}
          value={destination}
          onChange={setDestination}
          placeholder={t("Search.trains.to")}
          mode="train"
          icon={<Train className="h-5 w-5" />}
        />

        {/* Date */}
        <DatePicker
          label={t("Search.trains.date")}
          value={date}
          onChange={setDate}
          minDate={new Date()}
        />

        {/* Passengers */}
        <CustomSelect
          label={t("Search.trains.passengers")}
          value={passengers}
          onChange={setPassengers}
          icon={<Users className="h-5 w-5" />}
          options={[1, 2, 3, 4, 5, 6].map((num) => ({
            value: num,
            label: `${num} ${num === 1 ? t("Search.trains.passenger") : t("Search.trains.passengers")}`,
          }))}
        />
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

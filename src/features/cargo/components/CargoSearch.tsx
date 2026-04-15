"use client";

import React, { useState } from "react";
import { Truck, MapPin, Calendar, Scale, ChevronDown, Box } from "lucide-react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface CargoSearchProps {
  onSearch?: (data: {
    origin: string;
    destination: string;
    weight: string;
    volume: string;
    type: string;
  }) => void;
}

import { DatePicker } from "@/shared/ui/DatePicker";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { AirportAutocomplete } from "@/shared/ui/AirportAutocomplete";

export function CargoSearch({ onSearch }: CargoSearchProps) {
  const t = useTranslations();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(format(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [type, setType] = useState("standard");

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ origin, destination, weight, volume, type });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AirportAutocomplete
          label={t("Search.cargo.from")}
          value={origin}
          onChange={setOrigin}
          placeholder={t("Search.cargo.from")}
        />
        <AirportAutocomplete
          label={t("Search.cargo.to")}
          value={destination}
          onChange={setDestination}
          placeholder={t("Search.cargo.to")}
        />
        <DatePicker
          label={t("Search.cargo.date")}
          value={date}
          onChange={setDate}
          minDate={new Date()}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative">
          <label className="mb-1.5 block text-xs font-semibold text-gray-500 capitalize px-1">
            {t("Search.cargo.weight")}
          </label>
          <div className="relative group">
            <Scale className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors z-10" />
            <input
              type="number"
              min="1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full appearance-none rounded-2xl border-none bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-primary/20 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="relative">
          <label className="mb-1.5 block text-xs font-semibold text-gray-500 capitalize px-1">
            {t("Cargo.calcVol")}
          </label>
          <div className="relative group">
            <Box className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors z-10" />
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full appearance-none rounded-2xl border-none bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-primary/20 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>
        <CustomSelect
          label={t("Search.cargo.type")}
          value={type}
          onChange={setType}
          icon={<Truck className="h-5 w-5" />}
          options={[
            { value: "standard", label: t("Search.cargo.types.standard") },
            { value: "express", label: t("Search.cargo.types.express") },
            { value: "perishable", label: t("Search.cargo.types.perishable") },
            { value: "fragile", label: t("Search.cargo.types.fragile") },
          ]}
        />
      </div>
      <button
        onClick={handleSearch}
        className="w-full rounded-2xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
      >
        <Truck className="h-5 w-5" />
        {t("Search.cargo.calculate")}
      </button>
    </div>
  );
}

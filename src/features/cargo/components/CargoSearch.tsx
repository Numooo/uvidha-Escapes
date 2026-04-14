"use client";

import React, { useState } from "react";
import { Truck, MapPin, Calendar, Scale, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { AIRPORTS } from "@/shared/mocks/data";
import { useTranslations } from "next-intl";

interface CargoSearchProps {
  onSearch?: (data: {
    origin: string;
    destination: string;
    weight: string;
    type: string;
  }) => void;
}

export function CargoSearch({ onSearch }: CargoSearchProps) {
  const t = useTranslations();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(format(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
  const [weight, setWeight] = useState("");
  const [type, setType] = useState("standard");

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ origin, destination, weight, type });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.cargo.from")}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            >
              <option value="">{t("Search.cargo.from")}</option>
              {AIRPORTS.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.cargo.to")}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            >
              <option value="">{t("Search.cargo.to")}</option>
              {AIRPORTS.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.cargo.date")}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={format(new Date(), "yyyy-MM-dd")}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary"
            />
          </div>
        </div>
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.cargo.weight")}
          </label>
          <div className="relative">
            <Scale className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              min="1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary"
            />
          </div>
        </div>
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.cargo.type")}
          </label>
          <div className="relative">
            <Truck className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary"
            >
              <option value="standard">{t("Search.cargo.types.standard")}</option>
              <option value="express">{t("Search.cargo.types.express")}</option>
              <option value="perishable">{t("Search.cargo.types.perishable")}</option>
              <option value="fragile">{t("Search.cargo.types.fragile")}</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
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

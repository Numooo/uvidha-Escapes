import React, { useState } from "react";
import { X } from "lucide-react";
import type { FilterState } from "../../types";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";

export interface FlightFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearAll: () => void;
  onClose?: () => void;
}

const AIRLINES = [
  "Air India",
  "IndiGo",
  "Vistara",
  "SpiceJet",
  "Go First",
  "AirAsia India",
];

export function FlightFilters({
  filters,
  onFilterChange,
  onClearAll,
  onClose,
}: FlightFiltersProps) {
  const t = useTranslations("Flights.filtersSidebar");
  const tSearch = useTranslations("Search.flights");
  const { symbol, symbolText, CurrencySymbol } = useCurrency();

  const TIME_SLOTS = [
    { id: "morning", label: tSearch("morning" as any), time: "6AM - 12PM" },
    { id: "afternoon", label: tSearch("afternoon" as any), time: "12PM - 6PM" },
    { id: "evening", label: tSearch("evening" as any), time: "6PM - 12AM" },
    { id: "night", label: tSearch("night" as any), time: "12AM - 6AM" },
  ];

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = <K extends keyof FilterState>(
    key: K,
    value: string
  ) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as FilterState[K]);
  };

  const hasActiveFilters =
    filters.stops.length > 0 ||
    filters.airlines.length > 0 ||
    filters.departureTime.length > 0 ||
    filters.arrivalTime.length > 0 ||
    filters.cabinClass.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100000;

  return (
    <div
      className={`bg-white ${
        onClose ? "h-full" : "rounded-lg border border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">{t("title")}</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {t("clearAll")}
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Content */}
      <div
        className={`${
          onClose ? "h-[calc(100%-64px)] overflow-y-auto" : ""
        } p-4 space-y-6`}
      >
        {/* Price Range */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            {t("priceRange")}
          </h3>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                updateFilter("priceRange", [0, parseInt(e.target.value)])
              }
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center">
                <CurrencySymbol className="h-3 w-3 mr-1" />
                0
              </span>
              <span className="font-semibold text-gray-900 flex items-center">
                <CurrencySymbol className="h-4 w-4 mr-1" />
                {filters.priceRange[1].toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Stops */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            {t("stops")}
          </h3>
          <div className="space-y-2">
            {[
              { id: "non-stop", label: t("stopTypes.nonStop") },
              { id: "1-stop", label: t("stopTypes.oneStop") },
              { id: "2-plus", label: t("stopTypes.twoPlus") },
            ].map((stop) => (
              <label
                key={stop.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.stops.includes(stop.id)}
                  onChange={() => toggleArrayFilter("stops", stop.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{stop.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Airlines */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            {t("airlines")}
          </h3>
          <div className="space-y-2">
            {AIRLINES.map((airline) => (
              <label
                key={airline}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.airlines.includes(airline)}
                  onChange={() => toggleArrayFilter("airlines", airline)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{airline}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Departure Time */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            {t("departureTime")}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.id}
                onClick={() => toggleArrayFilter("departureTime", slot.id)}
                className={`rounded-lg border p-2 text-left transition-colors ${
                  filters.departureTime.includes(slot.id)
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="text-xs font-semibold">{slot.label}</div>
                <div className="text-xs text-gray-600">{slot.time}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Arrival Time */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            {t("arrivalTime")}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.id}
                onClick={() => toggleArrayFilter("arrivalTime", slot.id)}
                className={`rounded-lg border p-2 text-left transition-colors ${
                  filters.arrivalTime.includes(slot.id)
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="text-xs font-semibold">{slot.label}</div>
                <div className="text-xs text-gray-600">{slot.time}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            {t("duration")}
          </h3>
          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="24"
              value={filters.duration[1]}
              onChange={(e) =>
                updateFilter("duration", [
                  filters.duration[0],
                  parseInt(e.target.value),
                ])
              }
              className="w-full"
            />
            <div className="text-center text-sm font-semibold text-gray-900">
              {filters.duration[1]} {t("hours")}
            </div>
          </div>
        </div>

        {/* Cabin Class */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            {t("cabinClass")}
          </h3>
          <div className="space-y-2">
            {[
              { id: "Economy", label: tSearch("economy") },
              { id: "Premium Economy", label: tSearch("premiumEconomy") },
              { id: "Business", label: tSearch("business") },
              { id: "First Class", label: tSearch("first") },
            ].map((cabin) => (
              <label
                key={cabin.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.cabinClass.includes(cabin.id)}
                  onChange={() => toggleArrayFilter("cabinClass", cabin.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{cabin.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

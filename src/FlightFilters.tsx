import React, { useState } from "react";
import { X } from "lucide-react";
import type { FilterState } from "./types";

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

const TIME_SLOTS = [
  { id: "morning", label: "Morning", time: "6AM - 12PM" },
  { id: "afternoon", label: "Afternoon", time: "12PM - 6PM" },
  { id: "evening", label: "Evening", time: "6PM - 12AM" },
  { id: "night", label: "Night", time: "12AM - 6AM" },
];

export function FlightFilters({
  filters,
  onFilterChange,
  onClearAll,
  onClose,
}: FlightFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleArrayFilter = <K extends keyof FilterState>(
    key: K,
    value: string
  ) => {
    const currentArray = localFilters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as FilterState[K]);
  };

  const hasActiveFilters =
    localFilters.stops.length > 0 ||
    localFilters.airlines.length > 0 ||
    localFilters.departureTime.length > 0 ||
    localFilters.arrivalTime.length > 0 ||
    localFilters.cabinClass.length > 0 ||
    localFilters.priceRange[0] > 0 ||
    localFilters.priceRange[1] < 50000;

  return (
    <div
      className={`bg-white ${
        onClose ? "h-full" : "rounded-lg border border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear all
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
            Price Range
          </h3>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={localFilters.priceRange[1]}
              onChange={(e) =>
                updateFilter("priceRange", [0, parseInt(e.target.value)])
              }
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">₹0</span>
              <span className="font-semibold text-gray-900">
                ₹{localFilters.priceRange[1].toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Stops */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Stops</h3>
          <div className="space-y-2">
            {["Non-stop", "1 stop", "2+ stops"].map((stop) => (
              <label
                key={stop}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={localFilters.stops.includes(stop)}
                  onChange={() => toggleArrayFilter("stops", stop)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{stop}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Airlines */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Airlines</h3>
          <div className="space-y-2">
            {AIRLINES.map((airline) => (
              <label
                key={airline}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={localFilters.airlines.includes(airline)}
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
            Departure Time
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.id}
                onClick={() => toggleArrayFilter("departureTime", slot.id)}
                className={`rounded-lg border p-2 text-left transition-colors ${
                  localFilters.departureTime.includes(slot.id)
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
            Arrival Time
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.id}
                onClick={() => toggleArrayFilter("arrivalTime", slot.id)}
                className={`rounded-lg border p-2 text-left transition-colors ${
                  localFilters.arrivalTime.includes(slot.id)
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
            Max Duration
          </h3>
          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="24"
              value={localFilters.duration[1]}
              onChange={(e) =>
                updateFilter("duration", [
                  localFilters.duration[0],
                  parseInt(e.target.value),
                ])
              }
              className="w-full"
            />
            <div className="text-center text-sm font-semibold text-gray-900">
              Up to {localFilters.duration[1]} hours
            </div>
          </div>
        </div>

        {/* Cabin Class */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Cabin Class
          </h3>
          <div className="space-y-2">
            {["Economy", "Premium Economy", "Business", "First Class"].map(
              (cabin) => (
                <label
                  key={cabin}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.cabinClass.includes(cabin)}
                    onChange={() => toggleArrayFilter("cabinClass", cabin)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{cabin}</span>
                </label>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { MapPin, Search, Star, Plane, Train } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Airport } from "@/types";

interface AirportAutocompleteProps {
  label: string;
  value: string;
  onChange: (code: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  mode?: "airport" | "train";
}

const POPULAR_AIRPORTS = ["FRU", "MOW", "IST", "DXB", "ALA"];

export function AirportAutocomplete({
  label,
  value,
  onChange,
  placeholder,
  icon,
  mode = "airport",
}: AirportAutocompleteProps) {
  const t = useTranslations();
  const AIRPORTS = useMemo(() => t.raw("MockData.airports") as Airport[], [t]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedAirport = useMemo(
    () => AIRPORTS.find((a) => a.code === value),
    [value]
  );

  // Initialize search text with current value
  useEffect(() => {
    if (selectedAirport && !isOpen) {
      setSearch(mode === "train" ? selectedAirport.city : `${selectedAirport.city}, ${selectedAirport.name}`);
    } else if (!value && !isOpen) {
      setSearch("");
    }
  }, [selectedAirport, value, isOpen, mode]);

  const filteredAirports = useMemo(() => {
    const query = search.toLowerCase().trim();
    
    let results = AIRPORTS;
    
    // If empty, show popular
    if (!query) {
      results = results.filter((a) => POPULAR_AIRPORTS.includes(a.code));
    } else {
      // If typing, filter by city, code, or name
      results = results.filter(
        (a) =>
          a.city.toLowerCase().includes(query) ||
          a.code.toLowerCase().includes(query) ||
          (mode === "airport" && a.name.toLowerCase().includes(query))
      );
    }

    if (mode === "train") {
      // Return only unique cities for train mode
      const uniqueCities = new Set();
      return results.filter(a => {
        if (uniqueCities.has(a.city)) return false;
        uniqueCities.add(a.city);
        return true;
      }).slice(0, 5);
    }

    return results.slice(0, 5);
  }, [search, mode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="mb-1.5 block text-xs font-semibold text-gray-500 capitalize px-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors z-10">
          {icon || <MapPin className="h-4 w-4" />}
        </div>
        <input
          type="text"
          value={search}
          onFocus={() => {
            setIsOpen(true);
            setSearch("");
          }}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full appearance-none rounded-2xl border-none bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-primary/20 transition-all placeholder:text-gray-400"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
            style={{ minWidth: "300px" }}
          >
            <div className="p-2">
              <div className="space-y-1">
                {filteredAirports.length > 0 ? (
                  filteredAirports.map((airport) => (
                    <button
                      key={airport.code}
                      onClick={() => {
                        onChange(airport.code);
                        setSearch(mode === "train" ? airport.city : `${airport.city}, ${airport.name}`);
                        setIsOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all hover:bg-gray-50 group"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400 group-hover:bg-brand-primary group-hover:text-white transition-all">
                        {mode === "train" ? (
                          <Train className="h-4 w-4" />
                        ) : (
                          <Plane className="h-4 w-4 -rotate-45" />
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="truncate font-bold text-gray-900">
                            {airport.city}
                          </span>
                          {mode === "airport" && (
                            <span className="ml-2 font-mono text-[10px] font-bold text-gray-400">
                              {airport.code}
                            </span>
                          )}
                        </div>
                        {mode === "airport" && (
                          <p className="truncate text-xs text-gray-500">
                            {airport.name}
                          </p>
                        )}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-12 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                      <Search className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-bold text-gray-500">
                      {t("Search.noResults")}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-tighter">
                      {t("Search.searchTip")}
                    </p>
                  </div>
                )}
              </div>
            </div>
        
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

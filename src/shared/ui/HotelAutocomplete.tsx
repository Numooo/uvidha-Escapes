"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { MapPin, Search, Hotel as HotelIcon, Building2, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Hotel } from "@/types";

interface HotelAutocompleteProps {
  label: string;
  value: string;
  onChange: (city: string) => void;
  placeholder?: string;
}

export function HotelAutocomplete({
  label,
  value,
  onChange,
  placeholder,
}: HotelAutocompleteProps) {
  const t = useTranslations();
  const MOCK_HOTELS = useMemo(() => t.raw("MockData.hotels") as Hotel[], [t]);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If we have a value but no manually typed search, try to find the label
    if (value && !search && !isOpen) {
      setSearch(value);
    }
  }, [value, isOpen]);

  const suggestions = useMemo(() => {
    const query = search.toLowerCase().trim();
    
    const filtered = MOCK_HOTELS.filter(
      (h) =>
        h.name.toLowerCase().includes(query) ||
        (h.city && h.city.toLowerCase().includes(query)) ||
        (h.country && h.country.toLowerCase().includes(query))
    );

    return filtered.slice(0, 5);
  }, [search, MOCK_HOTELS]);

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
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative group">
        <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
        <input
          type="text"
          value={search}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
            style={{ minWidth: "320px" }}
          >
            <div className="p-2 max-h-[320px] overflow-y-auto no-scrollbar">
              <div className="space-y-1">
                {suggestions.length > 0 ? (
                  suggestions.map((hotel) => (
                    <button
                      key={hotel.id}
                      onClick={() => {
                        onChange(hotel.city || hotel.name);
                        setSearch(hotel.city || hotel.name);
                        setIsOpen(false);
                      }}
                      className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-all hover:bg-gray-50 group"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400 group-hover:bg-brand-primary group-hover:text-white transition-all">
                        <HotelIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="truncate font-bold text-gray-900">
                            {hotel.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-brand-primary font-medium flex items-center gap-1">
                            <Building2 size={12} />
                            {hotel.city}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Globe size={12} />
                            {hotel.country}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Search className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p className="text-sm font-bold text-gray-500">{t("Hotels.noHotelsFound")}</p>
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

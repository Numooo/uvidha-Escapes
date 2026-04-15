"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  label: string;
  value: string | number;
  onChange: (value: any) => void;
  options: Option[];
  icon?: React.ReactNode;
}

export function CustomSelect({ label, value, onChange, options, icon }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 rounded-2xl border-none bg-gray-50 py-3.5 px-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-primary/20 transition-all text-left hover:bg-gray-100"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {icon && <div className="text-gray-400 opacity-70 flex-shrink-0">{icon}</div>}
          <span className="truncate">{selectedOption?.label || "Select..."}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-2"
          >
            <div className="max-h-64 overflow-y-auto no-scrollbar px-1.5">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                      isSelected
                        ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                        : "text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary"
                    }`}
                  >
                    <span className={`font-semibold ${isSelected ? "text-white" : "text-gray-700"}`}>
                      {option.label}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-2 w-2 rounded-full bg-white"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

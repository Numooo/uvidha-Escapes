"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, Baby, Dog, Users, Minus, Plus, ChevronDown, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface PassengerSelectorProps {
  adults: number;
  children: number;
  animals: number;
  animalsComment: string;
  onAdultsChange: (count: number) => void;
  onChildrenChange: (count: number) => void;
  onAnimalsChange: (count: number) => void;
  onAnimalsCommentChange: (comment: string) => void;
  label?: string;
  maxPassengers?: number;
}

export function PassengerSelector({
  adults,
  children,
  animals,
  animalsComment,
  onAdultsChange,
  onChildrenChange,
  onAnimalsChange,
  onAnimalsCommentChange,
  label,
  maxPassengers = 9,
}: PassengerSelectorProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalPassengers = adults + children;
  const canAddPassenger = totalPassengers < maxPassengers;
  const canRemoveAdult = adults > 1;
  const canRemoveChild = children > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label || t("Search.flights.passengers")}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-900 hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-400" />
          <span>
            {totalPassengers}{" "}
            {totalPassengers === 1
              ? t("Search.flights.passenger")
              : t("Search.flights.passengers")}
            {children > 0 && (
              <span className="text-gray-500 ml-1">
                ({adults} {t("Search.flights.adults")}, {children}{" "}
                {t("Search.flights.children")})
              </span>
            )}
            {animals > 0 && (
              <span className="text-brand-primary ml-1 font-bold">
                + {t("Search.flights.animalCount", { count: animals })}
              </span>
            )}
          </span>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white p-6 shadow-xl"
          >
            <div className="space-y-6">
              {/* Adults Counter */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {t("Search.flights.adults")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t("Search.flights.age12Plus")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => canRemoveAdult && onAdultsChange(adults - 1)}
                    disabled={!canRemoveAdult}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                      canRemoveAdult
                        ? "border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95"
                        : "border-gray-200 text-gray-300 cursor-not-allowed"
                     }`}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-base font-bold text-gray-900">
                    {adults}
                  </span>
                  <button
                    type="button"
                    onClick={() => canAddPassenger && onAdultsChange(adults + 1)}
                    disabled={!canAddPassenger}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                      canAddPassenger
                        ? "border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95"
                        : "border-gray-200 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-50">
                    <Baby className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {t("Search.flights.children")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t("Search.flights.age2To11")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => canRemoveChild && onChildrenChange(children - 1)}
                    disabled={!canRemoveChild}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                      canRemoveChild
                        ? "border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95"
                        : "border-gray-200 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-base font-bold text-gray-900">
                    {children}
                  </span>
                  <button
                    type="button"
                    onClick={() => canAddPassenger && onChildrenChange(children + 1)}
                    disabled={!canAddPassenger}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                      canAddPassenger
                        ? "border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95"
                        : "border-gray-200 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Animals Counter */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-50">
                    <Dog className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {t("Search.flights.animals")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t("Search.flights.animalsSubtitle")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => animals > 0 && onAnimalsChange(animals - 1)}
                    disabled={animals <= 0}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                      animals > 0
                        ? "border-orange-600 text-orange-600 hover:bg-orange-50 active:scale-95"
                        : "border-gray-200 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-base font-bold text-gray-900">
                    {animals}
                  </span>
                  <button
                    type="button"
                    onClick={() => animals < 5 && onAnimalsChange(animals + 1)}
                    disabled={animals >= 5}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                      animals < 5
                        ? "border-orange-600 text-orange-600 hover:bg-orange-50 active:scale-95"
                        : "border-gray-200 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Animals Comment */}
              <AnimatePresence>
                {animals > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pt-4 px-2 border-t border-gray-100 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 capitalize tracking-wider">
                      <MessageSquare size={14} />
                      {t("Search.flights.animalsCommentLabel")}
                    </div>
                    <textarea
                      value={animalsComment}
                      onChange={(e) => onAnimalsCommentChange(e.target.value)}
                      placeholder={t("Search.flights.animalsPlaceholder")}
                      className="w-full min-h-[80px] p-3 rounded-xl bg-gray-50 border-none text-sm text-gray-900 focus:ring-2 focus:ring-brand-primary/20 outline-none resize-none transition-all"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Info Note */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  {t("Search.flights.maxPassengers")}. {t("Search.flights.animalsNote")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

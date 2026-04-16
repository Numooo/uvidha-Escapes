"use client";

import React, { useState, useRef, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isBefore } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  minDate?: Date;
  placeholder?: string;
  position?: "top" | "bottom";
}

export function DatePicker({ label, value, onChange, minDate, placeholder, position = "bottom" }: DatePickerProps) {
  const t = useTranslations("Common.datePicker");
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const days = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const months = t.raw("months") as string[];
  const monthLabel = `${months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
  const daysOfWeek = t.raw("days") as string[];

  return (
    <div className="relative" ref={containerRef}>
      <label className="mb-1.5 block text-xs font-semibold text-gray-500 capitalize px-1">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 rounded-2xl border-none bg-gray-50 py-3.5 px-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-primary/20 transition-all text-left hover:bg-gray-100"
      >
        <CalendarIcon className="h-4 w-4 text-brand-primary opacity-70" />
        <span className={selectedDate ? "text-gray-900" : "text-gray-400"}>
          {selectedDate ? format(selectedDate, "dd.MM.yyyy") : (placeholder || t("placeholder"))}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: position === "top" ? -10 : 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === "top" ? -10 : 10, scale: 0.95 }}
            className={`absolute z-50 ${position === "top" ? "bottom-full mb-2" : "mt-2"} w-[310px] rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl`}
          >
            <div className="flex items-center justify-between mb-5">
              <button 
                onClick={(e) => { e.stopPropagation(); prevMonth(); }} 
                className="p-1.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-500"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="font-black text-gray-900 text-sm capitalize tracking-wider">
                {monthLabel}
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); nextMonth(); }} 
                className="p-1.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-500"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-3">
              {daysOfWeek.map((day) => (
                <span key={day} className="text-[10px] font-black text-gray-400 capitalize tracking-tighter">
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {days().map((day, idx) => {
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isPast = minDate ? isBefore(day, minDate) && !isSameDay(day, minDate) : false;

                return (
                  <button
                    key={idx}
                    disabled={isPast}
                    onClick={() => {
                      onChange(format(day, "yyyy-MM-dd"));
                      setIsOpen(false);
                    }}
                    className={`
                      aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all
                      ${isSelected ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : ""}
                      ${!isSelected && isCurrentMonth ? "text-gray-900 hover:bg-brand-primary/10 hover:text-brand-primary" : ""}
                      ${!isCurrentMonth ? "text-gray-300" : ""}
                      ${isPast ? "opacity-20 cursor-not-allowed" : ""}
                    `}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
               <button 
                 onClick={() => {
                   onChange(format(new Date(), "yyyy-MM-dd"));
                   setIsOpen(false);
                 }}
                 className="text-[10px] font-black capitalize text-brand-primary hover:text-brand-secondary transition-colors"
               >
                 {t("today")}
               </button>
               <button 
                 onClick={() => setIsOpen(false)}
                 className="text-[10px] font-black capitalize text-gray-400 hover:text-gray-600 transition-colors"
               >
                 {t("close")}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

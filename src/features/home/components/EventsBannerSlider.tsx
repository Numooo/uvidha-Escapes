"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy, MapPin, Calendar, Plane, Hotel } from "lucide-react";
import { useTranslations } from "next-intl";

interface EventItem {
  id: string;
  title: string;
  location: string;
  destinationCode?: string;
  date: string;
  description: string;
  image: string;
  category: string;
}

interface EventsBannerSliderProps {
  onNavigate?: (path: string) => void;
  onSearchFlights?: (from?: string, to?: string) => void;
}

export function EventsBannerSlider({ onNavigate, onSearchFlights }: EventsBannerSliderProps) {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  let events: EventItem[] = [];
  try {
    events = t.raw("Events.items") as EventItem[];
  } catch (e) {
    events = [];
  }

  useEffect(() => {
    if (!events || events.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [events?.length]);

  if (!events || events.length === 0) return null;

  const currentEvent = events[currentIndex];

  const handleBookNow = () => {
    if (onSearchFlights) {
      onSearchFlights(undefined, currentEvent.location);
    } else if (onNavigate) {
      onNavigate("flights");
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
            <Trophy className="h-15 w-15 text-blue-600 animate-pulse" />
            {t("Events.title")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("Events.subtitle")}
          </p>
        </div>

        <div className="relative h-[450px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group border border-gray-100 bg-gray-950">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0 z-0"
            >
              <img 
                src={currentEvent.image} 
                alt={currentEvent.title} 
                className="w-full h-full object-cover shadow-inner" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/40 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 md:w-3/4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-brand-primary/20 backdrop-blur-md text-brand-primary rounded-full text-[10px] font-bold uppercase tracking-widest border border-brand-primary/30">
                      {currentEvent.category}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-6xl font-black text-white mb-4 leading-[1.1] tracking-tight">
                    {currentEvent.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <MapPin className="h-4 w-4 text-brand-secondary" />
                      <span className="font-bold text-xs md:text-sm">{currentEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <Calendar className="h-4 w-4 text-brand-secondary" />
                      <span className="font-bold text-xs md:text-sm">{currentEvent.date}</span>
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl leading-relaxed font-medium line-clamp-3">
                    {currentEvent.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={handleBookNow}
                      className="px-8 py-3.5 bg-brand-primary text-white rounded-2xl font-black text-base hover:bg-brand-secondary transition-all duration-300 shadow-xl shadow-brand-primary/25 flex items-center gap-2.5 group/btn hover:scale-105 active:scale-95"
                    >
                      <Plane className="h-5 w-5 group-hover/btn:rotate-12 transition-transform" />
                      {t("Events.bookNow")}
                    </button>
                    <button 
                      onClick={() => onNavigate?.("hotels")}
                      className="px-8 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-black text-base hover:bg-white/20 transition-all duration-300 flex items-center gap-2.5 hover:scale-105 active:scale-95"
                    >
                      <Hotel className="h-5 w-5" />
                      {t("Search.tabs.hotels")}
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentIndex 
                  ? "w-14 bg-brand-primary shadow-[0_0_15px_rgba(var(--brand-primary),0.5)]" 
                  : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute right-10 bottom-10 flex gap-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)}
              className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-brand-primary hover:border-transparent transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % events.length)}
              className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-brand-primary hover:border-transparent transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

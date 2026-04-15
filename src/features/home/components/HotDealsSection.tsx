"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";

interface HotDealsSectionProps {
  onNavigate?: (page: string) => void;
  onSearchFlights?: (from?: string, to?: string) => void;
}

export function HotDealsSection({
  onNavigate,
  onSearchFlights,
}: HotDealsSectionProps) {
  const t = useTranslations();
  const { CurrencySymbol } = useCurrency();
  const scrollRef = useRef<HTMLDivElement>(null);

  let cards: any[] = [];
  try {
    cards = t.raw("HotDeals.cards");
  } catch (e) {
    cards = [];
  }

  if (!cards || cards.length === 0) return null;

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Card width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-24 pb-12 bg-white relative mt-[-4rem] z-10 rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
              <Flame className="h-15 w-15 text-blue-600 animate-pulse" />
              {t("HotDeals.title")}
            </h2>
            <p className="text-lg text-gray-600">{t("HotDeals.subtitle")}</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-10 pt-4 snap-x snap-mandatory no-scrollbar"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id || index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="snap-start shrink-0 cursor-pointer group"
              onClick={() => {
                if (onSearchFlights) {
                  onSearchFlights(undefined, card.id.toUpperCase());
                } else if (onNavigate) {
                  onNavigate("flights");
                }
              }}
            >
              <div className="relative w-[300px] h-[380px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100">
                <img
                  src={card.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop"}
                  alt={card.destination}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/80 font-medium text-sm mb-1 uppercase tracking-wide">
                    {card.country}
                  </p>
                  <h3 className="text-white font-extrabold text-3xl mb-4 leading-none">
                    {card.destination}
                  </h3>
                  <div className="inline-flex flex-col items-start bg-white/20 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/20 group-hover:bg-brand-primary group-hover:border-transparent transition-colors duration-300">
                    {card.oldPrice && (
                      <p className="text-white/70 font-medium text-sm line-through decoration-red-400 mb-0.5">
                        <CurrencySymbol className="h-3 w-3 mr-1 inline" />
                        {card.oldPrice.toLocaleString()}
                      </p>
                    )}
                    <p className="text-white font-bold text-2xl flex items-center">
                      <CurrencySymbol className="h-5 w-5 mr-1" />
                      {card.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Deals Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => onNavigate?.("flights")}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-50 hover:bg-orange-50 text-gray-900 hover:text-orange-600 rounded-xl font-bold transition-all duration-300 border border-gray-200 hover:border-orange-200 group"
          >
            {t("HotDeals.viewAll")}
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

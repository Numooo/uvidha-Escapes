"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Plane, Globe } from "lucide-react";

type Provider = {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
};

const PROVIDERS: Provider[] = [
  { 
    id: "radarbox", 
    name: "RadarBox", 
    url: "https://www.airnavradar.com/?widget=1&z=6&lat=41.89406&lng=75.64284&hideAirportWeather=true&hideAirportCard=true&hideFlightCard=true",
    icon: <Map size={18} />
  },
  { 
    id: "adsb", 
    name: "ADS-B Exchange", 
    url: "https://globe.adsbexchange.com/?hideSidebar&hideButtons",
    icon: <Globe size={18} />
  },
  { 
    id: "fr24", 
    name: "FlightRadar24", 
    url: "https://www.flightradar24.com/multiview/41.13,74.11/7",
    icon: <Plane size={18} />
  }
];

export function FlightRadarPage() {
  const t = useTranslations("Radar");
  const [activeProvider, setActiveProvider] = useState<Provider>(PROVIDERS[0]);

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-[#0f172a] font-sans">
      {/* Premium Floating Switcher */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full flex justify-center">
        <div className="bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/50 shadow-2xl flex items-center gap-1 max-w-full overflow-x-auto scrollbar-hide">
          {PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              onClick={() => setActiveProvider(provider)}
              className={`
                relative px-3 md:px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap
                ${activeProvider.id === provider.id ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}
              `}
            >
              {activeProvider.id === provider.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-blue-600 rounded-xl shadow-[0_4px_15px_rgba(37,99,235,0.4)]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className={`${activeProvider.id === provider.id ? 'text-blue-100' : 'text-slate-500'}`}>
                  {provider.icon}
                </span>
                {t(`providers.${provider.id}`)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Radar Iframe Container */}
      <div className="w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProvider.id}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="w-full h-full"
          >
            <iframe 
              srcDoc={`
                <html>
                  <head>
                    <style>
                      body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #0f172a; }
                      iframe { width: 100%; height: 100%; border: none; }
                    </style>
                  </head>
                  <body>
                    <iframe 
                      src="${activeProvider.url}" 
                      allow="geolocation"
                    ></iframe>
                  </body>
                </html>
              `}
              className="w-full h-full border-none shadow-2xl"
              title={activeProvider.name}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Subtle vignette for premium feel */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
      </div>

      <style jsx global>{`
        iframe {
          background-color: #0f172a;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}

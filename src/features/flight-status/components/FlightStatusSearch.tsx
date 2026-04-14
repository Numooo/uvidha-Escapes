"use client";

import React, { useState } from "react";
import { PlaneTakeoff, MapPin, Calendar, ChevronDown, Activity, Clock, Shield, Search, ArrowRight, Plane } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { AIRPORTS } from "@/shared/mocks/data";
import { useTranslations } from "next-intl";

export function FlightStatusSearch() {
  const t = useTranslations();
  const [statusSearchType, setStatusSearchType] = useState<"flightNumber" | "route" | "allFlights">("flightNumber");
  const [statusFlightNumber, setStatusFlightNumber] = useState("");
  const [statusDate, setStatusDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [statusOrigin, setStatusOrigin] = useState("");
  const [statusDestination, setStatusDestination] = useState("");
  const [flightStatusResult, setFlightStatusResult] = useState<any>(null);
  const [isStatusSearching, setIsStatusSearching] = useState(false);
  const [currentStatusPage, setCurrentStatusPage] = useState(1);
  const STATUS_PAGE_SIZE = 8;

  const generateMockFlights = (date: string) => {
    // Simplified version for the component
    const routes = [
      { origin: "FRU", destination: "MOW", airline: "Avia Traffic", prefix: "YK" },
      { origin: "FRU", destination: "IST", airline: "Turkish Airlines", prefix: "TK" },
    ];
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      flightNum: `${routes[i % routes.length].prefix} ${100 + i * 7}`,
      airline: routes[i % routes.length].airline,
      origin: routes[i % routes.length].origin,
      destination: routes[i % routes.length].destination,
      scheduledDep: "10:30",
      estimatedDep: "10:30",
      status: "ontime",
      date,
    }));
  };

  const handleSearch = () => {
    setIsStatusSearching(true);
    setFlightStatusResult(null);
    setCurrentStatusPage(1);
    setTimeout(() => {
      setIsStatusSearching(false);
      if (statusSearchType === "allFlights") {
        setFlightStatusResult({
          type: "list",
          flights: generateMockFlights(statusDate),
        });
      } else if (statusSearchType === "route") {
        setFlightStatusResult({
          type: "list",
          flights: generateMockFlights(statusDate).slice(0, 5),
        });
      } else {
        setFlightStatusResult({
          type: "single",
          flightNum: statusFlightNumber.toUpperCase(),
          airline: "Suvidha Airways",
          status: "ontime",
          origin: "FRU",
          destination: "MOW",
          scheduledDep: "10:30",
          scheduledArr: "16:45",
          date: statusDate,
        });
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggles */}
      <div className="flex p-1 bg-gray-100 rounded-2xl w-fit mb-2 overflow-x-auto no-scrollbar">
        {[
          { value: "flightNumber", labelKey: "Search.status.searchByFlightNumber" },
          { value: "route", labelKey: "Search.status.searchByRoute" },
          { value: "allFlights", labelKey: "Search.status.searchByDate" },
        ].map(({ value, labelKey }) => (
          <button
            key={value}
            onClick={() => {
              setStatusSearchType(value as any);
              setFlightStatusResult(null);
            }}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${
              statusSearchType === value
                ? "bg-white text-brand-primary shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statusSearchType === "flightNumber" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t("Search.status.flightNumber")}
            </label>
            <div className="relative">
              <PlaneTakeoff className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={statusFlightNumber}
                onChange={(e) => setStatusFlightNumber(e.target.value)}
                placeholder={t("Search.status.flightNumberPlaceholder")}
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
          </div>
        )}

        {statusSearchType === "route" && (
          <>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">{t("Search.status.origin")}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <select
                  value={statusOrigin}
                  onChange={(e) => setStatusOrigin(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none"
                >
                  <option value="">{t("Search.flights.from")}</option>
                  {AIRPORTS.map((a) => (
                    <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">{t("Search.status.destination")}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <select
                  value={statusDestination}
                  onChange={(e) => setStatusDestination(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none"
                >
                  <option value="">{t("Search.flights.to")}</option>
                  {AIRPORTS.map((a) => (
                    <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </>
        )}

        {statusSearchType !== "flightNumber" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{t("Search.status.date")}</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={statusDate}
                onChange={(e) => setStatusDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleSearch}
        disabled={isStatusSearching || (statusSearchType === "flightNumber" && !statusFlightNumber) || (statusSearchType === "route" && !statusOrigin && !statusDestination)}
        className="w-full rounded-2xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isStatusSearching ? (
          <Activity className="h-5 w-5 animate-spin" />
        ) : (
          <Search className="h-5 w-5" />
        )}
        {t("Search.status.search")}
      </button>

      {/* Results View - Original Styles */}
      <AnimatePresence>
        {flightStatusResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-8 border-t border-gray-100"
          >
            {flightStatusResult.type === "single" ? (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-primary/10 rounded-xl">
                      <Plane className="h-6 w-6 text-brand-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">{flightStatusResult.airline}</div>
                      <div className="text-2xl font-black text-gray-900">{flightStatusResult.flightNum}</div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-black uppercase tracking-widest border border-green-100 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    {t(`Search.status.states.${flightStatusResult.status}`)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
                   {/* Dotted Connection Line */}
                   <div className="hidden md:block absolute top-[25px] left-[20%] right-[20%] h-[1px] border-t-2 border-dotted border-gray-200" />
                   
                   <div className="text-center md:text-left relative z-10">
                      <div className="text-4xl font-black text-gray-900 mb-1">{flightStatusResult.origin}</div>
                      <div className="text-sm font-bold text-gray-500 uppercase">{t("Search.status.departure")}</div>
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-gray-100 text-xs font-bold text-gray-400">
                         <Clock className="h-3 w-3" />
                         {flightStatusResult.scheduledDep}
                      </div>
                   </div>

                   <div className="flex justify-center relative z-10">
                      <div className="p-3 bg-gray-100 rounded-full text-gray-400 rotate-90 md:rotate-0">
                         <Plane className="h-6 w-6" />
                      </div>
                   </div>

                   <div className="text-center md:text-right relative z-10">
                      <div className="text-4xl font-black text-gray-900 mb-1">{flightStatusResult.destination}</div>
                      <div className="text-sm font-bold text-gray-500 uppercase">{t("Search.status.arrival")}</div>
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-gray-100 text-xs font-bold text-gray-400">
                         <Clock className="h-3 w-3" />
                         {flightStatusResult.scheduledArr}
                      </div>
                   </div>
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t("Search.status.terminal")}</div>
                      <div className="text-sm font-black text-gray-900">T2</div>
                   </div>
                   <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t("Search.status.gate")}</div>
                      <div className="text-sm font-black text-gray-900">A4</div>
                   </div>
                   <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t("Search.status.baggage")}</div>
                      <div className="text-sm font-black text-gray-900">Belt 5</div>
                   </div>
                   <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t("Search.status.safety")}</div>
                      <div className="flex items-center gap-2 text-brand-primary">
                         <Shield className="h-4 w-4" />
                         <span className="text-sm font-black">Secure</span>
                      </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-lg font-black text-gray-900">{t("Search.status.allFlightsTitle")}</h3>
                   <div className="text-xs font-bold text-gray-400 uppercase">{flightStatusResult.flights.length} {t("Search.status.flightsFound")}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {flightStatusResult.flights.map((f: any) => (
                    <div key={f.id} className="p-5 rounded-2xl bg-white border border-gray-100 hover:border-brand-primary/30 hover:shadow-lg transition-all group flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="text-sm font-black text-gray-900 group-hover:text-brand-primary transition-colors">{f.flightNum}</div>
                          <div className="flex items-center gap-2">
                             <span className="text-xs font-bold text-gray-500">{f.origin}</span>
                             <ArrowRight className="h-3 w-3 text-gray-300" />
                             <span className="text-xs font-bold text-gray-500">{f.destination}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="text-xs font-bold text-gray-900">{f.scheduledDep}</div>
                          <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                             {t(`Search.status.states.${f.status}`)}
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

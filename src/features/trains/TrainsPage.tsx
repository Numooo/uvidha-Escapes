import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Search, Train, Users, CreditCard, ChevronRight, Check, X, Calendar, Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import { AIRPORTS, getAirportLabel } from "@/shared/mocks/data";
import { useCurrency } from "@/CurrencyContext";

interface TrainResult {
  id: string;
  number: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  type: string;
}

const MOCK_TRAINS: TrainResult[] = [
  {
    id: "1",
    number: "001А",
    name: "Бишкек - Балыкчы",
    from: "FRU",
    to: "GOI",
    departureTime: "06:30",
    arrivalTime: "11:00",
    duration: "4ч 30м",
    price: 150,
    availableSeats: 45,
    type: "Стандарт",
  },
  {
    id: "2",
    number: "017Ф",
    name: "Бишкек - Москва",
    from: "FRU",
    to: "SVO",
    departureTime: "10:15",
    arrivalTime: "08:45",
    duration: "74ч 30м",
    price: 12500,
    availableSeats: 12,
    type: "Купе",
  },
  {
    id: "3",
    number: "305Ф",
    name: "Бишкек - Ташкент",
    from: "FRU",
    to: "TAS",
    departureTime: "18:40",
    arrivalTime: "12:20",
    duration: "17ч 40м",
    price: 3200,
    availableSeats: 28,
    type: "Плацкарт",
  },
   {
    id: "4",
    number: "023Х",
    name: "Бишкек - Алматы",
    from: "FRU",
    to: "ALA",
    departureTime: "22:10",
    arrivalTime: "06:15",
    duration: "8ч 05м",
    price: 1800,
    availableSeats: 15,
    type: "Купе",
  },
];

interface TrainsPageProps {
  onBack?: () => void;
  initialOrigin?: string | null;
  initialDestination?: string | null;
}

export function TrainsPage({ onBack, initialOrigin, initialDestination }: TrainsPageProps) {
  const t = useTranslations("Search.trains");
  const tTrains = useTranslations("Trains");
  const tCommon = useTranslations("Flights");
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isEditingSearch, setIsEditingSearch] = useState(false);
  const [editTab, setEditTab] = useState<"from" | "to">("from");
  const [currentOrigin, setCurrentOrigin] = useState(initialOrigin || "FRU");
  const [currentDestination, setCurrentDestination] = useState(initialDestination || "DXB");
  const [currentDate, setCurrentDate] = useState("2024-01-15");
  const [currentPassengers, setCurrentPassengers] = useState(1);
  const { CurrencySymbol } = useCurrency();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredTrains = MOCK_TRAINS.filter((train) => {
    const matchesPrice = train.price >= priceRange[0] && train.price <= priceRange[1];
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(train.type);
    return matchesPrice && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <span>{getAirportLabel(currentOrigin)}</span>
                <span className="text-gray-400">→</span>
                <span>{getAirportLabel(currentDestination)}</span>
              </div>
              <div className="text-sm text-gray-600">
                {currentDate} • {currentPassengers}{" "}
                {currentPassengers === 1
                  ? t("passenger")
                  : t("passengers")}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsEditingSearch(true)}
            className="px-6 py-2 bg-brand-primary/5 text-brand-primary rounded-xl font-bold text-sm hover:bg-brand-primary/10 transition-all border border-brand-primary/20"
          >
            {tCommon("editSearch")}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block shrink-0 w-80">
            <div className="bg-white rounded-lg border border-gray-200 sticky top-24">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-900">{tTrains("filters")}</h2>
                {(priceRange[1] < 20000 || selectedTypes.length > 0) && (
                  <button
                    onClick={() => {
                      setPriceRange([0, 20000]);
                      setSelectedTypes([]);
                    }}
                    className="text-sm font-medium text-brand-primary hover:text-brand-secondary"
                  >
                    {tTrains("clearAll")}
                  </button>
                )}
              </div>

              {/* Filter Content */}
              <div className="p-4 space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    {tTrains("priceRange")}
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-brand-primary"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1 font-medium">
                        <CurrencySymbol className="h-3 w-3" />
                        0
                      </span>
                      <span className="font-semibold text-gray-900 flex items-center gap-1">
                        <CurrencySymbol className="h-4 w-4" />
                        {priceRange[1].toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Carriage Type */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    {tTrains("wagonType")}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { key: "standard", label: tTrains("wagonTypes.standard") },
                      { key: "reservedSeat", label: tTrains("wagonTypes.reservedSeat") },
                      { key: "compartment", label: tTrains("wagonTypes.compartment") },
                      { key: "soft", label: tTrains("wagonTypes.soft") }
                    ].map((type) => (
                      <label key={type.key} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type.label)}
                          onChange={() => toggleType(type.label)}
                          className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results List */}
          <main className="space-y-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 h-48 animate-pulse shadow-sm border border-gray-100" />
              ))
            ) : filteredTrains.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="text-gray-400 mb-4 flex justify-center">
                  <Train className="h-12 w-12 opacity-20" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tTrains("noTrainsFound")}</h3>
                <p className="text-gray-500 text-sm">{tTrains("adjustFilters")}</p>
              </div>
            ) : (
              filteredTrains.map((train) => (
                <motion.div
                  key={train.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5 transition-all cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Train Info */}
                    <div className="flex items-center gap-4 w-48">
                      <div className="p-3 bg-brand-primary/5 rounded-2xl">
                        <Train className="h-6 w-6 text-brand-primary" />
                      </div>
                      <div>
                        <div className="font-black text-gray-900">{train.number}</div>
                        <div className="text-xs text-gray-500">{train.type}</div>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="flex-1 flex items-center justify-between gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-black text-gray-900">{train.departureTime}</div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-tighter">{getAirportLabel(train.from)}</div>
                      </div>

                      <div className="flex flex-col items-center flex-1 max-w-[120px]">
                        <div className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-1">{train.duration}</div>
                        <div className="w-full h-[2px] bg-gray-100 relative">
                          <div className="absolute top-1/2 left-0 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-gray-300" />
                          <div className="absolute top-1/2 right-0 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-gray-300" />
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-black text-gray-900">{train.arrivalTime}</div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-tighter">{getAirportLabel(train.to)}</div>
                      </div>
                    </div>

                    {/* Price & Book */}
                    <div className="flex flex-col items-end gap-3 w-40">
                      <div className="text-right">
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{tTrains("fromPrice")}</div>
                        <div className="text-2xl font-black text-brand-primary flex items-baseline gap-1">
                          {train.price.toLocaleString()} <CurrencySymbol className="h-4 w-4" />
                        </div>
                      </div>
                      <button className="w-full bg-brand-primary text-white py-3 rounded-2xl font-bold text-sm group-hover:bg-brand-secondary transition-all shadow-lg shadow-gray-900/10 active:scale-95">
                        {tTrains("selectSeat")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </main>
        </div>
      </div>

      {/* Edit Search Modal */}
      <AnimatePresence>
        {isEditingSearch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditingSearch(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {tCommon("editSearch")}
                </h3>
                <button
                  onClick={() => setIsEditingSearch(false)}
                  className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Tabs for From/To */}
              <div className="flex p-1 bg-gray-100 rounded-2xl mb-6">
                <button
                  onClick={() => setEditTab("from")}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    editTab === "from"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t("from")}
                </button>
                <button
                  onClick={() => setEditTab("to")}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    editTab === "to"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t("to")}
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="grid grid-cols-1 gap-2 max-h-[30vh] overflow-y-auto pr-2 no-scrollbar mb-6">
                    {AIRPORTS.map((airport) => {
                      const isSelected = editTab === "from" 
                        ? currentOrigin === airport.code 
                        : currentDestination === airport.code;
                        
                      return (
                        <button
                          key={airport.code}
                          onClick={() => {
                            if (editTab === "from") {
                              setCurrentOrigin(airport.code);
                              setEditTab("to"); // Auto switch to "to"
                            } else {
                              setCurrentDestination(airport.code);
                            }
                          }}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                              : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="font-bold">
                            {airport.city}
                          </span>
                          <span className="text-xs font-black opacity-50 uppercase">
                            {airport.code}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Search Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  {/* Date Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
                      {t("departure")}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        value={currentDate}
                        onChange={(e) => setCurrentDate(e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-11 pr-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-primary/20 outline-none"
                      />
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
                      {t("travelers")}
                    </label>
                    <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-1.5 h-[46px]">
                      <button
                        onClick={() => setCurrentPassengers(Math.max(1, currentPassengers - 1))}
                        className="p-2 hover:bg-white rounded-xl transition-all text-gray-600 disabled:opacity-30"
                        disabled={currentPassengers <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-gray-900">{currentPassengers}</span>
                      <button
                        onClick={() => setCurrentPassengers(Math.min(9, currentPassengers + 1))}
                        className="p-2 hover:bg-white rounded-xl transition-all text-gray-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditingSearch(false)}
                  className="w-full rounded-2xl bg-brand-primary py-4 text-white font-bold shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 transition-all active:scale-95 cursor-pointer mt-2"
                >
                  {tCommon("showResults", { count: filteredTrains.length })}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

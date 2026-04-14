import React, { useState, useEffect, useRef } from "react";
import {
  Plane,
  Hotel,
  Palmtree,
  FileText,
  Calendar,
  MapPin,
  Users,
  ChevronDown,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
  TrendingUp,
  Shield,
  Headphones,
  Plus,
  Minus,
  Baby,
  User,
  Truck,
  Scale,
  Package as PackageIcon,
  Clock,
  PlaneTakeoff,
  Activity,
  Flame,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { AIRPORTS } from "./components/shared/mocks/data";
import { Badge } from "./components/shared/ui/badge";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";
import type { Package } from "./types";

type TabType = "flights" | "hotels" | "holidays" | "visa" | "cargo" | "status";
type TripType = "oneway" | "roundtrip";
type CabinClass = "economy" | "premium-economy" | "business" | "first";

interface HomePageProps {
  onSearchFlights?: (from?: string, to?: string) => void;
  onSearchCargo?: (data: {
    origin: string;
    destination: string;
    weight: string;
    type: string;
  }) => void;
  onNavigate?: (page: string) => void;
}

export function HomePage({
  onSearchFlights,
  onSearchCargo,
  onNavigate,
}: HomePageProps = {}) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<TabType>("flights");
  const [tripType, setTripType] = useState<TabType | any>("roundtrip"); // Using any for tripType consistency
  const [cabinClass, setCabinClass] = useState<CabinClass>("economy");
  const { symbolText, CurrencyIcon, CurrencySymbol } = useCurrency();

  // Passenger counters
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [passengersDropdownOpen, setPassengersDropdownOpen] = useState(false);
  const passengersDropdownRef = useRef<HTMLDivElement>(null);

  // Flight search state
  const [flightOrigin, setFlightOrigin] = useState("FRU");
  const [flightDestination, setFlightDestination] = useState("DXB");

  // Hotel search state
  const [hotelDestination, setHotelDestination] = useState("");
  const [hotelCheckIn, setHotelCheckIn] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [hotelCheckOut, setHotelCheckOut] = useState(
    format(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
  );
  const [hotelRooms, setHotelRooms] = useState(1);
  const [hotelGuests, setHotelGuests] = useState(2);

  // Holiday search state
  const [holidayDestination, setHolidayDestination] = useState("");
  const [holidayStartDate, setHolidayStartDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [holidayEndDate, setHolidayEndDate] = useState(
    format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
  );
  const [holidayTravelers, setHolidayTravelers] = useState(2);
  const [holidayBudget, setHolidayBudget] = useState<string>("medium");

  // Visa search state
  const [visaCountry, setVisaCountry] = useState("");
  const [visaType, setVisaType] = useState("tourist");
  const [visaTravelDate, setVisaTravelDate] = useState(
    format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
  );
  const [visaApplicants, setVisaApplicants] = useState(1);

  // Cargo search state
  const [cargoOrigin, setCargoOrigin] = useState("");
  const [cargoDestination, setCargoDestination] = useState("");
  const [cargoDate, setCargoDate] = useState(
    format(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
  );
  const [cargoWeight, setCargoWeight] = useState("");
  const [cargoType, setCargoType] = useState("standard");

  // Flight Status state
  const [statusSearchType, setStatusSearchType] = useState<
    "flightNumber" | "route" | "allFlights"
  >("flightNumber");
  const [statusFlightNumber, setStatusFlightNumber] = useState("");
  const [statusDate, setStatusDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [statusOrigin, setStatusOrigin] = useState("");
  const [statusDestination, setStatusDestination] = useState("");
  const [flightStatusResult, setFlightStatusResult] = useState<any>(null);
  const [isStatusSearching, setIsStatusSearching] = useState(false);
  const [currentStatusPage, setCurrentStatusPage] = useState(1);
  const STATUS_PAGE_SIZE = 8;

  const totalPassengers = adults + children;
  const canAddPassenger = totalPassengers < 9;
  const canRemoveAdult = adults > 1;
  const canRemoveChild = children > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        passengersDropdownRef.current &&
        !passengersDropdownRef.current.contains(event.target as Node)
      ) {
        setPassengersDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const generateMockFlights = (date: string) => {
    const routes = [
      {
        origin: "FRU",
        destination: "MOW",
        airline: "Avia Traffic",
        prefix: "YK",
      },
      {
        origin: "FRU",
        destination: "IST",
        airline: "Turkish Airlines",
        prefix: "TK",
      },
      { origin: "FRU", destination: "DXB", airline: "FlyDubai", prefix: "FZ" },
      {
        origin: "FRU",
        destination: "ALA",
        airline: "Air Astana",
        prefix: "KC",
      },
      {
        origin: "FRU",
        destination: "TAS",
        airline: "Uzbekistan Airways",
        prefix: "HY",
      },
      {
        origin: "MOW",
        destination: "FRU",
        airline: "S7 Airlines",
        prefix: "S7",
      },
      {
        origin: "IST",
        destination: "FRU",
        airline: "Turkish Airlines",
        prefix: "TK",
      },
      { origin: "DXB", destination: "FRU", airline: "FlyDubai", prefix: "FZ" },
      {
        origin: "BOM",
        destination: "FRU",
        airline: "Air Arabia",
        prefix: "G9",
      },
      { origin: "FRU", destination: "BOM", airline: "IndiGo", prefix: "6E" },
      {
        origin: "FRU",
        destination: "BKK",
        airline: "Thai Airways",
        prefix: "TG",
      },
      {
        origin: "KUL",
        destination: "FRU",
        airline: "Malaysia Airlines",
        prefix: "MH",
      },
      { origin: "FRU", destination: "SVO", airline: "Aeroflot", prefix: "SU" },
      { origin: "FRU", destination: "LED", airline: "Nordwind", prefix: "N4" },
      {
        origin: "OSS",
        destination: "FRU",
        airline: "Avia Traffic",
        prefix: "YK",
      },
    ];
    const statuses = [
      "ontime",
      "ontime",
      "ontime",
      "delayed",
      "enroute",
      "landed",
      "cancelled",
    ];
    const hoursArr = [
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
    ];
    const terminals = ["Terminal 1", "Terminal 2"];
    const gates = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "C1", "C2"];
    return Array.from({ length: 25 }, (_, i) => {
      const route = routes[i % routes.length];
      const depH = hoursArr[i % hoursArr.length];
      const depM = i % 2 === 0 ? "00" : "30";
      const arrH = String((parseInt(depH) + 3 + (i % 3)) % 24).padStart(2, "0");
      const status = statuses[i % statuses.length];
      const actualDep =
        status === "landed"
          ? `${String((parseInt(depH) + (i % 2 === 0 ? 0 : 1)) % 24).padStart(2, "0")}:${i % 3 === 0 ? "05" : depM}`
          : null;
      const actualArr =
        status === "landed"
          ? `${String((parseInt(arrH) + (i % 2 === 0 ? 0 : 1)) % 24).padStart(2, "0")}:${i % 3 === 0 ? "12" : depM}`
          : null;
      return {
        id: i,
        flightNum: `${route.prefix} ${100 + i * 7}`,
        airline: route.airline,
        origin: route.origin,
        destination: route.destination,
        scheduledDep: `${depH}:${depM}`,
        estimatedDep:
          status === "delayed"
            ? `${String((parseInt(depH) + 1) % 24).padStart(2, "0")}:${depM}`
            : `${depH}:${depM}`,
        actualDep,
        scheduledArr: `${arrH}:${depM}`,
        actualArr,
        terminalDep: terminals[i % terminals.length],
        gateDep: gates[i % gates.length],
        terminalArr: terminals[(i + 1) % terminals.length],
        gateArr: gates[(i + 1) % gates.length],
        baggage: `Belt ${1 + (i % 8)}`,
        status,
        date,
      };
    });
  };

  const handleStatusSearch = () => {
    if (statusSearchType === "flightNumber" && !statusFlightNumber) return;
    if (statusSearchType === "route" && !statusOrigin && !statusDestination)
      return;
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
        // Filter mock flights by whichever fields are filled
        const all = generateMockFlights(statusDate);
        const filtered = all.filter((f) => {
          const matchOrigin = !statusOrigin || f.origin === statusOrigin;
          const matchDest =
            !statusDestination || f.destination === statusDestination;
          return matchOrigin && matchDest;
        });
        setFlightStatusResult({
          type: "list",
          flights: filtered.length > 0 ? filtered : all.slice(0, 10),
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
          actualDep: "10:30",
          scheduledArr: "16:45",
          estimatedArr: "16:45",
          terminalDep: "Terminal 2",
          gateDep: "A4",
          terminalArr: "Terminal 1",
          gateArr: "B2",
          baggage: "Belt 5",
          date: statusDate,
        });
      }
    }, 1500);
  };

  const handleSearch = () => {
    if (activeTab === "status") {
      handleStatusSearch();
    } else if (activeTab === "flights" && onSearchFlights) {
      onSearchFlights(flightOrigin, flightDestination);
    } else if (activeTab === "cargo" && onSearchCargo) {
      onSearchCargo({
        origin: cargoOrigin,
        destination: cargoDestination,
        weight: cargoWeight,
        type: cargoType,
      });
    } else if (onNavigate) {
      onNavigate(activeTab);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Unsplash Background Image - Beautiful travel destination with airplane */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80)",
          }}
        >
          {/* Dark solid overlay for readability */}
          <div className="absolute inset-0 bg-brand-primary/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Text */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-4"
            >
              {t("Hero.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/90 sm:text-xl"
            >
              {t("Hero.subtitle")}
            </motion.p>
          </div>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-3xl bg-white/95 backdrop-blur-lg p-8 shadow-2xl border border-white/20"
          >
            {/* Tabs */}
            <div className="mb-8 flex gap-2 border-b border-gray-200">
              {[
                {
                  id: "flights" as TabType,
                  label: t("Search.tabs.flights"),
                  icon: Plane,
                },
                {
                  id: "hotels" as TabType,
                  label: t("Search.tabs.hotels"),
                  icon: Hotel,
                },
                {
                  id: "holidays" as TabType,
                  label: t("Search.tabs.holidays"),
                  icon: Palmtree,
                },
                {
                  id: "visa" as TabType,
                  label: t("Search.tabs.visa"),
                  icon: FileText,
                },
                {
                  id: "cargo" as TabType,
                  label: t("Search.tabs.cargo"),
                  icon: Truck,
                },
                {
                  id: "status" as TabType,
                  label: t("Search.tabs.status"),
                  icon: Activity,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all rounded-t-lg ${
                      activeTab === tab.id
                        ? "text-brand-primary bg-brand-primary/5"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-t"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Flight Search Form */}
            {activeTab === "flights" && (
              <div className="space-y-6">
                {/* Trip Type */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      value="oneway"
                      checked={tripType === "oneway"}
                      onChange={(e) => setTripType(e.target.value as TripType)}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {t("Search.flights.oneWay")}
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      value="roundtrip"
                      checked={tripType === "roundtrip"}
                      onChange={(e) => setTripType(e.target.value as TripType)}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {t("Search.flights.roundTrip")}
                    </span>
                  </label>
                </div>

                {/* Search Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Origin */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.flights.from")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={flightOrigin}
                        onChange={(e) => setFlightOrigin(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        {AIRPORTS.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.flights.to")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={flightDestination}
                        onChange={(e) => setFlightDestination(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        {AIRPORTS.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {tripType === "roundtrip"
                        ? t("Search.flights.departure")
                        : t("Search.flights.date")}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        defaultValue={format(new Date(), "yyyy-MM-dd")}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {tripType === "roundtrip" && (
                    <div className="relative">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        {t("Search.flights.return")}
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          defaultValue={format(
                            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                            "yyyy-MM-dd",
                          )}
                          className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Passengers & Class */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Passengers Dropdown */}
                  <div className="relative" ref={passengersDropdownRef}>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.flights.passengers")}
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setPassengersDropdownOpen(!passengersDropdownOpen)
                      }
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
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transition-transform ${
                          passengersDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Panel */}
                    {passengersDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white p-4 shadow-xl"
                      >
                        <div className="space-y-4">
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
                                onClick={() =>
                                  canRemoveAdult && setAdults(adults - 1)
                                }
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
                                onClick={() =>
                                  canAddPassenger && setAdults(adults + 1)
                                }
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
                                onClick={() =>
                                  canRemoveChild && setChildren(children - 1)
                                }
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
                                onClick={() =>
                                  canAddPassenger && setChildren(children + 1)
                                }
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

                          {/* Info Note */}
                          <div className="pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                              {t("Search.flights.maxPassengers")}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Cabin Class */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.flights.cabinClass")}
                    </label>
                    <div className="relative">
                      <select
                        value={cabinClass}
                        onChange={(e) =>
                          setCabinClass(e.target.value as CabinClass)
                        }
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="economy">
                          {t("Search.flights.economy")}
                        </option>
                        <option value="premium-economy">
                          {t("Search.flights.premiumEconomy")}
                        </option>
                        <option value="business">
                          {t("Search.flights.business")}
                        </option>
                        <option value="first">
                          {t("Search.flights.first")}
                        </option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="w-full rounded-xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Plane className="h-5 w-5" />
                  {t("Search.flights.search")}
                </button>
              </div>
            )}

            {/* Hotels Search Form */}
            {activeTab === "hotels" && (
              <div className="space-y-6">
                {/* Search Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Destination */}
                  <div className="relative lg:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.hotels.destination")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={hotelDestination}
                        onChange={(e) => setHotelDestination(e.target.value)}
                        placeholder={t("Search.hotels.destinationPlaceholder")}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Check-in Date */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.hotels.checkIn")}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={hotelCheckIn}
                        onChange={(e) => {
                          const newCheckIn = e.target.value;
                          setHotelCheckIn(newCheckIn);
                          // Ensure checkout is at least 1 day after check-in
                          if (
                            hotelCheckOut &&
                            new Date(hotelCheckOut) <= new Date(newCheckIn)
                          ) {
                            const nextDay = new Date(newCheckIn);
                            nextDay.setDate(nextDay.getDate() + 1);
                            setHotelCheckOut(format(nextDay, "yyyy-MM-dd"));
                          }
                        }}
                        min={format(new Date(), "yyyy-MM-dd")}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Check-out Date */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.hotels.checkOut")}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={hotelCheckOut}
                        onChange={(e) => setHotelCheckOut(e.target.value)}
                        min={
                          hotelCheckIn
                            ? format(
                                new Date(
                                  new Date(hotelCheckIn).getTime() +
                                    24 * 60 * 60 * 1000,
                                ),
                                "yyyy-MM-dd",
                              )
                            : format(
                                new Date(Date.now() + 24 * 60 * 60 * 1000),
                                "yyyy-MM-dd",
                              )
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Rooms & Guests */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Rooms */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.hotels.rooms")}
                    </label>
                    <div className="relative">
                      <Hotel className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={hotelRooms}
                        onChange={(e) => setHotelRooms(Number(e.target.value))}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}{" "}
                            {num === 1
                              ? t("Search.hotels.room")
                              : t("Search.hotels.rooms")}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.hotels.guests")}
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={hotelGuests}
                        onChange={(e) => setHotelGuests(Number(e.target.value))}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num}{" "}
                            {num === 1
                              ? t("Search.hotels.guest")
                              : t("Search.hotels.guests")}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  disabled={!hotelDestination}
                  className="w-full rounded-xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Hotel className="h-5 w-5" />
                  {t("Search.hotels.search")}
                </button>
              </div>
            )}

            {/* Holidays Search Form */}
            {activeTab === "holidays" && (
              <div className="space-y-6">
                {/* Search Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Destination */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.holidays.destination")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={holidayDestination}
                        onChange={(e) => setHolidayDestination(e.target.value)}
                        placeholder={t(
                          "Search.holidays.destinationPlaceholder",
                        )}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.holidays.budget")}
                    </label>
                    <div className="relative">
                      <select
                        value={holidayBudget}
                        onChange={(e) => setHolidayBudget(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="budget">
                          {t("Search.holidays.budgetRange.budget", {
                            symbol: symbolText,
                          })}
                        </option>
                        <option value="medium">
                          {t("Search.holidays.budgetRange.medium", {
                            symbol: symbolText,
                          })}
                        </option>
                        <option value="luxury">
                          {t("Search.holidays.budgetRange.luxury", {
                            symbol: symbolText,
                          })}
                        </option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Travel Dates */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Start Date */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.holidays.travelStart")}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={holidayStartDate}
                        onChange={(e) => setHolidayStartDate(e.target.value)}
                        min={format(new Date(), "yyyy-MM-dd")}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.holidays.travelEnd")}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={holidayEndDate}
                        onChange={(e) => setHolidayEndDate(e.target.value)}
                        min={holidayStartDate}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Travelers */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.holidays.travelers")}
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={holidayTravelers}
                        onChange={(e) =>
                          setHolidayTravelers(Number(e.target.value))
                        }
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num}{" "}
                            {num === 1
                              ? t("Search.holidays.traveler")
                              : t("Search.holidays.travelers")}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="w-full rounded-xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Palmtree className="h-5 w-5" />
                  {t("Search.holidays.search")}
                </button>
              </div>
            )}

            {/* Visa Search Form */}
            {activeTab === "visa" && (
              <div className="space-y-6">
                {/* Search Inputs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Country Selection */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.visa.destination")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={visaCountry}
                        onChange={(e) => setVisaCountry(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        <option value="">
                          {t("Search.visa.selectCountry")}
                        </option>
                        {Object.entries(t.raw("Search.visa.countries")).map(
                          ([code, name]) => (
                            <option key={code} value={code}>
                              {name as string}
                            </option>
                          ),
                        )}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Visa Type */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.visa.visaType")}
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={visaType}
                        onChange={(e) => setVisaType(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        <option value="tourist">
                          {t("Search.visa.types.tourist")}
                        </option>
                        <option value="business">
                          {t("Search.visa.types.business")}
                        </option>
                        <option value="student">
                          {t("Search.visa.types.student")}
                        </option>
                        <option value="work">
                          {t("Search.visa.types.work")}
                        </option>
                        <option value="transit">
                          {t("Search.visa.types.transit")}
                        </option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Travel Date & Applicants */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Travel Date */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.visa.travelDate")}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={visaTravelDate}
                        onChange={(e) => setVisaTravelDate(e.target.value)}
                        min={format(
                          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                          "yyyy-MM-dd",
                        )}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      />
                    </div>
                  </div>

                  {/* Number of Applicants */}
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.visa.applicants")}
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={visaApplicants}
                        onChange={(e) =>
                          setVisaApplicants(Number(e.target.value))
                        }
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num}{" "}
                            {num === 1
                              ? t("Search.visa.applicant")
                              : t("Search.visa.applicants")}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  disabled={!visaCountry}
                  className="w-full rounded-xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText className="h-5 w-5" />
                  {t("Search.visa.check")}
                </button>
              </div>
            )}

            {/* Cargo Search Form */}
            {activeTab === "cargo" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.cargo.from")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={cargoOrigin}
                        onChange={(e) => setCargoOrigin(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        <option value="">{t("Search.cargo.from")}</option>
                        {AIRPORTS.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.cargo.to")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={cargoDestination}
                        onChange={(e) => setCargoDestination(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      >
                        <option value="">{t("Search.cargo.to")}</option>
                        {AIRPORTS.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.cargo.date")}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={cargoDate}
                        onChange={(e) => setCargoDate(e.target.value)}
                        min={format(new Date(), "yyyy-MM-dd")}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.cargo.weight")}
                    </label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        value={cargoWeight}
                        onChange={(e) => setCargoWeight(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t("Search.cargo.type")}
                    </label>
                    <div className="relative">
                      <PackageIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={cargoType}
                        onChange={(e) => setCargoType(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary"
                      >
                        <option value="standard">
                          {t("Search.cargo.types.standard")}
                        </option>
                        <option value="fragile">
                          {t("Search.cargo.types.fragile")}
                        </option>
                        <option value="hazardous">
                          {t("Search.cargo.types.hazardous")}
                        </option>
                        <option value="refrigerated">
                          {t("Search.cargo.types.refrigerated")}
                        </option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSearch}
                  disabled={!cargoOrigin || !cargoDestination}
                  className="w-full rounded-xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Truck className="h-5 w-5" />
                  {t("Search.cargo.search")}
                </button>
              </div>
            )}

            {/* Flight Status Search Form */}
            {activeTab === "status" && (
              <div className="space-y-6">
                {/* Mode Toggles */}
                <div className="flex flex-wrap gap-5 mb-2">
                  {[
                    {
                      value: "flightNumber",
                      labelKey: "Search.status.searchByFlightNumber",
                    },
                    { value: "route", labelKey: "Search.status.searchByRoute" },
                    {
                      value: "allFlights",
                      labelKey: "Search.status.searchByDate",
                    },
                  ].map(({ value, labelKey }) => (
                    <label
                      key={value}
                      className="flex items-center gap-2.5 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="statusSearchType"
                        value={value}
                        checked={statusSearchType === value}
                        onChange={(e) => {
                          setStatusSearchType(e.target.value as any);
                          setFlightStatusResult(null);
                        }}
                        className="h-4 w-4 accent-brand-primary"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {t(labelKey)}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Fields */}
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
                          onChange={(e) =>
                            setStatusFlightNumber(e.target.value)
                          }
                          placeholder={t(
                            "Search.status.flightNumberPlaceholder",
                          )}
                          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                        />
                      </div>
                    </div>
                  )}

                  {statusSearchType === "route" && (
                    <>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          {t("Search.status.origin")}
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <select
                            value={statusOrigin}
                            onChange={(e) => setStatusOrigin(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none"
                          >
                            <option value="">{t("Search.flights.from")}</option>
                            {AIRPORTS.map((a) => (
                              <option key={a.code} value={a.code}>
                                {a.city} ({a.code})
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          {t("Search.status.destination")}
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <select
                            value={statusDestination}
                            onChange={(e) =>
                              setStatusDestination(e.target.value)
                            }
                            className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:outline-none"
                          >
                            <option value="">{t("Search.flights.to")}</option>
                            {AIRPORTS.map((a) => (
                              <option key={a.code} value={a.code}>
                                {a.city} ({a.code})
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </>
                  )}

                  {statusSearchType !== "flightNumber" && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        {t("Search.status.date")}
                      </label>
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

                {/* Search button */}
                <button
                  onClick={handleSearch}
                  disabled={
                    isStatusSearching ||
                    (statusSearchType === "flightNumber" &&
                      !statusFlightNumber) ||
                    (statusSearchType === "route" &&
                      !statusOrigin &&
                      !statusDestination)
                  }
                  className="w-full rounded-xl bg-brand-primary py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-brand-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isStatusSearching ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Activity className="h-5 w-5" />{" "}
                      {t("Search.status.checkStatus")}
                    </>
                  )}
                </button>

                {/* Results */}
                {flightStatusResult &&
                  !isStatusSearching &&
                  (() => {
                    const statusColor = (s: string) => {
                      if (s === "ontime")
                        return "bg-emerald-50 text-emerald-600 border border-emerald-100";
                      if (s === "delayed")
                        return "bg-amber-50 text-amber-600 border border-amber-100";
                      if (s === "cancelled")
                        return "bg-rose-50 text-rose-600 border border-rose-100";
                      if (s === "enroute")
                        return "bg-sky-50 text-sky-600 border border-sky-100";
                      if (s === "landed")
                        return "bg-indigo-50 text-indigo-600 border border-indigo-100";
                      return "bg-gray-50 text-gray-500 border border-gray-100";
                    };

                    /* ── LIST VIEW ── */
                    if (flightStatusResult.type === "list") {
                      const flights: any[] = flightStatusResult.flights;
                      const totalPages = Math.ceil(
                        flights.length / STATUS_PAGE_SIZE,
                      );
                      const paged = flights.slice(
                        (currentStatusPage - 1) * STATUS_PAGE_SIZE,
                        currentStatusPage * STATUS_PAGE_SIZE,
                      );
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden"
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <div>
                              <h3 className="text-base font-bold text-gray-900">
                                {t("Search.status.flightListTitle")}{" "}
                                {format(new Date(statusDate), "dd MMM yyyy")}
                              </h3>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {flights.length} рейсов найдено
                              </p>
                            </div>
                            <span className="text-xs text-gray-400">
                              стр. {currentStatusPage}/{totalPages}
                            </span>
                          </div>

                          {/* Column headers */}
                          <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-2 bg-gray-50 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                            <div className="col-span-2">
                              {t("Search.status.tableHeaders.flight")}
                            </div>
                            <div className="col-span-4">
                              {t("Search.status.tableHeaders.route")}
                            </div>
                            <div className="col-span-2">
                              {t("Search.status.tableHeaders.departure")}
                            </div>
                            <div className="col-span-2">
                              {t("Search.status.tableHeaders.arrival")}
                            </div>
                            <div className="col-span-2">
                              {t("Search.status.tableHeaders.status")}
                            </div>
                          </div>

                          {/* Rows */}
                          <div className="divide-y divide-gray-50">
                            {paged.map((fl: any, idx: number) => (
                              <motion.div
                                key={fl.id}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                className="grid grid-cols-2 md:grid-cols-12 gap-3 px-5 py-3.5 hover:bg-gray-50/80 transition-colors"
                              >
                                <div className="col-span-1 md:col-span-2">
                                  <p className="text-sm font-bold text-gray-900">
                                    {fl.flightNum}
                                  </p>
                                  <p className="text-xs text-gray-400 truncate">
                                    {fl.airline}
                                  </p>
                                </div>
                                <div className="col-span-1 md:col-span-4 flex items-center gap-1.5">
                                  <span className="text-sm font-semibold text-gray-800">
                                    {fl.origin}
                                  </span>
                                  <Plane className="h-3 w-3 text-brand-primary shrink-0" />
                                  <span className="text-sm font-semibold text-gray-800">
                                    {fl.destination}
                                  </span>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                  {fl.status === "landed" && fl.actualDep ? (
                                    <>
                                      <p className="text-xs text-gray-400 line-through">
                                        {fl.scheduledDep}
                                      </p>
                                      <p className="text-sm font-semibold text-gray-900">
                                        {fl.actualDep}
                                        <span className="ml-1 text-[10px] text-gray-400 no-underline">
                                          {t("Search.status.fact")}
                                        </span>
                                      </p>
                                      <p className="text-[10px] text-gray-400 font-medium uppercase">
                                        {fl.terminalDep} · {fl.gateDep}
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p className="text-sm font-medium text-gray-900">
                                        {fl.scheduledDep}
                                      </p>
                                      {fl.estimatedDep !== fl.scheduledDep ? (
                                        <p className="text-xs text-amber-600 font-medium">
                                          {fl.estimatedDep} ↑
                                        </p>
                                      ) : (
                                        <p className="text-[10px] text-gray-400 font-medium uppercase">
                                          {fl.terminalDep} · {fl.gateDep}
                                        </p>
                                      )}
                                    </>
                                  )}
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                  {fl.status === "landed" && fl.actualArr ? (
                                    <>
                                      <p className="text-xs text-gray-400 line-through">
                                        {fl.scheduledArr}
                                      </p>
                                      <p className="text-sm font-semibold text-gray-900">
                                        {fl.actualArr}
                                        <span className="ml-1 text-[10px] text-gray-400">
                                          {t("Search.status.fact")}
                                        </span>
                                      </p>
                                      <p className="text-[10px] text-gray-400 font-medium uppercase">
                                        {fl.terminalArr} · {fl.gateArr}
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p className="text-sm font-medium text-gray-900">
                                        {fl.scheduledArr}
                                      </p>
                                      <p className="text-[10px] text-gray-400 font-medium uppercase">
                                        {fl.terminalArr} · {fl.gateArr}
                                      </p>
                                    </>
                                  )}
                                </div>
                                <div className="col-span-2 md:col-span-2 flex items-center">
                                  <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor(fl.status)}`}
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                    {t(
                                      `Search.status.statusLabels.${fl.status}`,
                                    )}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Pagination */}
                          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                            <span className="text-xs text-gray-500">
                              {(currentStatusPage - 1) * STATUS_PAGE_SIZE + 1}–
                              {Math.min(
                                currentStatusPage * STATUS_PAGE_SIZE,
                                flights.length,
                              )}{" "}
                              из {flights.length}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  setCurrentStatusPage((p) =>
                                    Math.max(1, p - 1),
                                  )
                                }
                                disabled={currentStatusPage === 1}
                                className="p-1.5 rounded-lg hover:bg-gray-200 disabled:opacity-30 transition-colors"
                              >
                                <ChevronLeft className="h-4 w-4 text-gray-600" />
                              </button>
                              {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1,
                              ).map((pg) => (
                                <button
                                  key={pg}
                                  onClick={() => setCurrentStatusPage(pg)}
                                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                                    pg === currentStatusPage
                                      ? "bg-brand-primary text-white shadow-sm"
                                      : "hover:bg-gray-200 text-gray-600"
                                  }`}
                                >
                                  {pg}
                                </button>
                              ))}
                              <button
                                onClick={() =>
                                  setCurrentStatusPage((p) =>
                                    Math.min(totalPages, p + 1),
                                  )
                                }
                                disabled={currentStatusPage === totalPages}
                                className="p-1.5 rounded-lg hover:bg-gray-200 disabled:opacity-30 transition-colors"
                              >
                                <ChevronRight className="h-4 w-4 text-gray-600" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    }

                    /* ── SINGLE CARD VIEW ── */
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 border border-gray-200 rounded-2xl bg-white p-6 shadow-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              {flightStatusResult.flightNum}
                            </h3>
                            <p className="text-sm text-gray-400 font-medium">
                              {flightStatusResult.airline} ·{" "}
                              {format(
                                new Date(flightStatusResult.date),
                                "dd MMM yyyy",
                              )}
                            </p>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm border border-gray-100 ${statusColor(flightStatusResult.status)}`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {t(
                              `Search.status.statusLabels.${flightStatusResult.status}`,
                            )}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
                          <div className="text-center">
                            <div className="text-3xl font-black text-gray-900 mb-1">
                              {flightStatusResult.origin}
                            </div>
                            <div className="text-sm font-bold text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded inline-block">
                              {flightStatusResult.scheduledDep}
                            </div>
                            <div className="text-[10px] text-gray-400 mt-1 font-bold uppercase">
                              {flightStatusResult.terminalDep} ·{" "}
                              {flightStatusResult.gateDep}
                            </div>
                          </div>
                          <div className="flex-1 flex items-center px-6 relative">
                            <div className="w-full border-t-2 border-dotted border-gray-100" />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full border border-gray-50 shadow-sm">
                              <Plane className="h-5 w-5 text-brand-primary rotate-90" />
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-black text-gray-900 mb-1">
                              {flightStatusResult.destination}
                            </div>
                            <div className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                              {flightStatusResult.estimatedArr}
                            </div>
                            <div className="text-[10px] text-gray-400 mt-1 font-bold uppercase">
                              {flightStatusResult.terminalArr} ·{" "}
                              {flightStatusResult.gateArr}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                          <div className="text-center">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                              {t("Search.status.gate")} (
                              {t("Search.status.depLabel")})
                            </p>
                            <p className="text-sm font-black text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-lg inline-block">
                              {flightStatusResult.gateDep}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                              {t("Search.status.gate")} (
                              {t("Search.status.arrLabel")})
                            </p>
                            <p className="text-sm font-black text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-lg inline-block">
                              {flightStatusResult.gateArr}
                            </p>
                          </div>
                          {flightStatusResult.status === "landed" && (
                            <div className="col-span-2 text-center pt-2">
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                                {t("Search.status.baggage")}
                              </p>
                              <p className="text-base font-black text-orange-600 bg-orange-50 px-4 py-1.5 rounded-xl inline-block">
                                {flightStatusResult.baggage}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })()}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Hot Deals Auto-Scroll Section */}
      <HotDealsSection
        onNavigate={onNavigate}
        onSearchFlights={onSearchFlights}
      />

      {/* Featured Holiday Packages - Auto-Scrolling Carousel */}
      <FeaturedPackagesSection onNavigate={onNavigate} />

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-full text-sm font-semibold mb-4">
              ⭐ {t("Testimonials.badge")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("Testimonials.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("Testimonials.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t
              .raw("Testimonials.list")
              .map(
                (
                  testimonial: {
                    content: string;
                    author: string;
                    trip: string;
                  },
                  index: number,
                ) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                        {testimonial.author[0]}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.author}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.trip}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ),
              )}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                {t("Stats.data.travelers")}
              </div>
              <p className="text-gray-600 font-medium">
                {t("Stats.happyTravelers")}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                {t("Stats.data.rating")}
              </div>
              <p className="text-gray-600 font-medium">
                {t("Stats.averageRating")}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                {t("Stats.data.destinations")}
              </div>
              <p className="text-gray-600 font-medium">
                {t("Stats.destinations")}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                {t("Stats.data.support")}
              </div>
              <p className="text-gray-600 font-medium">{t("Stats.support")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - Compact */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4"
            >
              {t("WhyChooseUs.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              {t("WhyChooseUs.subtitle")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: t("WhyChooseUs.features.prices.title"),
                description: t("WhyChooseUs.features.prices.description"),
                icon: TrendingUp,
                color: "bg-brand-accent",
              },
              {
                title: t("WhyChooseUs.features.support.title"),
                description: t("WhyChooseUs.features.support.description"),
                icon: Headphones,
                color: "bg-brand-secondary",
              },
              {
                title: t("WhyChooseUs.features.secure.title"),
                description: t("WhyChooseUs.features.secure.description"),
                icon: Shield,
                color: "bg-brand-primary",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`absolute top-0 left-0 w-1 h-full ${feature.color} rounded-l-2xl`}
                />
                <div
                  className={`inline-flex p-4 rounded-xl ${feature.color} mb-4`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Featured Packages Section with Auto-Scrolling Carousel
interface FeaturedPackagesSectionProps {
  onNavigate?: (page: "holidays") => void;
}

function FeaturedPackagesSection({ onNavigate }: FeaturedPackagesSectionProps) {
  const t = useTranslations();
  const { CurrencySymbol } = useCurrency();
  const [isPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Featured packages data
  const featuredPackages = t.raw("Featured.packages") as Package[];

  useEffect(() => {
    if (!scrollRef.current || isPaused) return;

    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollAmount += scrollSpeed;
        scrollContainer.scrollLeft = scrollAmount;

        // Reset when reaching halfway (since we doubled the content)
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="default" className="mb-3">
                {t("Featured.badge")}
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                {t("Featured.title")}
              </h2>
              <p className="text-lg text-gray-600">{t("Featured.subtitle")}</p>
            </motion.div>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => onNavigate?.("holidays")}
            className="hidden md:flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-secondary transition-colors group"
          >
            {t("Featured.viewAll")}
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.slice(0, 6).map((pkg, index) => (
            <motion.div
              key={`${pkg.id}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer h-full"
              onClick={() => onNavigate?.("holidays")}
            >
              <div className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      pkg.image ||
                      (pkg.images && pkg.images[0]) ||
                      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop"
                    }
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Favorite Button */}
                  <button className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
                    <Heart className="h-5 w-5 text-gray-700" />
                  </button>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-white/90 text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{pkg.destination}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-secondary transition-colors line-clamp-1">
                      {pkg.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Rating & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          {pkg.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        ({pkg.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">
                        {typeof pkg.duration === "string"
                          ? pkg.duration
                          : `${t("Holidays.daysCount", { count: pkg.duration.days })} / ${t("Holidays.nightsCount", { count: pkg.duration.nights })}`}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.highlights
                        ?.slice(0, 3)
                        .map((highlight: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md"
                          >
                            {highlight}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between pt-4 border-t border-gray-200 mt-auto">
                    <div>
                      <p className="text-xs text-gray-600 mb-0.5">
                        {t("Featured.startingFrom")}
                      </p>
                      <p className="text-2xl font-bold text-brand-primary flex items-center">
                        <CurrencySymbol className="h-4 w-4 mr-1" />
                        {(pkg.price || 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t("Featured.perPerson")}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-secondary transition-colors flex items-center gap-2">
                      {t("Featured.viewDetails")}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button (Mobile) */}
        <div className="mt-8 text-center md:hidden">
          <button
            onClick={() => onNavigate?.("holidays")}
            className="w-full px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-brand-secondary transition-colors flex items-center justify-center gap-2"
          >
            {t("Featured.viewAll")}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Hot Deals Section with horizontal scroll
interface HotDealsSectionProps {
  onNavigate?: (
    page: "flights" | "hotels" | "holidays" | "visa" | "cargo",
  ) => void;
  onSearchFlights?: (destination?: string) => void;
}

function HotDealsSection({
  onNavigate,
  onSearchFlights,
}: HotDealsSectionProps) {
  const t = useTranslations();
  const { CurrencySymbol } = useCurrency();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Try to safely access HotDeals to avoid crashes if someone changes locale too fast
  let cards: Array<{
    id: string;
    destination: string;
    country: string;
    price: number;
    oldPrice?: number;
    image: string;
    badge?: string;
  }> = [];
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
          className="flex gap-6 overflow-x-auto pb-10 pt-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .snap-mandatory::-webkit-scrollbar { display: none; }
          `,
            }}
          />

          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="snap-start shrink-0 cursor-pointer group"
              onClick={() => {
                if (onSearchFlights) {
                  onSearchFlights(card.id.toUpperCase());
                } else if (onNavigate) {
                  // Fallback
                  onNavigate("flights");
                }
              }}
            >
              <div className="relative w-[300px] h-[380px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100">
                <img
                  src={
                    card.image ||
                    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop"
                  }
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

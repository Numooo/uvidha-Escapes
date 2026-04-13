import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  PlaneTakeoff,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plane,
  Search,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { AIRPORTS } from "./data";

type SearchMode = "flightNumber" | "route" | "allFlights";

interface MockFlight {
  id: number;
  flightNum: string;
  airline: string;
  origin: string;
  destination: string;
  scheduledDep: string;
  estimatedDep: string;
  actualDep: string | null;
  scheduledArr: string;
  actualArr: string | null;
  terminal: string;
  gate: string;
  status: string;
  date: string;
}

interface SingleResult {
  type: "single";
  flightNum: string;
  airline: string;
  status: string;
  origin: string;
  destination: string;
  scheduledDep: string;
  actualDep: string;
  scheduledArr: string;
  estimatedArr: string;
  terminalDep: string;
  gateDep: string;
  terminalArr: string;
  baggage: string;
  date: string;
}

interface ListResult {
  type: "list";
  flights: MockFlight[];
}

type SearchResult = SingleResult | ListResult | null;

const PAGE_SIZE = 10;

function generateMockFlights(date: string): MockFlight[] {
  const routes = [
    { origin: "FRU", destination: "MOW", airline: "Avia Traffic", prefix: "YK" },
    { origin: "FRU", destination: "IST", airline: "Turkish Airlines", prefix: "TK" },
    { origin: "FRU", destination: "DXB", airline: "FlyDubai", prefix: "FZ" },
    { origin: "FRU", destination: "ALA", airline: "Air Astana", prefix: "KC" },
    { origin: "FRU", destination: "TAS", airline: "Uzbekistan Airways", prefix: "HY" },
    { origin: "MOW", destination: "FRU", airline: "S7 Airlines", prefix: "S7" },
    { origin: "IST", destination: "FRU", airline: "Turkish Airlines", prefix: "TK" },
    { origin: "DXB", destination: "FRU", airline: "FlyDubai", prefix: "FZ" },
    { origin: "BOM", destination: "FRU", airline: "Air Arabia", prefix: "G9" },
    { origin: "FRU", destination: "BOM", airline: "IndiGo", prefix: "6E" },
    { origin: "FRU", destination: "BKK", airline: "Thai Airways", prefix: "TG" },
    { origin: "KUL", destination: "FRU", airline: "Malaysia Airlines", prefix: "MH" },
    { origin: "FRU", destination: "SVO", airline: "Aeroflot", prefix: "SU" },
    { origin: "FRU", destination: "LED", airline: "Nordwind", prefix: "N4" },
    { origin: "OSS", destination: "FRU", airline: "Avia Traffic", prefix: "YK" },
  ];
  const statuses = ["ontime", "ontime", "ontime", "delayed", "enroute", "landed", "cancelled"];
  const hoursArr = ["05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22"];
  const terminals = ["Terminal 1", "Terminal 2"];
  const gates = ["A1","A2","A3","A4","B1","B2","B3","C1","C2"];

  return Array.from({ length: 25 }, (_, i) => {
    const route = routes[i % routes.length];
    const depH = hoursArr[i % hoursArr.length];
    const depM = i % 2 === 0 ? "00" : "30";
    const arrH = String((parseInt(depH) + 3 + (i % 3)) % 24).padStart(2, "0");
    const status = statuses[i % statuses.length];
    const actualDep = status === "landed"
      ? `${String((parseInt(depH) + (i % 2 === 0 ? 0 : 1)) % 24).padStart(2, "0")}:${i % 3 === 0 ? "05" : depM}`
      : null;
    const actualArr = status === "landed"
      ? `${String((parseInt(arrH) + (i % 2 === 0 ? 0 : 1)) % 24).padStart(2, "0")}:${i % 3 === 0 ? "12" : depM}`
      : null;
    return {
      id: i,
      flightNum: `${route.prefix} ${100 + i * 7}`,
      airline: route.airline,
      origin: route.origin,
      destination: route.destination,
      scheduledDep: `${depH}:${depM}`,
      estimatedDep: status === "delayed"
        ? `${String((parseInt(depH) + 1) % 24).padStart(2, "0")}:${depM}`
        : `${depH}:${depM}`,
      actualDep,
      scheduledArr: `${arrH}:${depM}`,
      actualArr,
      terminal: terminals[i % terminals.length],
      gate: gates[i % gates.length],
      status,
      date,
    };
  });
}

function statusColor(s: string): string {
  if (s === "ontime")    return "bg-green-100 text-green-700";
  if (s === "delayed")   return "bg-yellow-100 text-yellow-700";
  if (s === "cancelled") return "bg-red-100 text-red-700";
  if (s === "enroute")   return "bg-blue-100 text-blue-700";
  if (s === "landed")    return "bg-purple-100 text-purple-700";
  return "bg-gray-100 text-gray-600";
}

export function FlightStatusPage() {
  const t = useTranslations("Search.status");

  const [mode, setMode] = useState<SearchMode>("flightNumber");
  const [flightNumber, setFlightNumber] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [result, setResult] = useState<SearchResult>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);

  const canSearch =
    (mode === "flightNumber" && !!flightNumber) ||
    (mode === "route" && (!!origin || !!destination)) ||
    mode === "allFlights";

  const handleSearch = () => {
    if (!canSearch) return;
    setIsSearching(true);
    setResult(null);
    setPage(1);

    setTimeout(() => {
      setIsSearching(false);

      if (mode === "allFlights") {
        setResult({ type: "list", flights: generateMockFlights(date) });
      } else if (mode === "route") {
        const all = generateMockFlights(date);
        const filtered = all.filter((f) => {
          const mO = !origin || f.origin === origin;
          const mD = !destination || f.destination === destination;
          return mO && mD;
        });
        setResult({ type: "list", flights: filtered.length > 0 ? filtered : all.slice(0, 10) });
      } else {
        setResult({
          type: "single",
          flightNum: flightNumber.toUpperCase(),
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
          baggage: "Belt 5",
          date,
        });
      }
    }, 1200);
  };

  const modes: { value: SearchMode; label: string }[] = [
    { value: "flightNumber", label: t("searchByFlightNumber") },
    { value: "route",        label: t("searchByRoute") },
    { value: "allFlights",   label: t("searchByDate") },
  ];

  return (
    <div className="flex-1 flex flex-col bg-brand-primary min-h-screen">
      {/* Hero & Content Container */}
      <section className="relative flex-1 flex flex-col items-center pt-20 pb-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=1920&q=80)" }}
        />
        <div className="absolute inset-0 bg-brand-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
          >
            <Activity size={40} className="text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t("searchByFlightNumber").replace("По номеру", "Статус рейса").replace("By Flight Number", "Flight Status")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/85 max-w-2xl mx-auto mb-10"
          >
            Проверяйте статус рейсов в реальном времени — вылет, прилёт, терминал и гейт
          </motion.p>

          {/* Search card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-2xl text-left"
          >
            {/* Mode tabs */}
            <div className="flex flex-wrap gap-1 mb-5 bg-gray-100 rounded-xl p-1">
              {modes.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => { setMode(value); setResult(null); }}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    mode === value
                      ? "bg-white text-brand-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-5">
              {mode === "flightNumber" && (
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">{t("flightNumber")}</label>
                  <div className="relative">
                    <PlaneTakeoff className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder={t("flightNumberPlaceholder")}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    />
                  </div>
                </div>
              )}

              {mode === "route" && (
                <>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">{t("origin")}</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="">Откуда</option>
                        {AIRPORTS.map((a) => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">{t("destination")}</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="">Куда</option>
                        {AIRPORTS.map((a) => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">{t("date")}</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={isSearching || !canSearch}
              className="w-full rounded-xl bg-brand-primary py-4 text-base font-bold text-white shadow-md transition-all hover:bg-brand-secondary hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><Search className="h-5 w-5" /> {t("checkStatus")}</>
              )}
            </button>
          </motion.div>

          {/* Integrated Results */}
          <div className="mt-12 w-full max-w-5xl mx-auto text-left">
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {/* LIST VIEW */}
                  {result.type === "list" && (() => {
                    const flights = result.flights;
                    const totalPages = Math.ceil(flights.length / PAGE_SIZE);
                    const paged = flights.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
                    return (
                      <div className="border border-white/10 rounded-2xl bg-white shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">
                              {t("flightListTitle")} {format(new Date(date), "dd MMM yyyy")}
                            </h2>
                            <p className="text-sm text-gray-400 mt-0.5">{flights.length} рейсов найдено</p>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded">стр. {page}/{totalPages}</span>
                          </div>
                        </div>

                        {/* Col headers */}
                        <div className="hidden md:grid grid-cols-12 gap-3 px-6 py-3 bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                          <div className="col-span-2">{t("tableHeaders.flight")}</div>
                          <div className="col-span-4">{t("tableHeaders.route")}</div>
                          <div className="col-span-2">{t("tableHeaders.departure")}</div>
                          <div className="col-span-2">{t("tableHeaders.arrival")}</div>
                          <div className="col-span-2">{t("tableHeaders.status")}</div>
                        </div>

                        <div className="divide-y divide-gray-50 bg-white">
                          {paged.map((fl, idx) => (
                            <motion.div
                              key={fl.id}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.02 }}
                              className="grid grid-cols-2 md:grid-cols-12 gap-3 px-6 py-5 hover:bg-brand-primary/[0.02] transition-colors"
                            >
                              <div className="col-span-1 md:col-span-2">
                                <p className="text-sm font-bold text-gray-900">{fl.flightNum}</p>
                                <p className="text-xs text-gray-500 truncate">{fl.airline}</p>
                              </div>
                              <div className="col-span-1 md:col-span-4 flex items-center gap-2">
                                <span className="text-sm font-bold text-gray-800">{fl.origin}</span>
                                <Plane className="h-3.5 w-3.5 text-brand-primary/40 shrink-0" />
                                <span className="text-sm font-bold text-gray-800">{fl.destination}</span>
                              </div>
                              <div className="col-span-1 md:col-span-2">
                                {fl.status === "landed" && fl.actualDep ? (
                                  <>
                                    <p className="text-xs text-gray-300 line-through">{fl.scheduledDep}</p>
                                    <p className="text-sm font-bold text-gray-900">{fl.actualDep} <span className="text-[10px] text-brand-secondary font-bold">ФАКТ.</span></p>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-sm font-bold text-gray-900">{fl.scheduledDep}</p>
                                    {fl.estimatedDep !== fl.scheduledDep && (
                                      <p className="text-xs text-orange-500 font-bold">{fl.estimatedDep} ↑</p>
                                    )}
                                  </>
                                )}
                              </div>
                              <div className="col-span-1 md:col-span-2">
                                {fl.status === "landed" && fl.actualArr ? (
                                  <>
                                    <p className="text-xs text-gray-300 line-through">{fl.scheduledArr}</p>
                                    <p className="text-sm font-bold text-gray-900">{fl.actualArr} <span className="text-[10px] text-brand-secondary font-bold">ФАКТ.</span></p>
                                    <p className="text-xs text-gray-400">{fl.terminal} · {fl.gate}</p>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-sm font-bold text-gray-900">{fl.scheduledArr}</p>
                                    <p className="text-xs text-gray-400">{fl.terminal} · {fl.gate}</p>
                                  </>
                                )}
                              </div>
                              <div className="col-span-2 md:col-span-2 flex items-center">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${statusColor(fl.status)}`}>
                                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                                  {t(`statusLabels.${fl.status}`)}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
                          <span className="text-xs font-medium text-gray-500">
                            {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, flights.length)} из {flights.length} рейсов
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setPage(p => Math.max(1, p - 1))}
                              disabled={page === 1}
                              className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-30 transition-all shadow-sm"
                            >
                              <ChevronLeft className="h-4 w-4 text-gray-600" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                              <button
                                key={pg}
                                onClick={() => setPage(pg)}
                                className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                                  pg === page
                                    ? "bg-brand-primary text-white shadow-md scale-110"
                                    : "bg-white border border-gray-200 hover:border-brand-primary/30 text-gray-600"
                                }`}
                              >
                                {pg}
                              </button>
                            ))}
                            <button
                              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                              disabled={page === totalPages}
                              className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-30 transition-all shadow-sm"
                            >
                              <ChevronRight className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* SINGLE CARD VIEW */}
                  {result.type === "single" && (
                    <div className="border border-white/10 rounded-3xl bg-white p-10 shadow-2xl">
                      <div className="flex flex-wrap items-center justify-between mb-10">
                        <div>
                          <h2 className="text-4xl font-black text-gray-900 tracking-tight">{result.flightNum}</h2>
                          <p className="text-base text-gray-500 mt-2 font-medium">{result.airline} · {format(new Date(result.date), "dd MMMM yyyy")}</p>
                        </div>
                        <span className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-sm ${statusColor(result.status)}`}>
                          <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
                          {t(`statusLabels.${result.status}`)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-12 px-2">
                        <div className="text-center">
                          <div className="text-5xl font-black text-gray-900 mb-2">{result.origin}</div>
                          <div className="text-base font-bold text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-lg inline-block">{result.scheduledDep}</div>
                        </div>
                        <div className="flex-1 flex items-center px-12 relative">
                          <div className="w-full border-t-4 border-dotted border-gray-100" />
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg border border-gray-50">
                            <Plane className="h-8 w-8 text-brand-primary rotate-90" />
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-5xl font-black text-gray-900 mb-2">{result.destination}</div>
                          <div className="text-base font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg inline-block">{result.estimatedArr}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50 rounded-3xl p-8 border border-gray-100">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("terminal")} (DEP)</p>
                          <p className="text-lg font-black text-gray-900">{result.terminalDep}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("gate")}</p>
                          <p className="text-lg font-black text-gray-900 text-brand-primary">{result.gateDep}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("terminal")} (ARR)</p>
                          <p className="text-lg font-black text-gray-900">{result.terminalArr}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("baggage")}</p>
                          <p className="text-lg font-black text-gray-900 text-orange-600">{result.baggage}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

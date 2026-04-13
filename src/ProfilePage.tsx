import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  CreditCard, 
  Plane, 
  Hotel, 
  Palmtree, 
  Truck, 
  BarChart3, 
  LogOut, 
  Clock, 
  Plus,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar,
  Sparkles
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";

interface BookingItem {
  id: string;
  type: "flight" | "hotel" | "package" | "cargo";
  title: string;
  subtitle: string;
  date: string;
  price: number;
  status: "upcoming" | "completed" | "in-transit" | "delivered";
}

const MOCK_BOOKINGS: BookingItem[] = [
  // Flights
  { id: "FL-123", type: "flight", title: "Bishkek (FRU) → Dubai (DXB)", subtitle: "FlyDubai • Business Class", date: "2024-05-15", price: 450, status: "upcoming" },
  { id: "FL-100", type: "flight", title: "Moscow (SVO) → Bishkek (FRU)", subtitle: "Aeroflot • Economy", date: "2024-03-01", price: 200, status: "completed" },
  { id: "FL-210", type: "flight", title: "Bishkek (FRU) → Istanbul (IST)", subtitle: "Turkish Airlines • Economy", date: "2024-01-20", price: 320, status: "completed" },
  { id: "FL-330", type: "flight", title: "Bishkek (FRU) → Tashkent (TAS)", subtitle: "Uzbekistan Airways", date: "2023-12-12", price: 150, status: "completed" },
  
  // Hotels
  { id: "HT-789", type: "hotel", title: "Atlantis The Palm", subtitle: "Dubai • Deluxe Ocean Room", date: "2024-05-16", price: 1200, status: "upcoming" },
  { id: "HT-555", type: "hotel", title: "Rixos Premium Belek", subtitle: "Antalya • Family Suite", date: "2024-07-15", price: 3500, status: "upcoming" },
  { id: "HT-222", type: "hotel", title: "Sheraton Bishkek", subtitle: "Executive Suite", date: "2024-02-14", price: 180, status: "completed" },
  { id: "HT-111", type: "hotel", title: "Novotel Moscow City", subtitle: "Superior Room", date: "2024-03-01", price: 120, status: "completed" },

  // Tours/Packages
  { id: "PK-456", type: "package", title: "Antalya Summer Escape", subtitle: "7 Days • All Inclusive", date: "2024-07-10", price: 2500, status: "upcoming" },
  { id: "PK-102", type: "package", title: "Swiss Alps Adventure", subtitle: "5 Days • Ski & Spa", date: "2024-12-20", price: 1800, status: "upcoming" },
  { id: "PK-088", type: "package", title: "Ancient Egypt Tour", subtitle: "10 Days • Nile Cruise", date: "2023-10-05", price: 1400, status: "completed" },

  // Cargo
  { id: "CR-001", type: "cargo", title: "Standard Shipment", subtitle: "150kg • Istanbul → Bishkek", date: "2024-04-10", price: 300, status: "in-transit" },
  { id: "CR-005", type: "cargo", title: "Fragile Goods", subtitle: "45kg • Dubai → Bishkek", date: "2024-05-02", price: 550, status: "upcoming" },
  { id: "CR-999", type: "cargo", title: "Express Delivery", subtitle: "12kg • London → Bishkek", date: "2024-03-15", price: 120, status: "delivered" },
  { id: "CR-888", type: "cargo", title: "Commercial Cargo", subtitle: "2500kg • Guangzhou → Bishkek", date: "2024-01-10", price: 4200, status: "delivered" },
];

export function ProfilePage() {
  const t = useTranslations("Profile");
  const { CurrencySymbol } = useCurrency();
  const [activeTab, setActiveTab ] = useState<"cards" | "flights" | "hotels" | "tours" | "cargo" | "analytics">("analytics");

  const tabs = [
    { id: "analytics", label: t("tabs.analytics"), icon: BarChart3 },
    { id: "flights", label: t("tabs.flights"), icon: Plane },
    { id: "hotels", label: t("tabs.hotels"), icon: Hotel },
    { id: "tours", label: t("tabs.tours"), icon: Palmtree },
    { id: "cargo", label: t("tabs.cargo"), icon: Truck },
    { id: "cards", label: t("tabs.cards"), icon: CreditCard },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-green-100 text-green-700";
      case "in-transit": return "bg-orange-100 text-orange-700";
      case "delivered": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "upcoming": return t("booking.upcoming");
      case "completed": return t("booking.completed");
      case "in-transit": return t("booking.inTransit");
      case "delivered": return t("booking.delivered");
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header / Banner */}
      <div className="bg-brand-primary pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-md border-2 border-white/20 flex items-center justify-center p-2 shadow-2xl">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-brand-accent to-brand-primary flex items-center justify-center">
                  <User size={64} className="text-white" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-brand-primary flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">{t("welcome")}, John Doe</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="flex items-center gap-2 text-white/80 bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-sm">
                  <User size={14} /> Personal Account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sticky top-24">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-semibold transition-all ${
                        activeTab === tab.id
                          ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon size={20} className={activeTab === tab.id ? "text-white" : "text-gray-400"} />
                      <span>{tab.label}</span>
                      {activeTab === tab.id && (
                        <motion.div layoutId="activeTabIndicator" className="ml-auto">
                          <ChevronRight size={16} />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all">
                    <LogOut size={20} />
                    <span>{t("logout")}</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 min-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Analytics Tab */}
                  {activeTab === "analytics" && (
                    <div className="space-y-8">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">{t("tabs.analytics")}</h2>
                        <div className="bg-brand-primary/5 text-brand-primary px-4 py-2 rounded-xl text-sm font-bold">
                          Year 2026
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { label: t("analytics.totalTrips"), value: "12", icon: MapPin, color: "blue" },
                          { label: t("analytics.totalSpent"), value: 3450, icon: CreditCard, color: "green", prefix: true },
                          { label: t("analytics.milesEarned"), value: "4,200", icon: Plane, color: "purple" },
                          { label: t("analytics.topDestination"), value: "Dubai", icon: Palmtree, color: "orange" },
                        ].map((stat, i) => (
                          <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`w-10 h-10 rounded-xl bg-${stat.color}-100 flex items-center justify-center mb-4`}>
                              <stat.icon size={20} className={`text-${stat.color}-600`} />
                            </div>
                            <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</div>
                            <div className="text-2xl font-black text-gray-900 flex items-center gap-1">
                              {stat.prefix && <CurrencySymbol className="h-5 w-5" />}
                              {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Spent Categories (Mini Chart Simulation) */}
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                          <h3 className="text-lg font-bold text-gray-900 mb-6">{t("analytics.spentByCategory")}</h3>
                          <div className="space-y-6">
                            {[
                              { label: t("tabs.flights"), perc: 45, color: "bg-blue-500", val: "1,550" },
                              { label: t("tabs.hotels"), perc: 30, color: "bg-green-500", val: "1,035" },
                              { label: t("tabs.tours"), perc: 20, color: "bg-purple-500", val: "690" },
                              { label: t("tabs.cargo"), perc: 5, color: "bg-orange-500", val: "175" },
                            ].map((item, i) => (
                              <div key={i}>
                                <div className="flex justify-between text-sm font-semibold mb-2">
                                  <span className="text-gray-700">{item.label}</span>
                                  <span className="text-gray-900 flex items-center gap-1">
                                    <CurrencySymbol className="h-3 w-3" />
                                    {item.val}
                                  </span>
                                </div>
                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.perc}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className={`h-full ${item.color} rounded-full`} 
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                          <h3 className="text-lg font-bold text-gray-900 mb-6">{t("analytics.recentActivity")}</h3>
                          <div className="space-y-4">
                            {MOCK_BOOKINGS.slice(0, 3).map((item, i) => (
                              <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                                  {item.type === "flight" ? <Plane size={18} /> : 
                                   item.type === "hotel" ? <Hotel size={18} /> : 
                                   item.type === "package" ? <Palmtree size={18} /> : <Truck size={18} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-bold text-gray-900 truncate">{item.title}</div>
                                  <div className="text-xs text-gray-500">{item.date}</div>
                                </div>
                                <div className="text-sm font-black text-brand-primary flex items-center gap-1">
                                  <CurrencySymbol className="h-3 w-3" />
                                  {item.price.toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Booking Tabs (Flights, Hotels, Tours, Cargo) */}
                  {(activeTab === "flights" || activeTab === "hotels" || activeTab === "tours" || activeTab === "cargo") && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {activeTab === "flights" ? t("tabs.flights") : 
                           activeTab === "hotels" ? t("tabs.hotels") : 
                           activeTab === "tours" ? t("tabs.tours") : t("tabs.cargo")}
                        </h2>
                      </div>

                      <div className="space-y-6">
                        {MOCK_BOOKINGS.filter(b => {
                          if (activeTab === "tours") return b.type === "package";
                          if (activeTab === "flights") return b.type === "flight";
                          if (activeTab === "hotels") return b.type === "hotel";
                          return b.type === activeTab;
                        }).map((booking) => (
                          <div key={booking.id} className="group relative bg-white rounded-3xl border border-gray-100 p-1 transition-all hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/5">
                            <div className={`p-6 rounded-[calc(1.5rem-2px)] bg-gray-50/50 group-hover:bg-white transition-colors flex flex-col md:flex-row gap-8`}>
                              
                              {/* Left Side: Type Icon + ID */}
                              <div className="flex md:flex-col items-center md:items-start justify-between md:justify-center gap-4 min-w-[120px]">
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:bg-brand-primary group-hover:text-white transition-all">
                                  {booking.type === "flight" ? <Plane size={32} /> : 
                                   booking.type === "hotel" ? <Hotel size={32} /> : 
                                   booking.type === "package" ? <Palmtree size={32} /> : <Truck size={32} />}
                                </div>
                                <div>
                                  <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{t("booking.bookingId")}</div>
                                  <div className="text-xs font-bold text-gray-900">{booking.id}</div>
                                </div>
                              </div>

                              {/* Main Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(booking.status)}`}>
                                    {getStatusLabel(booking.status)}
                                  </span>
                                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                    <Calendar size={14} className="text-gray-300" />
                                    {booking.date}
                                  </span>
                                </div>

                                {booking.type === "flight" ? (
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-6">
                                      <div className="flex-1">
                                        <div className="text-xs text-brand-primary font-bold uppercase mb-1">Departure</div>
                                        <div className="text-xl font-black text-gray-900">{booking.title.split("→")[0].trim()}</div>
                                      </div>
                                      <div className="flex flex-col items-center px-4">
                                        <div className="w-12 h-px bg-gray-200 relative">
                                          <motion.div 
                                            initial={{ left: 0 }}
                                            animate={{ left: "100%" }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                            className="absolute -top-1 w-2 h-2 rounded-full bg-brand-primary/20"
                                          />
                                        </div>
                                        <Plane size={14} className="text-gray-300 my-1" />
                                      </div>
                                      <div className="flex-1 text-right">
                                        <div className="text-xs text-brand-primary font-bold uppercase mb-1">{t("booking.flightTo")}</div>
                                        <div className="text-xl font-black text-gray-900">{booking.title.split("→")[1]?.trim()}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/50 p-2 rounded-xl border border-gray-100 text-xs font-medium text-gray-500">
                                      <Sparkles size={14} className="text-brand-accent" />
                                      {booking.subtitle}
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">{booking.title}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 group-hover:text-gray-700 transition-colors">
                                      <MapPin size={14} className="text-brand-primary/50" />
                                      {booking.subtitle}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Price + Action */}
                              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-10 min-w-[140px]">
                                <div className="text-center md:text-right">
                                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{t("booking.price")}</div>
                                  <div className="text-2xl font-black text-brand-primary flex items-center justify-center md:justify-end">
                                    <CurrencySymbol className="h-5 w-5 mr-1" />
                                    {booking.price.toLocaleString()}
                                  </div>
                                </div>

                              </div>

                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cards Tab */}
                  {activeTab === "cards" && (
                    <div className="space-y-8">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">{t("tabs.cards")}</h2>
                        <button className="bg-brand-primary text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-brand-primary/25 hover:scale-105 transition-all flex items-center gap-2 text-sm">
                          <Plus size={18} />
                          {t("cards.addCard")}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Visa Card */}
                        <div className="relative h-56 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white shadow-2xl overflow-hidden group">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110" />
                          <div className="relative h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div className="w-12 h-10 bg-amber-200/20 rounded-lg backdrop-blur-md flex items-center justify-center border border-amber-200/30">
                                <div className="w-8 h-6 bg-amber-400/50 rounded-sm" />
                              </div>
                              <div className="text-2xl font-black italic tracking-tighter opacity-80">VISA</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-gray-400 font-medium uppercase tracking-widest">{t("cards.cardNumber")}</div>
                              <div className="text-2xl font-mono tracking-[4px]">•••• •••• •••• 5678</div>
                            </div>
                            <div className="flex justify-between items-end">
                              <div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Card Holder</div>
                                <div className="text-sm font-bold tracking-widest uppercase">JOHN DOE</div>
                              </div>
                              <div className="text-right">
                                <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">{t("cards.validThru")}</div>
                                <div className="text-sm font-bold">12/28</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mastercard Card */}
                        <div className="relative h-56 rounded-3xl bg-gradient-to-br from-brand-primary to-blue-800 p-8 text-white shadow-2xl overflow-hidden group">
                          <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-accent/20 rounded-full -mr-24 -mb-24 blur-3xl" />
                          <div className="relative h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div className="w-12 h-10 bg-white/20 rounded-lg backdrop-blur-md border border-white/30" />
                              <div className="flex -space-x-4">
                                <div className="w-10 h-10 rounded-full bg-red-500 opacity-80" />
                                <div className="w-10 h-10 rounded-full bg-orange-500 opacity-80" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-blue-200 font-medium uppercase tracking-widest">{t("cards.cardNumber")}</div>
                              <div className="text-2xl font-mono tracking-[4px]">•••• •••• •••• 9012</div>
                            </div>
                            <div className="flex justify-between items-end">
                              <div>
                                <div className="text-[10px] text-blue-200 font-bold uppercase mb-1">Card Holder</div>
                                <div className="text-sm font-bold tracking-widest uppercase">JOHN DOE</div>
                              </div>
                              <div className="text-right">
                                <div className="text-[10px] text-blue-200 font-bold uppercase mb-1">{t("cards.validThru")}</div>
                                <div className="text-sm font-bold">06/26</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

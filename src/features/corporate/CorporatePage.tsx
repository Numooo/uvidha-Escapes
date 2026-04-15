"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  FileText, 
  Settings,
  Search as SearchIcon,
  Download,
  Plus,
  CreditCard,
  Plane,
  Hotel,
  TrendingUp,
  MapPin,
  Calendar,
  ChevronRight,
  LogOut,
  Building2,
  DollarSign,
  PieChart as PieChartIcon,
  Clock,
  Train,
  Truck,
  Palmtree,
  Sparkles
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Traveler";
  dept: string;
  spent: number;
  trips: number;
  status: "active" | "on-trip" | "inactive";
}

const MOCK_EMPLOYEES: Employee[] = [
  { id: "EMP-001", name: "Сергей Иванов", email: "s.ivanov@company.com", role: "Admin", dept: "Управление", spent: 15400, trips: 12, status: "active" },
  { id: "EMP-002", name: "Алина Петрова", email: "a.petrova@company.com", role: "Traveler", dept: "Продажи", spent: 8200, trips: 8, status: "on-trip" },
  { id: "EMP-003", name: "Дмитрий Сидоров", email: "d.sidorov@company.com", role: "Traveler", dept: "ИТ", spent: 4500, trips: 3, status: "active" },
  { id: "EMP-004", name: "Елена Смирнова", email: "e.smirnova@company.com", role: "Admin", dept: "HR", spent: 2100, trips: 2, status: "inactive" },
  { id: "EMP-005", name: "Михаил Кузнецов", email: "m.kuznetsov@company.com", role: "Traveler", dept: "Продажи", spent: 12800, trips: 10, status: "active" },
];

const MOCK_INVOICES = [
  { id: "INV-2026-001", date: "2026-04-01", amount: 24500, status: "paid" },
  { id: "INV-2026-002", date: "2026-03-01", amount: 18200, status: "paid" },
  { id: "INV-2026-003", date: "2026-05-01", amount: 12400, status: "pending" },
];

interface BookingItem {
  id: string;
  type: "flight" | "hotel" | "package" | "cargo" | "train";
  title: string;
  subtitle: string;
  date: string;
  price: number;
  status: "upcoming" | "completed" | "in-transit" | "delivered";
}

const MOCK_BOOKINGS: BookingItem[] = [
  { id: "FL-501", type: "flight", title: "Bishkek → Almaty", subtitle: "Air Astana • Business", date: "2024-05-10", price: 180, status: "upcoming" },
  { id: "HT-202", type: "hotel", title: "Ritz-Carlton Almaty", subtitle: "Deluxe Room", date: "2024-05-10", price: 450, status: "upcoming" },
  { id: "TR-303", type: "train", title: "Bishkek → Tashkent", subtitle: "Soft Sleeper", date: "2024-04-12", price: 85, status: "completed" },
  { id: "CR-404", type: "cargo", title: "Office Equipment", subtitle: "450kg • Almaty → Bishkek", date: "2024-03-20", price: 1200, status: "delivered" },
];

export default function CorporatePage() {
  const t = useTranslations("Corporate");
  const tProfile = useTranslations("Profile");
  const tMock = useTranslations("MockData");
  const { CurrencySymbol } = useCurrency();
  const [activeTab, setActiveTab] = useState<"dashboard" | "employees" | "history" | "billing" | "settings">("dashboard");
  const [historyCategory, setHistoryCategory] = useState<"flight" | "hotel" | "package" | "cargo" | "train">("flight");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "dashboard", label: t("tabs.dashboard"), icon: BarChart3 },
    { id: "employees", label: t("tabs.employees"), icon: Users },
    { id: "history", label: tProfile("tabs.history"), icon: Clock },
    { id: "billing", label: t("tabs.billing"), icon: FileText },
    { id: "settings", label: t("tabs.settings"), icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "on-trip": return "bg-blue-100 text-blue-700";
      case "inactive": return "bg-gray-100 text-gray-700";
      case "paid": return "bg-green-100 text-green-700";
      case "pending": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return t("employees.active");
      case "on-trip": return t("employees.onTrip");
      case "inactive": return t("employees.inactive");
      case "paid": return t("billing.paid");
      case "pending": return t("billing.pending");
      default: return status;
    }
  };

  const getBookingStatusLabel = (status: string) => {
    switch (status) {
      case "upcoming": return tProfile("booking.upcoming");
      case "completed": return tProfile("booking.completed");
      case "in-transit": return tProfile("booking.inTransit");
      case "delivered": return tProfile("booking.delivered");
      default: return status;
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-green-100 text-green-700";
      case "in-transit": return "bg-orange-100 text-orange-700";
      case "delivered": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Dynamic Header */}
      <div className="bg-brand-primary pt-32 pb-24 relative overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2069" 
          alt="Corporate Background"
          fill
          className="object-cover opacity-10 mix-blend-luminosity"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-primary/80 to-brand-primary" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-md border-2 border-white/20 flex items-center justify-center p-2 shadow-2xl">
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                  <Building2 size={64} className="text-brand-primary" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-accent rounded-full border-4 border-brand-primary flex items-center justify-center shadow-lg">
                <Briefcase size={16} className="text-brand-primary" />
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-sm">
                  {t("accountType")}
                </span>
              </div>
              <h1 className="text-4xl font-black text-white mb-2">Uvidha Tech Solutions</h1>
              <p className="text-white/60 font-medium flex items-center justify-center md:justify-start gap-2">
                <MapPin size={14} /> Bishkek, Kyrgyzstan • 45 Employees
              </p>
            </div>

            <div className="md:ml-auto flex gap-4">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-white">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">{t("wallet")}</div>
                <div className="text-2xl font-black flex items-center gap-1">
                   <CurrencySymbol className="h-5 w-5" /> 12,850.00
                </div>
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
                        <motion.div layoutId="activeTabIndicatorCorp" className="ml-auto">
                          <ChevronRight size={16} />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
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
                  {/* Dashboard Tab */}
                  {activeTab === "dashboard" && (
                    <div className="space-y-8">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-gray-900">{t("tabs.dashboard")}</h2>
                        <button className="flex items-center gap-2 text-sm font-bold text-brand-primary bg-brand-primary/5 px-4 py-2 rounded-xl">
                          <Download size={16} /> {t("reports.q2")}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { label: t("stats.totalSpent"), value: 45000, icon: CreditCard, color: "blue", prefix: true },
                          { label: t("stats.activeTravelers"), value: "28", icon: Users, color: "green" },
                          { label: t("stats.monthlyBudget"), value: 60000, icon: DollarSign, color: "purple", prefix: true },
                          { label: t("stats.savings"), value: 3400, icon: TrendingUp, color: "orange", prefix: true },
                        ].map((stat, i) => (
                          <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className={`w-10 h-10 rounded-xl bg-${stat.color}-100 flex items-center justify-center mb-4`}>
                              <stat.icon size={20} className={`text-${stat.color}-600`} />
                            </div>
                            <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</div>
                            <div className="text-2xl font-black text-gray-900 flex items-center gap-1">
                              {stat.prefix && <CurrencySymbol className="h-5 w-5" />}
                              {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100">
                           <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                             <PieChartIcon size={20} className="text-brand-primary" />
                             {t("stats.expenditureByDept")}
                           </h3>
                           <div className="space-y-6">
                            {[
                              { label: "Sales & Marketing", perc: 55, color: "bg-blue-500", val: "24,750" },
                              { label: "IT & Development", perc: 25, color: "bg-indigo-500", val: "11,250" },
                              { label: "Executive", perc: 15, color: "bg-purple-500", val: "6,750" },
                              { label: "Others", perc: 5, color: "bg-gray-400", val: "2,250" },
                            ].map((item, i) => (
                              <div key={i}>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                  <span className="text-gray-700">{item.label}</span>
                                  <span className="text-gray-900 flex items-center gap-1">
                                    <CurrencySymbol className="h-3 w-3" /> {item.val}
                                  </span>
                                </div>
                                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.perc}%` }}
                                    transition={{ duration: 1.5, delay: i * 0.1 }}
                                    className={`h-full ${item.color} rounded-full`} 
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100 flex flex-col items-center justify-center text-center">
                          <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6">
                             <TrendingUp size={40} className="text-brand-primary" />
                          </div>
                          <h3 className="text-xl font-black text-gray-900 mb-2">{t("efficiency.title")}: 94%</h3>
                          <p className="text-sm text-gray-500 max-w-xs">{t("efficiency.savingsText", { amount: "3.4k" })}</p>
                          <button className="mt-6 px-6 py-2.5 bg-brand-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-brand-primary/20">
                            {t("efficiency.viewDetails")}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Employees Tab */}
                  {activeTab === "employees" && (
                    <div className="space-y-8">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h2 className="text-2xl font-black text-gray-900">{t("tabs.employees")}</h2>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <div className="relative flex-1 sm:w-64">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              type="text" 
                              placeholder={t("employees.search")} 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                            />
                          </div>
                          <button className="p-2.5 bg-brand-primary text-white rounded-xl shadow-lg hover:scale-105 transition-all">
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="overflow-x-auto -mx-8 px-8">
                        <table className="w-full text-left border-collapse">
                          <thead className="border-b border-gray-100">
                            <tr>
                              <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t("employees.name")}</th>
                              <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t("employees.role")}</th>
                              <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t("employees.dept")}</th>
                              <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t("employees.spent")}</th>
                              <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">{t("employees.trips")}</th>
                              <th className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t("employees.status")}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {MOCK_EMPLOYEES.filter(emp => emp.name.toLowerCase().includes(searchQuery.toLowerCase())).map((emp) => (
                              <tr key={emp.id} className="group hover:bg-gray-50 transition-colors">
                                <td className="py-6">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-brand-primary">
                                      {emp.name.charAt(0)}
                                    </div>
                                    <div>
                                      <div className="text-sm font-bold text-gray-900">{emp.name}</div>
                                      <div className="text-xs text-gray-500">{emp.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-6">
                                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${emp.role === "Admin" ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {emp.role}
                                  </span>
                                </td>
                                <td className="py-6 text-sm text-gray-600 font-medium">{emp.dept}</td>
                                <td className="py-6">
                                  <div className="flex items-center gap-1 text-sm font-black text-gray-900 lowercase">
                                    <CurrencySymbol className="h-3 w-3" /> {emp.spent.toLocaleString()}
                                  </div>
                                </td>
                                <td className="py-6 text-center text-sm font-bold text-gray-900">{emp.trips}</td>
                                <td className="py-6">
                                  <div className="flex items-center gap-2">
                                     <div className={`w-1.5 h-1.5 rounded-full ${emp.status === 'active' ? 'bg-green-500' : emp.status === 'on-trip' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                                     <span className="text-xs font-semibold text-gray-700">{getStatusLabel(emp.status)}</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Billing Tab */}
                  {activeTab === "billing" && (
                     <div className="space-y-8">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-black text-gray-900">{t("tabs.billing")}</h2>
                          <button className="px-6 py-2.5 bg-brand-primary/5 text-brand-primary font-bold rounded-xl text-sm border border-brand-primary/10 transition-all hover:bg-brand-primary/10">
                            {t("billing.downloadStatement")}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="col-span-1 md:col-span-2 space-y-4">
                            {MOCK_INVOICES.map((inv) => (
                              <div key={inv.id} className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400">
                                  <Download />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-black text-gray-900">{inv.id}</div>
                                  <div className="text-xs text-gray-500">{inv.date}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-black text-brand-primary flex items-center justify-end gap-1">
                                    <CurrencySymbol className="h-3 w-3" /> {inv.amount.toLocaleString()}
                                  </div>
                                  <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest mt-1 ${getStatusColor(inv.status)}`}>
                                    {getStatusLabel(inv.status)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="bg-brand-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                             <div className="relative z-10 space-y-6">
                               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                                 <Plus className="h-3 w-3" /> {t("billing.creditLine")}
                               </div>
                               <div>
                                 <div className="text-3xl font-black mb-1 flex items-center gap-1">
                                   <CurrencySymbol className="h-6 w-6" /> 50,000
                                 </div>
                                 <div className="text-xs text-white/50">{t("billing.currentLimit")}</div>
                               </div>
                               <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full w-3/4 bg-brand-accent rounded-full shadow-[0_0_12px_rgba(255,188,0,0.4)]" />
                               </div>
                               <p className="text-xs text-white/60 leading-relaxed font-medium">{t("billing.limitUsage", { percent: 72 })}</p>
                               <button className="w-full py-3 bg-white text-brand-primary font-bold rounded-xl text-sm hover:bg-brand-accent transition-all">
                                 {t("billing.requestIncrease")}
                               </button>
                             </div>
                          </div>
                        </div>
                     </div>
                  )}

                  {/* Settings Tab */}
                  {activeTab === "settings" && (
                    <div className="space-y-8">
                       <h2 className="text-2xl font-black text-gray-900">{t("tabs.settings")}</h2>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                             <div>
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">{t("settings.companyName")}</label>
                               <input type="text" value="Uvidha Tech Solutions" disabled className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm font-bold text-gray-900" />
                             </div>
                             <div>
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">{t("settings.address")}</label>
                               <textarea disabled defaultValue={"123 Business Ave, Tech Park B4\nBishkek, 720000\nKyrgyzstan"} className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm font-medium text-gray-900 h-24" />
                             </div>
                          </div>
                          <div className="space-y-6">
                             <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                               <h4 className="text-sm font-black text-blue-900 mb-4 flex items-center gap-2">
                                 <Users size={16} /> {t("settings.subscription")}
                               </h4>
                               <div className="space-y-3">
                                 <div className="flex justify-between text-xs font-bold">
                                   <span className="text-blue-700/60">{t("settings.tier")}:</span>
                                   <span className="text-blue-900">Corporate Premium</span>
                                 </div>
                                 <div className="flex justify-between text-xs font-bold">
                                   <span className="text-blue-700/60">{t("settings.nextBilling")}:</span>
                                   <span className="text-blue-900">May 15, 2026</span>
                                 </div>
                               </div>
                               <button className="w-full mt-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs">
                                 {t("settings.manage")}
                               </button>
                             </div>
                          </div>
                       </div>
                    </div>
                  )}

                  {/* Other tabs omitted for brevity, can be expanded as needed */}
                  {/* History Tab */}
                  {activeTab === "history" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-gray-900">{tProfile("tabs.history")}</h2>
                      </div>

                      {/* History Category Switcher */}
                      <div className="flex p-1 bg-gray-100 rounded-2xl mb-8 overflow-x-auto no-scrollbar">
                        {[
                          { id: "flight", label: tProfile("tabs.flights"), icon: Plane },
                          { id: "hotel", label: tProfile("tabs.hotels"), icon: Hotel },
                          { id: "package", label: tProfile("tabs.tours"), icon: Palmtree },
                          { id: "cargo", label: tProfile("tabs.cargo"), icon: Truck },
                          { id: "train", label: tProfile("tabs.trains"), icon: Train },
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setHistoryCategory(cat.id as any)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                              historyCategory === cat.id
                                ? "bg-white text-brand-primary shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            <cat.icon size={14} />
                            {cat.label}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-6">
                        {MOCK_BOOKINGS.filter(b => b.type === historyCategory).length > 0 ? (
                          MOCK_BOOKINGS.filter(b => b.type === historyCategory).map((booking) => (
                            <div key={booking.id} className="group relative bg-white rounded-3xl border border-gray-100 p-1 transition-all hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/5">
                              <div className={`p-6 rounded-[calc(1.5rem-2px)] bg-gray-50/50 group-hover:bg-white transition-colors flex flex-col md:flex-row gap-8`}>
                                
                                {/* Left Side: Type Icon + ID */}
                                <div className="flex md:flex-col items-center md:items-start justify-between md:justify-center gap-4 min-w-[120px]">
                                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:bg-brand-primary group-hover:text-white transition-all">
                                    {booking.type === "flight" ? <Plane size={32} /> : 
                                     booking.type === "hotel" ? <Hotel size={32} /> : 
                                     booking.type === "package" ? <Palmtree size={32} /> : 
                                     booking.type === "cargo" ? <Truck size={32} /> : <Train size={32} />}
                                  </div>
                                  <div>
                                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{tProfile("booking.bookingId")}</div>
                                    <div className="text-xs font-bold text-gray-900">{booking.id}</div>
                                  </div>
                                </div>

                                {/* Main Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getBookingStatusColor(booking.status)}`}>
                                    {getBookingStatusLabel(booking.status)}
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
                                          <div className="text-xs text-brand-primary font-bold uppercase mb-1">{tProfile("booking.flightFrom")}</div>
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
                                          <div className="text-xs text-brand-primary font-bold uppercase mb-1">{tProfile("booking.flightTo")}</div>
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

                                {/* Price */}
                                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-10 min-w-[140px]">
                                  <div className="text-center md:text-right">
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{tProfile("booking.price")}</div>
                                    <div className="text-2xl font-black text-brand-primary flex items-center justify-center md:justify-end">
                                      <CurrencySymbol className="h-5 w-5 mr-1" />
                                      {booking.price.toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                            <Clock size={48} className="text-gray-300 mb-4" />
                            <p className="text-gray-500 font-medium">{tProfile("booking.emptyState" as any)}</p>
                          </div>
                        )}
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

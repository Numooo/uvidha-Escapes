import React, { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Plane, Ship, Package as PackageIcon, Search, ArrowRight, Calculator, MapPin, Weight, Box, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";
import { AIRPORTS } from "./data";

export function CargoPage() {
  const t = useTranslations("Cargo");
  const { symbol, CurrencySymbol } = useCurrency();
  const [trackingId, setTrackingId] = useState("");

  // Calculator State
  const [calcOrigin, setCalcOrigin] = useState("");
  const [calcDest, setCalcDest] = useState("");
  const [calcWeight, setCalcWeight] = useState("");
  const [calcVol, setCalcVol] = useState("");
  const [calcType, setCalcType] = useState("plane");
  const [calcResult, setCalcResult] = useState<number | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      alert(`Tracking ID: ${trackingId}\nStatus: In transit`);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcOrigin || !calcDest || !calcWeight) return;
    const w = parseFloat(calcWeight);
    const v = parseFloat(calcVol) || 0;
    let mult = 1;
    if (calcType === "plane") mult = 2.5;
    if (calcType === "ship") mult = 0.5;
    const cost = 500 + (w * 15 * mult) + (v * 50 * mult);
    setCalcResult(cost);
  };

  const services = t.raw("services") as Array<{ title: string; desc: string; icon: string }>;

  const getIcon = (name: string) => {
    switch (name) {
      case "truck":
        return <Truck className="h-8 w-8 text-brand-primary" />;
      case "plane":
        return <Plane className="h-8 w-8 text-brand-primary" />;
      case "ship":
        return <Ship className="h-8 w-8 text-brand-primary" />;
      default:
        return <PackageIcon className="h-8 w-8 text-brand-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-brand-primary overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80)" }}
        />
        <div className="absolute inset-0 bg-brand-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
          >
            <Truck size={40} className="text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t("title")}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto mb-12"
          >
            {t("subtitle")}
          </motion.p>

          {/* Tracking Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl p-4 shadow-xl"
          >
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={t("trackingPlaceholder")}
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-brand-primary text-white font-semibold px-8 py-4 rounded-xl hover:bg-brand-secondary transition-colors whitespace-nowrap"
              >
                {t("trackBtn")}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="mb-8 flex items-center gap-4 border-b border-gray-100 pb-6">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center">
                <Calculator className="h-7 w-7 text-brand-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{t("calculatorTitle")}</h2>
                <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
              </div>
            </div>
            
            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">{t("calcOrigin")}</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-hover:text-brand-primary transition-colors" />
                    <select
                      value={calcOrigin}
                      onChange={(e) => { setCalcOrigin(e.target.value); setCalcResult(null); }}
                      required
                      className="w-full appearance-none rounded-xl border-2 border-gray-100 bg-gray-50 py-4 pl-12 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:bg-white focus:outline-none transition-all hover:border-gray-200"
                    >
                      <option value="">{t("calcOrigin")}</option>
                      {AIRPORTS.map((a) => (
                        <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="relative">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">{t("calcDest")}</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-hover:text-brand-primary transition-colors" />
                    <select
                      value={calcDest}
                      onChange={(e) => { setCalcDest(e.target.value); setCalcResult(null); }}
                      required
                      className="w-full appearance-none rounded-xl border-2 border-gray-100 bg-gray-50 py-4 pl-12 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary focus:bg-white focus:outline-none transition-all hover:border-gray-200"
                    >
                      <option value="">{t("calcDest")}</option>
                      {AIRPORTS.map((a) => (
                        <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">{t("calcWeight")}</label>
                  <div className="relative group">
                    <Weight className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-hover:text-brand-primary transition-colors" />
                    <input
                      type="number"
                      min="1"
                      required
                      value={calcWeight}
                      onChange={(e) => { setCalcWeight(e.target.value); setCalcResult(null); }}
                      placeholder="100"
                      className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-4 pl-12 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary focus:bg-white focus:outline-none transition-all hover:border-gray-200"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">{t("calcVol")}</label>
                  <div className="relative group">
                    <Box className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-hover:text-brand-primary transition-colors" />
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={calcVol}
                      onChange={(e) => { setCalcVol(e.target.value); setCalcResult(null); }}
                      placeholder="1.5"
                      className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-4 pl-12 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary focus:bg-white focus:outline-none transition-all hover:border-gray-200"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">{t("calcType")}</label>
                  <div className="relative group">
                    {calcType === "truck" ? <Truck className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-primary" /> :
                     calcType === "plane" ? <Plane className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-primary" /> :
                     <Ship className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-primary" />}
                    <select
                      value={calcType}
                      onChange={(e) => { setCalcType(e.target.value); setCalcResult(null); }}
                      className="w-full appearance-none rounded-xl border-2 border-gray-100 bg-white py-4 pl-12 pr-10 text-sm font-bold text-brand-primary focus:border-brand-primary focus:outline-none transition-all shadow-sm"
                    >
                      <option value="truck">{t("transportTypes.truck")}</option>
                      <option value="plane">{t("transportTypes.plane")}</option>
                      <option value="ship">{t("transportTypes.ship")}</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-2 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-100">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-brand-primary text-white font-bold px-12 py-4 rounded-xl shadow-lg hover:bg-brand-secondary hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="h-5 w-5" />
                  {t("calcBtn")}
                </button>
                
                {calcResult !== null && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-900 px-8 py-4 rounded-xl flex items-center gap-4 w-full md:w-auto shadow-sm border border-green-100"
                  >
                    <span className="font-medium text-green-800">{t("calcResult")}:</span>
                    <span className="text-3xl font-black flex items-center font-mono">
                      <CurrencySymbol className="h-6 w-6 mr-1" />
                      {calcResult.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

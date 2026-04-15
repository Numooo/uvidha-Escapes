import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Plane,
  Ship,
  Train,
  Package as PackageIcon,
  Search,
  ArrowRight,
  Calculator,
  MapPin,
  Weight,
  Box,
  ChevronDown,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";
import type { Airport } from "@/types";
import { AirportAutocomplete } from "@/shared/ui/AirportAutocomplete";
import { CustomSelect } from "@/shared/ui/CustomSelect";

export function CargoPage({ initialData }: { initialData?: any }) {
  const t = useTranslations("Cargo");
  const tMock = useTranslations("MockData");
  const { symbol, CurrencySymbol } = useCurrency();
  const AIRPORTS = useMemo(() => tMock.raw("airports") as Airport[], [tMock]);
  const [trackingId, setTrackingId] = useState("");

  // Calculator State
  const [calcOrigin, setCalcOrigin] = useState("");
  const [calcDest, setCalcDest] = useState("");
  const [calcWeight, setCalcWeight] = useState("");
  const [calcVol, setCalcVol] = useState("");
  const [calcType, setCalcType] = useState("plane");
  const [calcResult, setCalcResult] = useState<number | null>(null);

  // Auto-calculate if initialData is provided
  useEffect(() => {
    if (initialData) {
      if (initialData.origin) setCalcOrigin(initialData.origin);
      if (initialData.destination) setCalcDest(initialData.destination);
      if (initialData.weight) setCalcWeight(initialData.weight);

      // Map home cargo type to cargo page transport type
      let mappedType = "truck";
      if (initialData.type === "express") mappedType = "plane";
      setCalcType(mappedType);

      // Trigger automatic calculation
      if (initialData.weight) {
        const w = parseFloat(initialData.weight);
        const mult = mappedType === "plane" ? 2.5 : 1;
        const cost = 500 + w * 15 * mult;
        setCalcResult(cost);
      }
    }
  }, [initialData]);

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
    if (calcType === "train") mult = 0.8;
    const cost = 500 + w * 15 * mult + v * 50 * mult;
    setCalcResult(cost);
  };

  const services = t.raw("services") as Array<{
    title: string;
    desc: string;
    icon: string;
  }>;

  const getIcon = (name: string) => {
    switch (name) {
      case "truck":
        return <Truck className="h-8 w-8 text-brand-primary" />;
      case "plane":
        return <Plane className="h-8 w-8 text-brand-primary" />;
      case "train":
        return <Train className="h-8 w-8 text-brand-primary" />;
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
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80)",
          }}
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
            <form
              onSubmit={handleTrack}
              className="flex flex-col sm:flex-row gap-3"
            >
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
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("calculatorTitle")}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
              </div>
            </div>

            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AirportAutocomplete
                  label={t("calcOrigin")}
                  value={calcOrigin}
                  onChange={(val) => {
                    setCalcOrigin(val);
                    setCalcResult(null);
                  }}
                  placeholder={t("calcOrigin")}
                />

                <AirportAutocomplete
                  label={t("calcDest")}
                  value={calcDest}
                  onChange={(val) => {
                    setCalcDest(val);
                    setCalcResult(null);
                  }}
                  placeholder={t("calcDest")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="relative">
                  <label className="mb-1.5 block text-xs font-semibold text-gray-500 capitalize px-1">
                    {t("calcWeight")}
                  </label>
                  <div className="relative group">
                    <Weight className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors z-10" />
                    <input
                      type="number"
                      min="1"
                      required
                      value={calcWeight}
                      onChange={(e) => {
                        setCalcWeight(e.target.value);
                        setCalcResult(null);
                      }}
                      placeholder="100"
                      className="w-full appearance-none rounded-2xl border-none bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-primary/20 transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="mb-1.5 block text-xs font-semibold text-gray-500 capitalize px-1">
                    {t("calcVol")}
                  </label>
                  <div className="relative group">
                    <Box className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors z-10" />
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={calcVol}
                      onChange={(e) => {
                        setCalcVol(e.target.value);
                        setCalcResult(null);
                      }}
                      placeholder="1.5"
                      className="w-full appearance-none rounded-2xl border-none bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-primary/20 transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <CustomSelect
                  label={t("calcType")}
                  value={calcType}
                  onChange={(val) => {
                    setCalcType(val);
                    setCalcResult(null);
                  }}
                  icon={
                    calcType === "truck" ? (
                      <Truck className="h-5 w-5" />
                    ) : calcType === "plane" ? (
                      <Plane className="h-5 w-5" />
                    ) : (
                      <Train className="h-5 w-5" />
                    )
                  }
                  options={[
                    { value: "truck", label: t("transportTypes.truck") },
                    { value: "plane", label: t("transportTypes.plane") },
                    { value: "train", label: tMock("train" as any) },
                  ]}
                />
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
                    <span className="font-medium text-green-800">
                      {t("calcResult")}:
                    </span>
                    <span className="text-3xl font-black flex items-center font-mono">
                      <CurrencySymbol className="h-6 w-6 mr-1" />
                      {calcResult.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
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

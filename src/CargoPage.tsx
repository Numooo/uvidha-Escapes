import React, { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Plane, Ship, Package, Search, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function CargoPage() {
  const t = useTranslations("Cargo");
  const [trackingId, setTrackingId] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      alert(`Tracking ID: ${trackingId}\nStatus: In transit`);
    }
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
        return <Package className="h-8 w-8 text-brand-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-brand-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7c159f8?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary to-transparent" />
        
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

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">{t("servicesTitle")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group cursor-pointer"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.desc}
                </p>
                <div className="flex items-center text-brand-primary font-semibold group-hover:text-brand-secondary transition-colors">
                  <span>{t("bookNow")}</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-brand-primary/[0.03] border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {t("bookNow")} - {t("comingSoon")}
          </h2>
          <button className="bg-brand-accent text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:bg-brand-accent/90 hover:scale-[1.02] active:scale-95 transition-all">
            {t("bookNow")}
          </button>
        </div>
      </section>
    </div>
  );
}

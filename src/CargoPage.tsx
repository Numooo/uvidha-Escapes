import React from "react";
import { Truck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function CargoPage() {
  const t = useTranslations("Cargo");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6 text-brand-primary"
      >
        <Truck size={48} />
      </motion.div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("title")}</h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-8">
        {t("description")}
      </p>
      <div className="flex items-center gap-2 text-brand-primary font-semibold bg-brand-primary/5 px-4 py-2 rounded-full">
        <Sparkles size={20} />
        <span>{t("comingSoon")}</span>
      </div>
    </div>
  );
}

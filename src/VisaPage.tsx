import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Globe,
  Clock,
  FileText,
  CheckCircle2,
  Upload,
  ArrowRight,
  AlertCircle,
  Calendar,
  CreditCard,
  IndianRupee,
} from "lucide-react";
import { Input } from "./primitives/input";
import { Button } from "./primitives/button";
import { VisaDetailPage } from "./VisaDetailPage";
import type { VisaRequirement } from "./types";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/CurrencyContext";

// Visa page component

interface VisaPageProps {
  onVisaSelect?: (visa: VisaRequirement) => void;
}

export function VisaPage({ onVisaSelect }: VisaPageProps) {
  const t = useTranslations("Visa");
  const { symbol, CurrencyIcon } = useCurrency();
  const [visas] = useState<VisaRequirement[]>(t.raw("mockData"));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVisa, setSelectedVisa] = useState<VisaRequirement | null>(
    null,
  );

  const filteredVisas = searchQuery
    ? visas.filter((visa) =>
        visa.country.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : visas;

  const handleApply = (visa: VisaRequirement) => {
    setSelectedVisa(visa);
  };

  // Show detail page if a visa is selected
  if (selectedVisa) {
    return (
      <VisaDetailPage
        visa={selectedVisa}
        onBack={() => setSelectedVisa(null)}
        onStartApplication={(visa) => {
          onVisaSelect?.(visa);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-brand-primary text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1920&q=80)" }}
        />
        <div className="absolute inset-0 bg-brand-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-primary/20" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Globe className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h1 className="text-5xl font-bold mb-4">{t("title")}</h1>
            <p className="text-xl opacity-90 mb-8">{t("subtitle")}</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-white"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Results Count */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {t("servicesAvailable", { count: filteredVisas.length })}
          </h2>
          <p className="text-gray-600 mt-1">{t("selectSubtitle")}</p>
        </div>

        {/* Visa Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVisas.map((visa, index) => (
            <VisaCard
              key={visa.id}
              visa={visa}
              index={index}
              onApply={handleApply}
            />
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t("howItWorks")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                icon: FileText,
                title: t("steps.step1"),
                desc: t("steps.desc1"),
              },
              {
                step: 2,
                icon: Upload,
                title: t("steps.step2"),
                desc: t("steps.desc2"),
              },
              {
                step: 3,
                icon: CreditCard,
                title: t("steps.step3"),
                desc: t("steps.desc3"),
              },
              {
                step: 4,
                icon: CheckCircle2,
                title: t("steps.step4"),
                desc: t("steps.desc4"),
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 flex gap-4">
          <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              {t("importantInfo")}
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              {Object.keys(t.raw("infoList")).map((key) => (
                <li key={key}>• {t(`infoList.${key}` as any)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface VisaCardProps {
  visa: VisaRequirement;
  index: number;
  onApply: (visa: VisaRequirement) => void;
}

function VisaCard({ visa, index, onApply }: VisaCardProps) {
  const t = useTranslations("Visa");
  const { symbolText, CurrencySymbol } = useCurrency();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group"
    >
      {/* Country Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={visa.image}
          alt={visa.country}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1">{visa.country}</h3>
          <p className="text-sm text-white/90">{visa.visaType}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-600 mb-0.5">
                {t("processingTime")}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {visa.processingTime}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-600 mb-0.5">{t("validity")}</p>
              <p className="text-sm font-medium text-gray-900">
                {visa.validity}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">{visa.description}</p>

        {/* Requirements Preview */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-sm text-blue-600 font-medium hover:text-blue-700 mb-4 flex items-center gap-1"
        >
          <FileText className="h-4 w-4" />
          {isExpanded ? t("hide") : t("view")} {t("requirements")}
          {isExpanded && (
            <span className="ml-1 text-gray-500">
              ({visa.requirements.length})
            </span>
          )}
        </button>

        {/* Requirements List */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5 bg-gray-50 rounded-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="space-y-2">
              {visa.requirements.map((req, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-600 mb-0.5">{t("processingFee")}</p>
            <p className="text-2xl font-bold text-blue-600 flex items-center">
              <CurrencySymbol className="h-5 w-5 mr-1" />
              {visa.price.toLocaleString()}
            </p>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onApply(visa);
            }}
            className="gap-2 cursor-pointer hover:shadow-lg"
            type="button"
          >
            {t("viewDetails")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

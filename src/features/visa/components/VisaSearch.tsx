"use client";

import React, { useState } from "react";
import { FileText, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface VisaSearchProps {
  onSearch?: (country: string) => void;
}

export function VisaSearch({ onSearch }: VisaSearchProps) {
  const t = useTranslations();
  const [country, setCountry] = useState("");
  const [visaType, setVisaType] = useState("tourist");
  const [travelDate, setTravelDate] = useState(format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
  const [applicants, setApplicants] = useState(1);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(country);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Inputs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Destination */}
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.visa.country")}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={t("Search.visa.countryPlaceholder")}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary"
            />
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
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary"
            >
              <option value="tourist">{t("Search.visa.types.tourist")}</option>
              <option value="business">{t("Search.visa.types.business")}</option>
              <option value="transit">{t("Search.visa.types.transit")}</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Date */}
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.visa.travelDate")}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-900 focus:border-brand-primary"
            />
          </div>
        </div>

        {/* Applicants */}
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("Search.visa.applicants")}
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={applicants}
              onChange={(e) => setApplicants(Number(e.target.value))}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-900 focus:border-brand-primary"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? t("Search.visa.applicant") : t("Search.visa.applicants")}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Check Button */}
      <button
        onClick={handleSearch}
        className="w-full rounded-2xl bg-brand-primary py-4 text-white font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99]"
      >
        <FileText className="h-5 w-5" />
        {t("Search.visa.check")}
      </button>
    </div>
  );
}

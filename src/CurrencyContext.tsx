"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  DollarSign, 
  Euro, 
  RussianRuble,
} from "lucide-react";
import { SomIcon } from "./icons/SomIcon";

export type CurrencyCode = "KGS" | "RUB" | "USD" | "EUR";

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  KGS: { code: "KGS", symbol: "⃀", icon: SomIcon },
  RUB: { code: "RUB", symbol: "₽", icon: RussianRuble },
  USD: { code: "USD", symbol: "$", icon: DollarSign },
  EUR: { code: "EUR", symbol: "€", icon: Euro },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  symbol: string;
  CurrencyIcon: React.ComponentType<{ className?: string }>;
  setCurrency: (code: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("KGS");

  // Persist currency preference
  useEffect(() => {
    const saved = localStorage.getItem("preferred_currency") as CurrencyCode;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem("preferred_currency", code);
  };

  const value = {
    currency,
    symbol: CURRENCIES[currency].symbol,
    CurrencyIcon: CURRENCIES[currency].icon,
    setCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

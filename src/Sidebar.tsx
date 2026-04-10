import React, { useState } from "react";
import {
  Plane,
  Hotel,
  Palmtree,
  FileText,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: any) => void;
  isPinned?: boolean;
}

export function Sidebar({ activePage, onNavigate, isPinned = true }: SidebarProps) {
  const t = useTranslations();
  const [isHovered, setIsHovered] = useState(false);
  
  const isExpanded = isPinned || isHovered;

  const menuItems = [
    { id: "flights", icon: Plane, label: t("Header.flights") },
    { id: "hotels", icon: Hotel, label: t("Header.hotels") },
    { id: "holidays", icon: Palmtree, label: t("Header.holidays") },
    { id: "visa", icon: FileText, label: t("Header.visa") },
    { id: "cargo", icon: Truck, label: t("Header.cargo") },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? "240px" : "72px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="sticky top-16 left-0 h-[calc(100vh-64px)] bg-white border-r border-gray-200 z-40 transition-all duration-300 hidden lg:flex flex-col flex-shrink-0"
    >
      <div className="flex-1 py-6">
        <div className="px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative mb-1 ${
                activePage === item.id
                  ? "bg-brand-primary/10 text-brand-primary shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-brand-primary"
              }`}
            >
              <div className="flex items-center justify-center w-6 min-w-[24px]">
                <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                  activePage === item.id ? "text-brand-primary" : "text-gray-400 group-hover:text-brand-secondary"
                }`} />
              </div>
              
              <AnimatePresence mode="wait">
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium whitespace-nowrap overflow-hidden text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {!isExpanded && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                </div>
              )}

              {activePage === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-brand-primary rounded-r-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

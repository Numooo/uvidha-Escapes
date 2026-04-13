import React, { useState } from "react";
import {
  Plane,
  Hotel,
  Palmtree,
  FileText,
  Truck,
  Activity,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
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
    { id: "flights", icon: Plane, label: t("Search.tabs.flights") },
    { id: "hotels", icon: Hotel, label: t("Search.tabs.hotels") },
    { id: "holidays", icon: Palmtree, label: t("Search.tabs.holidays") },
    { id: "visa", icon: FileText, label: t("Search.tabs.visa") },
    { id: "cargo", icon: Truck, label: t("Search.tabs.cargo") },
    { id: "status", icon: Activity, label: t("Search.tabs.status") },
  ];

  const bottomItems = [
    { id: "support", icon: HelpCircle, label: t("Footer.links.helpCenter") },
    { id: "settings", icon: Settings, label: t("Footer.sections.support") }, // Using a placeholder key
  ];

  return (
    <motion.div
      initial={false}
      animate={{ 
        width: isExpanded ? "260px" : "80px",
        backgroundColor: "rgba(255, 255, 255, 0.95)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="sticky top-16 left-0 h-[calc(100vh-64px)] backdrop-blur-xl border-r border-gray-100 z-40 transition-all duration-500 hidden lg:flex flex-col flex-shrink-0 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]"
    >
      <div className="flex-1 py-8 overflow-y-auto no-scrollbar">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative ${
                  isActive
                    ? "bg-brand-primary text-white shadow-[0_8px_16px_-4px_rgba(10,87,161,0.25)]"
                    : "text-gray-500 hover:bg-brand-primary/5 hover:text-brand-primary"
                }`}
              >
                <div className="relative flex items-center justify-center w-6 min-w-[24px]">
                  <item.icon className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${
                    isActive ? "text-white scale-110" : "text-gray-400 group-hover:text-brand-primary group-hover:scale-110"
                  }`} />
                  
                  {isActive && (
                    <motion.div
                      layoutId="glow"
                      className="absolute inset-0 bg-white/20 blur-md rounded-full scale-150"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </div>
                
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`font-semibold whitespace-nowrap overflow-hidden text-sm tracking-tight`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {!isExpanded && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-[11px] font-bold rounded-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10 uppercase tracking-widest">
                    {item.label}
                  </div>
                )}


              </button>
            );
          })}
        </div>
      </div>

    </motion.div>
  );
}
